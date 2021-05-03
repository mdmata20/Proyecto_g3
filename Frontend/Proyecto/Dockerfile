FROM node:12-alpine

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY . /usr/src/app

RUN npm install
RUN npm run build

FROM nginx:latest

COPY --from=build /usr/src/app/dist/Proyecto /usr/share/nginx/html

EXPOSE 4200