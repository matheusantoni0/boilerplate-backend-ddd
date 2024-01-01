include .env

#
# Start & Shutdown
#
up:
	docker-compose up -d

logs:
	docker-compose logs -f app

down:
	docker-compose kill
	docker-compose rm -f

restart-%:
	docker-compose restart $*

#
# Database Migrations
#
new-migration-%:
	yarn typeorm migration:create ./src/configs/database/migrations/$*

migrate-up:
	yarn typeorm migration:run -d ./src/configs/database/database-factory.ts

migrate-down:
	docker-compose run --rm -w ${PWD}/migrations app yarn knex migrate:rollback

#
# Lint
#
lint:
	docker-compose run --rm --no-deps -w ${PWD} app yarn lint

lint-fix:
	docker-compose run --rm --no-deps -w ${PWD} app yarn lint --fix

#
# Tests
#
test:
	docker-compose run --rm -w ${PWD} app yarn test --coverage

test-%:
	docker-compose run --rm -w ${PWD} app yarn test $* --coverage

test-watch:
	docker-compose run --rm -w ${PWD} app yarn test --watchAll
