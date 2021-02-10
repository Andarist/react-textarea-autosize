---
'react-textarea-autosize': patch
---

Moved internal `'resize'` listener to the layout effect since React 17 calls cleanups of regular effects asynchronously. This ensures that we don't ever try to access the already unmounted ref in our listener.
