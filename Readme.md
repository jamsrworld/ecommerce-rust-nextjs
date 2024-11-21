# Mcart

An e-commerce website built with

- frontend: next js
- backend: rust, actix web


<div>
  <div align="center" style="display: block; text-align: center;">
    <img src="https://raw.githubusercontent.com/rust-lang-ve/design/main/assets/logo_above.png" height="120" width="120" />
  </div>
  <h1 align="center">rust-mart-server</h1>
  <h4 align="center">Simple e-commerce server made with Actix</h4>
</div>

## Requirements
- Docker
- Rust

## Development

Build and run with `cargo`:

```bash
cargo run
```

### Setup Diesel

Using cargo install command, install `diesel_cli` binary:

```bash
cargo install diesel_cli --no-default-features --features postgres
```

If theres no `diesel.toml` file in the project directory, run diesel setup to generate such file.

Then run migrations issuing:

```bash
diesel migration run
```

> In order to create a new migration issue: diesel `migration generate <migration name>`

## Endpoints

Method | URL | Req. Body | Res. Body
--- | --- | --- | ---
GET | `/auth/login` | - | `{"username": String, "password": String }`

## Environment Variables

Description of the environment variables defined in the `.env.sample`.

Key | Description
--- | ---
`POSTGRES_USER` | PostgreSQL Database User
`POSTGRES_PASSWORD` | PostgreSQL Database Password
`DATABASE_URL` | PostgreSQL Database URL (Connection String)

## System Requirements

Depending on your operative system you will probably need to install some packages
to run this project.

### Ubuntu 20

The following commands must be issued to have all the dependencies in place
to build this project with `cargo build` on an Ubuntu 20 system.

```bash
# install build-essential
sudo apt install build-essential
```

```bash
# instal openssl ref: https://docs.rs/crate/openssl/0.9.24
sudo apt-get install pkg-config libssl-dev
```

```bash
# install libpq-dev to use diesel and postgresql
sudo apt install libpq-dev
```



![alt text](git_resources/logo.png)
> React.js (Chakra UI) + Redux, server Rust + Actix
# BLUEPRINT
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **_NOTE:_**  Temporary hosting on AWS with HTTP only (no TLS).

Basic e-commerce with registering system, cart and ordering system. Currently hosted on Amazon Web Services.

## Getting started

- Download repo and `cd e-commerce`
- Build React
```bash
cd frontend
npm install
npm run build
```
- Compile and run server
> NOTE: by default server runs on localhost:4040
```bash
RUST_LOG=info
cd ../backend-rust
cargo build --release
cargo run --release
```

## Screenshots
A few screenshots of app.

> Home Page
![alt text](git_resources/sc01.png)

> Product page view
![alt text](git_resources/sc02.png)

> Cart details page
![alt text](git_resources/sc03.png)

> Register page
![alt text](git_resources/sc04.png)

> Products list page
![alt text](git_resources/sc05.png)