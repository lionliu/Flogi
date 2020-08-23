# Setup

## Running the local setup

1. Build the image: `docker build -t fluentd-flogi .`

2. Create the log dir: `mkdir log`

3. Run the image: `docker run -d -p 24224:24224 -p 24224:24224/udp -v “$(pwd)/log:/fluentd/log” fluentd-flogi`

4. Run any container with fluentd as the log-driver: `docker run --log-driver=fluentd --log-opt tag="docker.{{.ID}}" --log-opt fluentd-address=localhost:24224 CONTAINER_NAME`
