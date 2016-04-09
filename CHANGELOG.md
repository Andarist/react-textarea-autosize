4.0.0
=====

* [BREAKING] Code is now built using Babel 6.

  That means that CommonJS code consuming react-textarea-autosize package should
  change their require calls from:

      var Textarea = require('react-textarea-autosize')

  to:

      var Textarea = require('react-textarea-autosize').default

* [MINOR] Support for React 15.
