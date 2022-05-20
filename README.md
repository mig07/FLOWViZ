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

## Building and running on localhost

1. Install dependencies:

```sh
npm install or npm i
```

2. Run it:

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

Note: if there are no permission, execute:
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
