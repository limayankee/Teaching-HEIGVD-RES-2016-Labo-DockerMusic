FROM node:latest

COPY musician.js /
COPY package.json /

RUN npm install

ENTRYPOINT ["node", "musician.js"]
