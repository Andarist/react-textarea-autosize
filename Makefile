BIN = node_modules/.bin
SRC = $(wildcard src/*.js)
LIB = $(SRC:src/%=lib/%)
TESTS = $(wildcard src/__tests__/*-test.js)

BABEL_OPTS = \
	--experimental \
	--playground \
	--source-maps-inline \
	--optional runtime \

sloc:
	@$(BIN)/sloc ./src

build: $(LIB)

clean:
	@rm -f $(LIB)

lib/%.js: src/%.js
	@echo "building $@"
	@mkdir -p $(@D)
	@$(BIN)/babel $(BABEL_OPTS) -o $@ $<
