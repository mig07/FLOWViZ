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

# Setup

## Configuring database

1. Install Docker

2. Download mongo image

```sh
docker pull mongo
```

3. Run and create mongo container, exposing port 27017

```sh
docker run --name mongodb -d -p 27017:27017 mongo
```

## Add server's dot-env environment variables

1. Create a file called `.env` in `server/` folder.

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

## Running on localhost

1. Install dependencies:

```sh
npm i
```

2. To run both client and server (concurrently):

```sh
npm run dev
```

## Running on localhost **with tmux**

Allows you to isolate each log in a terminal individual session, providing better log visibility than the concurrently way.

1. Install tmux

Arch distros:
```sh
sudo pacman -Sy tmux
```

Debian distros:
```sh
sudo apt-get update && sudo apt-get install tmux
```

macOS:
```sh
brew install tmux
```

2. Enable tmux mouse scroll (optional)

```sh
echo "set -g mouse on" >> ~/.tmux.conf && tmux source-file ~/.tmux.conf
```

3. Execute the start.sh script

**Note**: if there are no execution permissions, execute:
```sh
chmod +x start.sh
```

Build and start:
```sh
./start.sh
```

## Testing

To run unit tests:

```sh
npm test
```
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
