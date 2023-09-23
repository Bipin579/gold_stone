FROM node:18-slim

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./  

RUN npm install  

COPY . .

EXPOSE 8080

CMD ["node", "index.js"]  # Use "node" to run your index.js file
