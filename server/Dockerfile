FROM node:latest
WORKDIR /usr/app/back
COPY package*.json .
RUN npm install typescript -g
RUN npm install
COPY . .
EXPOSE 3000

CMD ["node", "build/index.js"]