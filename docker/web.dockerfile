FROM oven/bun:latest

WORKDIR /app

COPY package*.json ./
COPY bun.lock ./
COPY turbo.json ./

COPY . .

RUN bun install

WORKDIR /app/apps/web

EXPOSE 3000

CMD ["bun", "dev"]