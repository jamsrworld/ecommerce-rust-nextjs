FROM rust:1.82.0-alpine3.19 AS builder
RUN apk add --no-cache musl-dev

WORKDIR /app
COPY . .
RUN cargo build --release
CMD ["./mcart"]

FROM alpine:3.18
WORKDIR /app
COPY --from=builder /app/target/release/mcart /
RUN ls .
CMD ["./mcart"]