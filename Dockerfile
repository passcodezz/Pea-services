FROM node:latest as build-stage

WORKDIR /app

COPY package.json ./

COPY . .

RUN npm install

RUN npm run build:dev

FROM node:latest

WORKDIR /app

COPY --from=build-stage /app ./

EXPOSE 8888

CMD ["npm", "run", "preview"]

#docker build registry.konklom/pea-frontend:1.0.7