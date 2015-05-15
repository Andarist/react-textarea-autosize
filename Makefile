BIN = node_modules/.bin
SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%=lib/%)
TESTS = $(wildcard src/__tests__/*-test.js)

BABEL_OPTS = \
	--stage 0 \
	--source-maps-inline

build: $(LIB)

test::
	@echo No tests...

lint::
	@$(BIN)/eslint $(SRC)

clean:
	@rm -f $(LIB)

sloc:
	@$(BIN)/sloc ./src

release-patch: lint test build
	@$(call release,patch)

release-minor: lint test build
	@$(call release,minor)

release-major: lint test build
	@$(call release,major)

release = npm version $(1)

publish: build
	@git push --tags origin HEAD:master
	@npm publish

lib/%.js: src/%.js
	@echo "building $@"
	@mkdir -p $(@D)
	@$(BIN)/babel $(BABEL_OPTS) -o $@ $<
