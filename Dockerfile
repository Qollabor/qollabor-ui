FROM nginx:alpine
MAINTAINER Qollabor <info@qollabor.com>
RUN rm -rf /usr/share/nginx/html/*
COPY dist/ /usr/share/nginx/html/
COPY docker/nginx.default.template /etc/nginx/conf.d/default.template
COPY docker/docker-entrypoint.sh /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]

