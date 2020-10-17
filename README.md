# Flogi
Flogi (Fluentd + logs + Intelligence) in an application to monitor Containers logs with a little bit of intelligence.

[Link](https://docs.google.com/presentation/d/10f2hk9IX_MxVG62aGdwb-C48a5WSrvOGnnq8ktbN3xI/edit?usp=sharing) to the project model canvas.

## Architecture

![Flogi architecture](./assets/Flogi.png)


## Running the Project

1. Run: `docker-compose up -d --build`

## Stopping the Project

1. Run: `docker-compose -f docker-compose.yml down `

## Built with

* Fluentd
* MongoDB
* node.js
* Docker
* sklearn

## Team

1. João Lira: <jpls@cin.ufpe.br>
2. José Reginaldo: <jrbj@cin.ufpe.br>
3. Leão Liu: <llm2@cin.ufpe.br>


git clone https://github.com/lionliu/Flogi.git

Dependencias:

- docker engine versão 19.03
- docker-compose versão 1.27

Colocar o logging driver no docker-compose.yaml do outro projeto

logging:
         driver: fluentd
         options:
           fluentd-address: localhost:24224
           tag: docker.{{.ID}} # container-id by default

Exemplo:

services:
  front-end:
    image: image
    restart: always
    read_only: true
    logging:
         driver: fluentd
         options:
           fluentd-address: localhost:24224
           tag: docker.{{.ID}} # container-id by default

Executar docker-compose up --build no diretorio do Flogi

Executar docker-compose up na pasta onde se encontra o docker-compose.yaml do projeto a ser observado.

Entrar em localhost:5601 para acessar o kibana



curl -X POST localhost:5601/api/saved_objects/index-pattern/fluentd  -H 'kbn-xsrf: true' -H 'Content-Type: application/json' -d '
{
  "attributes": {
    "title": "fluentd-*",
    "timeFieldName": "@timestamp"
  }
}'

curl -X POST localhost:5601/api/saved_objects/index-pattern/metricbeat  -H 'kbn-xsrf: true' -H 'Content-Type: application/json' -d '
{
  "attributes": {
    "title": "metricbeat-*",
    "timeFieldName": "@timestamp"
  }
}'