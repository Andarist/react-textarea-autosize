---
"react-textarea-autosize": patch
---

Fixed a race condition leading to an error caused by textarea being unmounted before internal `requestAnimationFrame`'s callback being fired
