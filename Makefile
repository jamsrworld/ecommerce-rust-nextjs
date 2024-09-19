.DEFAULT_GOAL := dev

hello:
	@echo "Hello World"	

dev:
	@cargo watch -w src -x run

build:
	@cargo build --release

open:
	open http://localhost:8008
	open http://localhost:8008/scalar
	open http://localhost:8008/swagger-ui/