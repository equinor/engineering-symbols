FROM node:lts-alpine

WORKDIR /src

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# Add a new group "radix-non-root-group" with group id 1001 
RUN addgroup -S -g 1001 radix-non-root-group

# Add a new user "radix-non-root-user" with user id 1001 and include in group
RUN adduser -S -u 1001 -G radix-non-root-group radix-non-root-user

USER 1001
EXPOSE 3000