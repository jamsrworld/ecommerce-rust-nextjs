.DEFAULT_GOAL := dev

hello:
	@echo "Hello World"	

dev:
	@cargo watch -w src -x run

build:
	@cargo build --release

generate:
	sea-orm-cli generate entity -o entity/src --with-serde both

fix:
	cargo fix --allow-dirty --allow-staged	

open:
	open http://localhost:8008
	open http://localhost:8008/scalar
	open http://localhost:8008/swagger-ui/