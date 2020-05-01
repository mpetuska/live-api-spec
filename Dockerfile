FROM node:13-alpine AS builder

WORKDIR /build
COPY . .
RUN apk add git
RUN yarn install
RUN yarn clean
RUN yarn build


FROM node:13-alpine
WORKDIR /api
ENV APP_PORT=5001

COPY --from=builder /build/build/ build/
COPY --from=builder /build/package.json package.json
COPY --from=builder /build/yarn.lock yarn.lock
COPY --from=builder /build/.yarnrc.yml .yarnrc.yml
COPY --from=builder /build/.yarn/ .yarn/
RUN yarn install

EXPOSE $APP_PORT

ENTRYPOINT yarn start:production
