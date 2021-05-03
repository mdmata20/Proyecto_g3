FROM node:12-alpine

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY . /usr/src/app

RUN npm install

CMD ["npm", "start"]
EXPOSE 4200