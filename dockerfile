FROM node:lts-alpine as build-stage

WORKDIR /app

COPY package*.json ./
COPY yarn.lock ./
COPY prisma ./prisma/

COPY . .

RUN yarn 

EXPOSE 3001

CMD [ "yarn","start:dev" ]