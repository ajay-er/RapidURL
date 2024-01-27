FROM node:alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install pnpm -g

RUN  pnpm install

COPY . . 

RUN pnpm run build

FROM node:alpine as production

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --omit=dev

COPY . .

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/server.js"]