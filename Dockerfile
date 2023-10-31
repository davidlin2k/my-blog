FROM oven/bun AS builder

WORKDIR /app

COPY package*.json bun.lockb ./
RUN bun install

COPY . .

RUN bun run build
RUN bun prune --production

FROM oven/bun

WORKDIR /app

RUN apt-get update && apt-get install -y curl

COPY --from=builder /app/build ./build/
COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/server.js ./
COPY package.json .

EXPOSE 3000
ENV NODE_ENV=production

ARG ORIGIN
ENV ORIGIN=$ORIGIN

CMD [ "bun", "server.js" ]
