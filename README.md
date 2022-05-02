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

## Testing

To run unit tests:

```sh
npm test
```
