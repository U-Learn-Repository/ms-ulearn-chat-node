FROM node:10-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY /src ./src
COPY /config ./config
COPY tsconfig.json .
CMD [ "npm", "run", "start" ]
