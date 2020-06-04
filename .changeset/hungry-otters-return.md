---
'react-textarea-autosize': patch
---

`maxHeight` and `minHeight` has been disallowed as part of `TextareaAutosizeProps['style']`. The intention to do that was there since the v8 release but it was not implemented correctly and allowed those to slip into the mentioned type.
