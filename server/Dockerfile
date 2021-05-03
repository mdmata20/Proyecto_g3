FROM node:12-alphine

WORKDIR /usr/app/back

ARG NODE_ENV
ENV NODE_ENV $NODE_ENV

COPY package.json /usr/app/back
RUN npm install typescript -g
RUN npm install

COPY . /usr/app/back

CMD ["npm", "run", "dev"]

EXPOSE 3000