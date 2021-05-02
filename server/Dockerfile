FROM node:latest
WORKDIR /opt/back
COPY . .
RUN npm install typescript -g
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]