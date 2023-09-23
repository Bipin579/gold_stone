FROM node:18-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./  

RUN npm install  # Replace "yarn install" with "npm install"

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]  # Replace "yarn start" with "npm start"
