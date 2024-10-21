.DEFAULT_GOAL := dev

hello:
	@echo "Hello World"	

dev:
	@cargo watch -x run

build:
	@cargo build --release

run_migration:
	sea-orm-cli migrate up -d db/migration

down_migration:
	sea-orm-cli migrate down -d db/migration

fix_entity: # It is used to fix the chrono date time issue with utoipa ToSchema
	tsx scripts/fix_entity.ts

generate_entity:
	sea-orm-cli generate entity -o db/entity/src --with-serde both --model-extra-derives "utoipa::ToSchema" --model-extra-attributes "serde(rename_all=\"camelCase\")" --enum-extra-derives "utoipa::ToSchema"
	@$(MAKE) fix_entity

generate_migration:
	sea-orm-cli migrate generate $(name) -d db/migration

fix:
	cargo fix --allow-dirty --allow-staged

open:
	open http://localhost:8008
	open http://localhost:8008/scalar
	open http://localhost:8008/swagger-ui/