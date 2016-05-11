FROM node:latest

COPY auditor.js /home
COPY package.json /home

WORKDIR /home

RUN npm install

ENTRYPOINT ["node", "auditor.js"]
