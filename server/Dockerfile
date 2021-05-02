FROM node:12-alpine
WORKDIR /usr/app/back
COPY package.json .
RUN npm install typescript -g
RUN npm install
COPY . .