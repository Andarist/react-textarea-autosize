# react-textarea-autosize

## 8.0.1

### Patch Changes

- [`2307033`](https://github.com/Andarist/react-textarea-autosize/commit/230703341e366ad861e3a24e20f1d9fd6f9ced47) [#266](https://github.com/Andarist/react-textarea-autosize/pull/266) Thanks [@vlazh](https://github.com/vlazh)! - Fixed a regression with calculating too high height for textareas with `box-sizing: border-box;`.

* [`1d1bba2`](https://github.com/Andarist/react-textarea-autosize/commit/1d1bba23140a7948b34a1cb9678802c71744b0f4) [#265](https://github.com/Andarist/react-textarea-autosize/pull/265) Thanks [@SimenB](https://github.com/SimenB)! - Exported `TextareaAutosizeProps` type for convenience.

- [`da960f4`](https://github.com/Andarist/react-textarea-autosize/commit/da960f46084f3b584506f3513b77958d5265fcad) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with internal cache not being populated correctly when using `cacheMeasurements` prop.

## 8.0.0

### Major Changes

- The package has been rewritten in TypeScript so type definitions are now included in the package itself. There is no need to install separate types from the [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped).
- At the same time the package internals have been rewritten to use React's [hooks API](https://reactjs.org/docs/hooks-intro.html). This means that the peer dependency requirement for React version had to be changed to `^16.8.0`.
- You can now use `ref` prop to get access to the underlaying `textarea` element as [`React.forwardRef`](https://reactjs.org/docs/react-api.html#reactforwardref) is being used now. The support for `innerRef` has been completely removed.
- `useCacheForDOMMeasurements` prop has been renamed to `cacheMeasurements`.
- `onHeightChange` callback no longer receives the second argument. It was the component's instance (its `this`), but as the component is now implemented using hooks there no longer is any instance that could be given to a consumer like that.
- Removed handling `props.style.maxHeight` and `props.style.minHeight` values. If you need to control those boundaries you should use `maxRows` and `minRows` props respectively.

### Minor Changes

- The height is being set now directly on the underlaying `textarea` element and not caused by updating internal state and this triggering React's rerender. This shouldn't make for any observable difference for consumers of this package.
