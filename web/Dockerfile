FROM node:16.14

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN mkdir /.npm
RUN chown -R 1001 /app/node_modules && chown -R 1001:0 "/.npm"

USER 1001
EXPOSE 3000

CMD ["npm", "run", "build", "&", "npm", "start"]
