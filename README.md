# FLOWViZ

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

## Configuring queue message broker - RabbitMQ

1. Download RabbitMQ image

```sh
docker pull rabbitmq
```

2. Run and create RabbitMQ container, exposing ports 5672 and 15672

```sh
docker run -d --hostname rabbithost --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:management
```

## Add server's dot-env environment variables

1. Create a file called `.env` in `server/` folder.

2. Fill it with the variables below (change what's between the curly brackets and remove them):

```sh
JWT_SECRET={jwt_secret}
AIRFLOW_USERNAME={airflow_username}
AIRFLOW_PASSWORD={airflow_password}
```

## Building and running on localhost

1. Install dependencies:

```sh
npm i
```

2. Run it (both on client and server):

```sh
npm start
```

## Building and running on localhost **with tmux**

1. Install tmux

Arch distros:
```sh
sudo pacman -Sy tmux
```

Debian distros:
```sh
sudo apt-get update && sudo apt-get install tmux
```

2. Execute the start.sh script

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
