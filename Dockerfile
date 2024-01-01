FROM node:16.11

WORKDIR /usr/src/app

COPY package*.json ./

COPY tsconfig.json ./

COPY . .

RUN yarn install

ENV TZ=America/Sao_Paulo

EXPOSE 80

CMD [ "yarn", "run", "start" ]
