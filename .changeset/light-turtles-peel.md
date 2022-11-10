---
'react-textarea-autosize': minor
---

`exports` field has been added to the `package.json` manifest.

Thanks to this, the package now includes a `worker` condition that can be utilized by properly configured bundlers when targeting worker-like environments. It fixes the issue with browser-specific files being prioritized by some bundlers when targeting workers.
