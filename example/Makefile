BIN = ../node_modules/.bin

build: bundle.js

publish:
	rm -rf .git
	git init .
	git checkout -b gh-pages
	git add .
	git commit -m 'Docs'
	git push -f git@github.com:andreypopp/react-textarea-autosize.git gh-pages

bundle.js: ../index.js index.js
	@$(BIN)/browserify ./index.js > $@
