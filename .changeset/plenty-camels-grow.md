---
'react-textarea-autosize': minor
---

The height is being set now directly on the underlaying `textarea` element and not caused by updating internal state and this triggering React's rerender. This shouldn't make for any observable difference for consumers of this package.
