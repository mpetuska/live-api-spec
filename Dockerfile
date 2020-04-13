FROM node:12-alpine AS builder
ARG APP_PORT=5001
ARG BASE_URI="http://localhost:$APP_PORT"

WORKDIR /build
COPY . .
RUN echo "BASE_URI=$BASE_URI" > .env
RUN echo "APP_PORT=$APP_PORT" >> .env
RUN yarn install
RUN yarn build


FROM node:12-alpine
WORKDIR /api

COPY --from=builder /build/dist ./dist
COPY --from=builder /build/.env .env
COPY --from=builder /build/package.json package.json
COPY --from=builder /build/yarn.lock yarn.lock
RUN yarn install --production
RUN cat .env

EXPOSE $APP_PORT

ENTRYPOINT yarn start
