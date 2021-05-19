#!/bin/sh

echo "Setting reverse proxy parameters for Qollabor-UI"

if [ -z ${QOLLABOR_API_HOST} ]; then
  QOLLABOR_API_HOST=qollabor
fi

if [ -z ${QOLLABOR_API_PORT} ]; then
  QOLLABOR_API_PORT=18082
fi

export QOLLABOR_API_HOST QOLLABOR_API_PORT

echo "Setting QOLLABOR_API_HOST to: ${QOLLABOR_API_HOST}"
echo "Setting QOLLABOR_API_PORT to: ${QOLLABOR_API_PORT}"

echo "Updating NGINX reverse proxy config"
envsubst '${QOLLABOR_API_HOST} ${QOLLABOR_API_PORT}' < /etc/nginx/conf.d/default.template > /etc/nginx/conf.d/default.conf

echo "Starting NGINX..."
exec $(which nginx) -g "daemon off;"
