.DELETE_ON_ERROR:
BIN = ./node_modules/.bin

build: bundle.js

install:
	npm install

clean:
	rm -rf bundle.js

publish:
	rm -rf .git
	git init .
	git checkout -b gh-pages
	git add .
	git commit -m 'Docs'
	git push -f git@github.com:andreypopp/react-textarea-autosize.git gh-pages

bundle.js: index.js ../src/TextareaAutosize.js ../src/calculateNodeHeight.js
	@$(BIN)/browserify --debug --transform [ babelify --no-sourceMaps ] ./index.js > $@

watch:
	@$(BIN)/watchify -v --debug --transform [ babelify --no-sourceMaps ] ./index.js -o ./bundle.js
