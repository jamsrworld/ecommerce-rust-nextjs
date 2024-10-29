# syntax=docker/dockerfile:1

ARG RUST_VERSION=1.80.1
ARG APP_NAME=mcart

################################################################################
# Create a stage for building the application.
FROM rust:${RUST_VERSION} AS build
ARG APP_NAME
WORKDIR /app

# Install host build dependencies.
# RUN apk add --no-cache clang lld musl-dev git openssl-dev curl libpq-dev
RUN --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=routers,target=routers \
    --mount=type=bind,source=db,target=db \
    --mount=type=bind,source=packages,target=packages \
    --mount=type=bind,source=Cargo.toml,target=Cargo.toml \
    --mount=type=bind,source=Cargo.lock,target=Cargo.lock \
    --mount=type=cache,target=/app/target/ \
    --mount=type=cache,target=/usr/local/cargo/git/db \
    --mount=type=cache,target=/usr/local/cargo/registry/ \
    cargo build --locked --release && \
    cp ./target/release/$APP_NAME /app/server

FROM rust:${RUST_VERSION} AS final
ARG UID=10001
WORKDIR /app
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser
COPY --from=build /app/server /app
EXPOSE 5003
# CMD ["sleep", "infinity"]
CMD ["./server"]