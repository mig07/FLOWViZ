# FLOWViZ

FLOWViZ is an integration framework that allows you to seamlessly
integrate other phylogenetic tools and frameworks,
while providing workflow scheduling and execution,
through the Apache Airflow workflow system.

It is composed by two components: an **HTTP Express server**
and a **React client**,
both written in JavaScript.

**It is still a work under development!**
If you find a bug, please report [here](https://github.com/mig07/FLOWViZ/issues)

With this framework, you can integrate your own phylogenetic tools, by filling a
contract where you specify the tool's access, rules and guidelines.

The integrated tools can then be used to build your own customized workflows.

![flowviz-whiteboard](/docs/pictures/flowviz-whiteboard.png)

You can also customize each task inside the workflow.

![flowviz-task-setup](/docs/pictures/individualTaskSetup.png)

# Setup requirements

 - Docker
 - Node.JS
 - Tmux (optional)

Before going into the project's setup, follow this [guide](requirements.md), in order to fulfill all setup's requirements.

# Setup

It is advised to follow the setup guide by the displayed order.

## Configuring database

1. Download mongo image

```sh
docker pull mongo
```

2. Run and create mongo container, exposing port 27017

```sh
docker run --name mongodb -d -p 27017:27017 mongo
```

## Configuring Apache Airflow

1. Configure the Airflow user (inside `airflow/`):

```sh
echo -e "AIRFLOW_UID=$(id -u)" > .env
```

2. Install and run the Airflow container, along with the required services by executing the following command inside `airflow/`:

**Note**: older versions require you to write `docker-compose up` instead `docker compose up`, this has now changed with the latest version. Depending on which package you use, both can be support or just one of them; you can also create an [alias](https://www.cyberciti.biz/faq/create-permanent-bash-alias-linux-unix/) (bash tutorial, also compatible with zsh or fish) to better suit your needs. For more information check the head notes [here](https://docs.docker.com/compose/reference/) and [this article](https://www.docker.com/blog/announcing-compose-v2-general-availability/).

```sh
docker compose up
```

To check running containers:

```sh
docker ps
```

After all services are up and running, Airflow will expose a web client, which is accessible through the 8080 port ([http://localhost:8080](http://localhost:8080)). The default credentials are username: `airflow` and password: `airflow`. After a successful login, you might see a dashboard containing a list of DAG examples.

3. Create a Docker network:

```sh
docker network create flowviz-docker-network
```

4. Add **MongoDB container** and **all Airflow containers** to the network (the containers must be running):

```sh
docker network connect flowviz-docker-network mongodb && \
for airflowContainer in $(docker ps --format {{.Names}} | grep "airflow-"); \
do \
    docker network connect flowviz-docker-network $airflowContainer; \
done
```

5. Inspect the assigned IP addresses inside the network (following command) and **retrieve the MongoDB's container IP address**:

```sh
docker network inspect flowviz-docker-network
```

Or, simply copy the result of this command (you may need to **reset the container** for this command to work):

```sh
docker inspect -f '{{with index .NetworkSettings.Networks "flowviz-network-docker"}}{{.IPAddress}}{{end}}' mongodb
```

6. Inside the **Apache Airflow web client** ([http://localhost:8080](http://localhost:8080)), using the **NavBar** go to **Admin** and then **Connections**. Click **add a new record** (plus icon) and fulfill the displayed fields with the following information:

```
Connection Id: mongodb_flowviz
Connection Type: mongo
Host: [place the retrieved IP address from the MongoDB's container]
```

7. Copy the dag_generator.py script into the dags/ folder (must be in the same directory where the docker-compose.yaml is).

8. Also, copy the dag_template.py script into the include/ folder (in the same directory).

9. Inside the Airflow's dashboard and toggle on the `dag_generator` DAG (switch on the left of the DAG's name).

If everything went well, no errors should be displayed by the client (aka it must not appear that `mongodb_flowviz` connection, used by the dag_generator DAG, is not recognized).

## Add **server**'s dot-env environment variables

1. Create a file called `.env` inside the main folder.

2. Fill it with the variables below (remove the curly brackets and change what is in between them):

```sh
PRODUCTION={true|false}
SERVER_NAME={server_name}
SERVER_PORT={server_port_number}
DATABASE_ADDRESS={database_address}
DATABASE_PORT={database_port}
AIRFLOW_ADDRESS={airflow_address}
AIRFLOW_PORT={airflow_port}
AIRFLOW_DAG_GENERATOR={airflow_dag_generator_name}
JWT_SECRET={jwt_secret}
AIRFLOW_USERNAME={airflow_username}
AIRFLOW_PASSWORD={airflow_password}
```

## Add **client**'s dot-env environment variables

1. Create a file called `.env` inside the `client/` folder.

2. Fill it with the variables below (remove the curly brackets and change what is in between them):

```sh
REACT_APP_SERVER_PROTOCOL={protocol}
REACT_APP_SERVER_ADDRESS={server_address}
REACT_APP_SERVER_PORT={server_port}
```

## Running on localhost

1. Install npm package dependencies (inside main folder and `client/`):

```sh
npm i
```

2. To run both client and server (concurrently dependency, run this command inside the main folder):

```sh
npm run dev
```

## Running on localhost **with tmux**

Allows you to isolate each log in a terminal individual session, providing better log visibility than the concurrently way.

1. [Tmux setup (last item)](requirements.md)

2. Execute the start.sh script

**Note**: if there are no execution permissions, execute:
```sh
chmod +x start.sh
```

Start:
```sh
./start.sh
```

## Testing

To run unit tests (main or `client/` folders):

```sh
npm test
```
---
# Documentation

Further documentation about the developed solution can be found in this repository [wiki](https://github.com/mig07/FLOWViZ/wiki), namely the [REST API's endpoints](https://github.com/mig07/FLOWViZ/wiki/HTTP-Server's-REST-API-endpoints)
---

# Contacts

Source code repository - [https://github.com/mig07/FLOWViZ](https://github.com/mig07/FLOWViZ)

- Miguel Luís - A43504@alunos.isel.pt
- Cátia Vaz - cvaz@cc.isel.ipl.pt

# Acknowledgements

This project was developed under the context of a [Lisbon School of Engineering (ISEL)](https://www.isel.pt/) Master's degree final project, which was also funded by student grants, as follows:
- NGPHYLO PTDC/CCI-BIO/29676/2017, an [INESC-ID](https://www.inesc-id.pt/) project, funded by [Science and Technology Foundation (FCT)](https://www.fct.pt/);
- IPL/ISEL/DIVA_ISEL, funded by [Polytechnic Institute of Lisbon (IPL)](https://www.ipl.pt/).

The following articles were also submitted under the context of this project:
- [https://inforum.org.pt/sites/default/files/2022-09/Actas_INForum.pdf#page=224](https://inforum.org.pt/sites/default/files/2022-09/Actas_INForum.pdf#page=224), single-column format, submitted and publicly presented at the [INForum 2022 conference](https://inforum.org.pt/), which took place at the [Polytechnic Institute of Guarda (IPG)](http://politecnicoguarda.pt/);
- [https://arxiv.org/abs/2211.15282](https://arxiv.org/abs/2211.15282), two-column format.
