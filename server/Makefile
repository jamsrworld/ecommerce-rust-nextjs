.DEFAULT_GOAL := dev

hello:
	@echo "Hello World"	

dev:
	@cargo watch -x run

build:
	@cargo build --release

fix_entity:
	tsx scripts/fix_entity.ts

generate_entity:
	sea-orm-cli generate entity -o db/entity/src --with-serde both --model-extra-derives "utoipa::ToSchema" --model-extra-attributes "serde(rename_all=\"camelCase\")" --enum-extra-derives "utoipa::ToSchema"
	@$(MAKE) fix_entity

fix:
	cargo fix --allow-dirty --allow-staged

open:
	open http://localhost:8008
	open http://localhost:8008/scalar
	open http://localhost:8008/swagger-ui/