# FLOWViZ

![flowviz-whiteboard](/docs/pictures/whiteboard.png)

FLOWViZ is a framework that allows you to seamlessly
integrate other phylogenetic tools and frameworks,
while providing workflow scheduling and execution,
through the Apache Airflow workflow system.

It is composed by two components: an express server
and a react client,
both written in JavaScript.

**It is still a work under development**: expect incomplete or faulty features!
If you find a bug,
please report [here](https://github.com/mig07/FLOWViZ/issues)

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
