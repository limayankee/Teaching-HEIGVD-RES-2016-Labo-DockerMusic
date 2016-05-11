FROM node:4.3.1

COPY musician.js /home
COPY package.json /home

WORKDIR /home

RUN npm install

ENTRYPOINT ["node", "musician.js"]