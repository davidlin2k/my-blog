FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build
RUN npm prune --production

FROM node:18-alpine

WORKDIR /app

RUN apk add --update curl && \
    rm -rf /var/cache/apk/*

COPY --from=builder /app/build ./build/
COPY --from=builder /app/node_modules ./node_modules/
COPY --from=builder /app/server.js ./
COPY package.json .

EXPOSE 3000
ENV NODE_ENV=production

ARG ORIGIN
ENV ORIGIN=$ORIGIN

CMD [ "node", "server.js" ]
