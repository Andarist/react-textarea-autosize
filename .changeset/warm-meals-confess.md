---
'react-textarea-autosize': major
---

`onHeightChange` callback no longer receives the second argument. It was the component's instance (its `this`), but as the component is now implemented using hooks there no longer is any instance that could be given to a consumer like that.
