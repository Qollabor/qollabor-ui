# Qollabor-UI

## Building a docker image (locally)

To build a docker image locally use the following commands:

* `npm run build-production` (this builds the production ready ui)
* `docker build -t <image-name> .` (e.g. `docker build -t qollabor-ui .`; to build a local image)

## Running the image

The Qollabor-UI is dependent on the Qollabor API to be able to do something useful, so you need to set some enviroment variables to point to your running instance of the Qollabor API.

You need to set the following environment variables (or pass them to the image when running it):

* `QOLLABOR_API_HOST`: the hostname or ip address of the Qollabor API host (defaults to `qollabor`)
* `QOLLABOR_API_PORT`: the (http) port the Qollabor API is running on (default to 18082)

> Since you are running a docker container, setting the host to `localhost` would resolve to the container itself and will be of no use

To start a container run

`docker run --rm -d --name qollabor-ui -e QOLLABOR_API_HOST=1.1.1.1 -e QOLLABOR_API_PORT=18082 -p "8081:80" qollabor-ui`

This runs the ui container and expects the api on the ip 1.1.1.1 and port 18082. It exposes the UI on port 18082 and the container will be deleted when stopped.



