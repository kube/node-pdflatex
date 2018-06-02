FROM node:8-alpine

RUN apk add --update \ 
--repository http://dl-cdn.alpinelinux.org/alpine/edge/main \
--repository http://dl-cdn.alpinelinux.org/alpine/edge/community \
--repository http://dl-cdn.alpinelinux.org/alpine/edge/testing \
--no-cache texlive-full \
--no-cache texlive-xetex \
--no-cache ttf-font-awesome
