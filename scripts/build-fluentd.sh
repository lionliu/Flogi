#!bin/bash
cd ../fluentd
docker build -t fluentd-flogi .
if [ ! -d log ]
 then
    mkdir log
fi
docker run -d -p 24224:24224 -p 24224:24224/udp -v "$(pwd)/log:/fluentd/log" fluentd-flogi
docker run --log-driver=fluentd --log-opt tag="docker.{{.ID}}" --log-opt fluentd-address=localhost:24224 $1
