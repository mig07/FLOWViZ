from airflow import DAG
from airflow.operators.python_operator import PythonOperator
from airflow.providers.mongo.hooks.mongo import MongoHook
from airflow.providers.mongo.sensors.mongo import MongoSensor
from datetime import datetime
import json
import shutil
import fileinput
import os

from docker.types import Mount

DAG_PATH = 'dags/'
PYTHON_EXT = '.py'
MONGO_CONN_ID = 'mongodb_flowviz'
DAG_UTILS = 'include/dag_utils.py'
DAG_TEMPLATE_FILENAME = 'include/dag_template.py'
MONGO_DB = 'test'

default_args = {
    'owner'                 : 'airflow',
    'description'           : 'An ETL pipeline for DAG generation',
    'start_date'            : datetime.today(),
}

mongo_hook = MongoHook(conn_id = MONGO_CONN_ID)

# Extracts dag from mongodb, provided a dag_id,
# sent via HTTP to the REST API
def extract_dag_from_mongo(ti=None, **kwargs):
    conf=kwargs['params']
    dag_id=conf['dag_id']
    username=conf['username']

    workflow = mongo_hook.find(
        mongo_collection = "workflows",
        mongo_db = MONGO_DB,
        query = {'dag_id': dag_id, 'username': username},
        find_one = True
    )

    wflow = {
        'dag_id': workflow['dag_id'],
        'description': workflow['description'],
        'username': workflow['username'],
        'dag': workflow['dag']
    }

    ti.xcom_push(key='workflow', value=wflow)

# Transform the stored DAG into an Airflow DAG
def transform_data_into_airflow_dag(ti=None, **kwargs):
    workflow = ti.xcom_pull(task_ids="extract_dag_from_mongo", key="workflow")
    dag_id = workflow['dag_id']
    description = workflow['description']
    dag = workflow['dag']

    # Create file from template in include/ directory
    new_filename = str(DAG_PATH + dag_id + PYTHON_EXT)
    # with open(new_filename, 'w') as new_dag:
    #    new_dag.write(json.dumps(dag))
    shutil.copyfile(DAG_TEMPLATE_FILENAME, new_filename)
    generate_dag(dag_id, description, dag, new_filename)

    ti.xcom_push(key='workflow', value=workflow)

# Create and load the correspondent log for the DAG and user
def load_log_entry(ti=None, **kwargs):
    workflow = ti.xcom_pull(task_ids="transform_data_into_airflow_dag", key="workflow")
    dag_id = workflow['dag_id']
    username = workflow['username']

    log = {
        "dag_id" : dag_id,
        "username" : username,
        "log": "" 
    }
    mongo_hook.insert_one(mongo_collection="workflowlogs", doc=log, mongo_db=MONGO_DB)
    

dag_id = 'dag_generator'
schedule = '@once'
with DAG(dag_id, schedule_interval=None, default_args=default_args) as dag:

    extract_dag_from_mongo = PythonOperator(
        task_id='extract_dag_from_mongo',
        python_callable=extract_dag_from_mongo,
        provide_context=True)

    transform_data_into_airflow_dag = PythonOperator(
        task_id='transform_data_into_airflow_dag',
        python_callable=transform_data_into_airflow_dag,
        provide_context=True)

    load_log_entry = PythonOperator(
        task_id='load_log_entry',
        python_callable=load_log_entry,
        provide_context=True)

    extract_dag_from_mongo >> transform_data_into_airflow_dag >> load_log_entry

# Generate the imports for the involved operators
def generate_imports(imports):
    imps = ""
    for imp in imports:
        imps += str(imp + "\n")
    return imps

# Generates the operator with the respective task
def generate_task(task):
    t=""
    operator_type = task['operator_type']
    operator = str(str(operator_type) + "(paramsToReplace)")
    operator_params = task['operator_params']

    t += "task_id" + " = " + "'" + str(task['task_id']) + "',"

    for key, value in operator_params.items():
        if isinstance(value, str):
            t += str("\n\t\t" + str(key) + " = " + str(value)+",")
        else:
            t += str("\n\t\t" + str(key) + " = " + str(value['operator_params']).replace("\"", "")+",")

    operator = operator.replace("paramsToReplace", t)
    return operator

# Generate the DAG's tasks
def generate_tasks(tasks):
    tks=""
    for task in tasks:
        tks += str("\t" + str(task['task_id']) + " = " + str(generate_task(task)) + "\n\n")

    return tks

# Generates the DAG
def generate_dag(dag_id, description, dagraph, filename):
    tasks = dagraph['tasks']
    execution_order = dagraph['execution_order']

    # Replace necessary fields with the passed configurations
    for line in fileinput.input(filename, inplace=True):
        line = line.replace("dagIdToReplace", "'"+dag_id+"'")
        line = line.replace("descriptionToReplace", "'"+description+"'")
        line = line.replace("startDateToReplace", dagraph['start_date'])
        line = line.replace("importsToReplace", generate_imports(dagraph['airflow_imports']))
        line = line.replace("operatorsToReplace", generate_tasks(tasks))
        line = line.replace("executionOrderToReplace", execution_order)
        print(line, end="")
