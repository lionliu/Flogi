#!bin/bash

sudo sysctl -w vm.max_map_count=262144
cd metricbeat
sudo chown root metricbeat.yml
sudo chmod go-w metricbeat.yml
cd modules.d
sudo chown root module.yml
cd ../..
sudo docker-compose up --build -d
echo 'waiting for Kibana server'
until $(curl --silent --fail localhost:5601); do
    sleep 10
done
curl --silent -o /dev/null -X POST localhost:5601/api/saved_objects/index-pattern/metricbeat -H 'kbn-xsrf: true' -H 'Content-Type: application/json' -d ' { "attributes": { "title": "metricbeat-*", "timeFieldName": "@timestamp" } }'

curl --silent -o /dev/null -X POST localhost:5601/api/saved_objects/index-pattern/fluentd -H 'kbn-xsrf: true' -H 'Content-Type: application/json' -d ' { "attributes": { "title": "fluentd-*", "timeFieldName": "@timestamp" } }'
echo 'Kibana is up. Access localhost:5601'