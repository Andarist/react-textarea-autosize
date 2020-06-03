---
'react-textarea-autosize': patch
---

`ref` got excluded from `TextareaAutosizeProps`. It being included has caused problems when using `TextareaAutosizeProps` to declare wrapper components and there seems to be no value in having it included in this type.
