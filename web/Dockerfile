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

ARG NEXT_PUBLIC_MSAL_CLIENT_ID
ARG NEXT_PUBLIC_MSAL_AUTHORITY

RUN BUILD_ARG1=$(echo $NEXT_PUBLIC_MSAL_CLIENT_ID|base64 -d) && BUILD_ARG2=$(echo $NEXT_PUBLIC_MSAL_AUTHORITY|base64 -d) &&

RUN npm run build
CMD ["npm", "start"]
