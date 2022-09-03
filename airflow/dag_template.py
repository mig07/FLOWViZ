from airflow import DAG
from datetime import datetime
importsToReplace

default_args = {
    'owner'                 : 'airflow',
    'description'           : descriptionToReplace,
    'start_date'            : startDateToReplace,
}

with DAG(dagIdToReplace, schedule_interval=None, default_args=default_args) as dag:

operatorsToReplace

executionOrderToReplace
