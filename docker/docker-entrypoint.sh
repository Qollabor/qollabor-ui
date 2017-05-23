#!/bin/sh

echo "Setting reverse proxy parameters for Cafienne-UI"

if [ -z ${CAFIENNE_API_HOST} ]; then
  CAFIENNE_API_HOST=cafienne
fi

if [ -z ${CAFIENNE_API_PORT} ]; then
  CAFIENNE_API_PORT=18082
fi

export CAFIENNE_API_HOST CAFIENNE_API_PORT

echo "Setting CAFIENNE_API_HOST to: ${CAFIENNE_API_HOST}"
echo "Setting CAFIENNE_API_PORT to: ${CAFIENNE_API_PORT}"

echo "Updating NGINX reverse proxy config"
envsubst '${CAFIENNE_API_HOST} ${CAFIENNE_API_PORT}' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf

echo "Starting NGINX..."
exec $(which nginx) -g "daemon off;"
