---
'react-textarea-autosize': patch
---

`TextareaAutosizeProps` are now based on `React.TextareaHTMLAttributes<HTMLTextAreaElement>` instead of `JSX.IntrinsicElements['textarea']`. The latter one includes a type for `ref` attribute and it being included as part of `TextareaAutosizeProps` has caused problems when using `TextareaAutosizeProps` to declare wrapper components. This is also more semantically correct as `ref` shouldn't be a part of `props`. It's rather accepted by a particular JSX element and in case of the `react-textarea-autosize` this is the type of the exported component which is `React.ForwardRefExoticComponent<TextareaAutosizeProps>` (a result of `React.forwardRef` call).
