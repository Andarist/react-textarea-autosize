BIN = node_modules/.bin
SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%=lib/%)
ES = $(SRC:src/%=es/%)
TESTS = $(wildcard src/__tests__/*-test.js)

BABEL_OPTS = \
	--sourceMaps=inline

build: $(LIB) $(ES) build-min

test::
	@echo No tests...

lint::
	@$(BIN)/eslint $(SRC)

clean:
	@rm -rf $(LIB) $(ES)

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

build-min: $(LIB)
	@echo "building dist/TextareaAutosize.min.js"
	@$(BIN)/cross-env BABEL_ENV=es NODE_ENV=production $(BIN)/rollup -c

lib/%.js: src/%.js
	@echo "building cjs $@"
	@mkdir -p $(@D)
	@$(BIN)/cross-env BABEL_ENV=cjs $(BIN)/babel $(BABEL_OPTS) -o $@ $<

es/%.js: src/%.js
	@echo "building es $@"
	@mkdir -p $(@D)
	@$(BIN)/cross-env BABEL_ENV=es $(BIN)/babel $(BABEL_OPTS) -o $@ $<
