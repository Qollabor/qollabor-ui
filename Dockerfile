FROM nginx:alpine
MAINTAINER SpronQ <info@spronq.com>
RUN rm -rf /usr/share/nginx/html/*
COPY dist/ /usr/share/nginx/html/
CMD nginx -g 'daemon off;'
