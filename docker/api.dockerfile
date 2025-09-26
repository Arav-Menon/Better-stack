FROM oven/bun:latest

WORKDIR /app

COPY package*.json ./
COPY bun.lock ./
COPY turbo.json ./

COPY . .

RUN bun install

WORKDIR /package/db

RUN bunx generate

WORKDIR /app/apps/api

EXPOSE 3001

CMD [ "bun", "start:backend" ]