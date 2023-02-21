FROM node:18.13.0

WORKDIR /src

COPY package*.json ./

EXPOSE 5000

RUN yarn install

COPY . .