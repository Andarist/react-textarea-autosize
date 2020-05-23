# react-textarea-autosize

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
