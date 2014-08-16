BIN = ../node_modules/.bin

build: bundle.js

publish:
	rm -rf .git
	git init .
	git co -b gh-pages
	git add .
	git ci -m 'Docs'
	git push -f git@github.com:andreypopp/react-textarea-autosize.git gh-pages

bundle.js: ../index.js index.js
	@$(BIN)/browserify example/index.js > $@
