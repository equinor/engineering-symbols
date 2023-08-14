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

ARG MSAL_CLIENT_ID
ARG MSAL_AUTHORITY
ARG API_SCOPE

RUN export NEXT_PUBLIC_API_SCOPE=$(echo $API_SCOPE|base64 -d) && export NEXT_PUBLIC_MSAL_CLIENT_ID=$(echo $MSAL_CLIENT_ID|base64 -d) && export NEXT_PUBLIC_MSAL_AUTHORITY=$(echo $MSAL_AUTHORITY|base64 -d) && npm run build

CMD ["npm", "start"]
