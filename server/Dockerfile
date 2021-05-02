FROM node:latest
WORKDIR /opt/back
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
ENTRYPOINT ["npm", "run", "dev"]