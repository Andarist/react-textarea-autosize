---
'react-textarea-autosize': patch
---

- Removed props.style.height from `TextareaAutosizeProps`'s `style` prop.
- `TextareaAutosizeProps` now extends from `React.TextareaHTMLAttributes<HTMLTextAreaElement>` instead of `JSX.IntrinsicElements['textarea']` to avoid problems with `ref` attribute.
