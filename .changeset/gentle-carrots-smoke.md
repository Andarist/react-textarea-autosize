---
'react-textarea-autosize': patch
---

Distribute completely separate files for the `worker` condition to avoid bundlers from aliasing files targeting node to the ones targeting browsers through the `package.json#browser` alias field.
