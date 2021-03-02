---
'react-textarea-autosize': patch
---

Changed `TextareaAutosizeProps` to a TS interface which fixes the problem of "resolved" being type alias being inlined in the emitted types declaration which could cause incompatibilities with some versions of `@types/react`.
