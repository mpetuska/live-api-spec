FROM node:13-alpine AS builder
ARG APP_PORT=5001

WORKDIR /build
COPY . .
RUN yarn install
RUN yarn clean
RUN yarn build


FROM node:12-alpine
WORKDIR /api

COPY --from=builder /build/build ./build
COPY --from=builder /build/package.json package.json
COPY --from=builder /build/yarn.lock yarn.lock
RUN echo "APP_PORT=$APP_PORT" > .env
RUN yarn install --production
RUN cat .env

EXPOSE $APP_PORT

ENTRYPOINT yarn start
