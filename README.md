<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

## Technologies used for this project: 
- Node: https://nodejs.org/en
- Docker: https://docs.docker.com/get-docker/
- TablePlus: https://tableplus.com

## Download and run:

1. Clone the project
2. Execute: 
```
yarn install
```
3. Clone the file ```.env.template``` and rename it to ```.env```
4. change the environment variable
5. Raise the database: 
```
docker-compose up -d
```
6. Run the app: 
```
yarn start:dev
```
7. Execute the seed 
```
http://localhost:3000/api/seed
```

