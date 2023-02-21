FROM node:18.13.0

WORKDIR /src

COPY package*.json ./

EXPOSE 3000

RUN yarn install

COPY . .