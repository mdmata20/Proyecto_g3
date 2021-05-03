FROM node:12-alpine

WORKDIR /usr/app/back

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY . /usr/app/back
RUN npm install typescript -g
RUN npm install

RUN npm run build



CMD ["npm", "run", "dev"]

EXPOSE 3000