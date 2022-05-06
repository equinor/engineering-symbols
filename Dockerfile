FROM node:16.14

WORKDIR .

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN chown -R 1001 /node_modules

USER 1001
EXPOSE 3000

CMD ["npm", "start"]
