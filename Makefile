BIN = ./node_modules/.bin

all:

install:
	npm install

test:
	#@$(BIN)/mocha complex -b -R spec ./spec.js

release-patch: test
	@$(call release,patch)

release-minor: test
	@$(call release,minor)

release-major: test
	@$(call release,major)

publish:
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1)
endef
