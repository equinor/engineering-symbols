FROM node:16.14

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN mkdir /.npm
# RUN mkdir node_modules/.cache && chmod -R 777 node_modules/.cache
RUN chown -R 1001 /app && chown -R 1001:0 "/.npm"

USER 1001
EXPOSE 3000

RUN npm run build
CMD ["npm", "start"]
