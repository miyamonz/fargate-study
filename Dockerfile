FROM node:alpine as node

FROM node as monorepo-root
WORKDIR /monorepo
COPY package.json package-lock.json ./
RUN npm install

FROM monorepo-root as repo-server
WORKDIR /monorepo/server
COPY ./server/package.json ./
RUN npm install

COPY ./server/server.js ./

EXPOSE 3000
EXPOSE 3001

CMD ["node", "./server.js"]