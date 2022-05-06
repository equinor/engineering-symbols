FROM node:lts-alpine

WORKDIR /src

COPY package.json .

RUN npm install

COPY . .

USER 1001
EXPOSE 3000

CMD ["npm", "start"]
