# react-textarea-autosize

## 8.5.9

### Patch Changes

- [#417](https://github.com/Andarist/react-textarea-autosize/pull/417) [`cbced4f`](https://github.com/Andarist/react-textarea-autosize/commit/cbced4f2e22b1ed04eca5183bd3f5d3659dd345e) Thanks [@threepointone](https://github.com/threepointone)! - Added `edge-light` and `workerd` conditions to `package.json` manifest to better serve users using Vercel Edge and Cloudflare Workers.

  This lets tools like Wrangler and the Cloudflare Vite Plugin pick up the right version of the built module, preventing issues like https://github.com/cloudflare/workers-sdk/issues/8723.

## 8.5.8

### Patch Changes

- [#414](https://github.com/Andarist/react-textarea-autosize/pull/414) [`d12e6a5`](https://github.com/Andarist/react-textarea-autosize/commit/d12e6a5f9a9f37860cfad86410d5dcc4e6aaf9ec) Thanks [@benjaminwaterlot](https://github.com/benjaminwaterlot)! - Fixed a race condition leading to an error caused by textarea being unmounted before internal `requestAnimationFrame`'s callback being fired

## 8.5.7

### Patch Changes

- [#409](https://github.com/Andarist/react-textarea-autosize/pull/409) [`8c47e31`](https://github.com/Andarist/react-textarea-autosize/commit/8c47e314bc96077fba62505e71fbcd55a7b9a485) Thanks [@Andarist](https://github.com/Andarist)! - Fixed an issue with resize not happening after the containing form being reset

## 8.5.6

### Patch Changes

- [#400](https://github.com/Andarist/react-textarea-autosize/pull/400) [`7d48e9e`](https://github.com/Andarist/react-textarea-autosize/commit/7d48e9e80a3c6d8c123d135205857cbe39dbf6ee) Thanks [@Yonom](https://github.com/Yonom)! - Add React 19 to the allowed peer dependency range.

## 8.5.5

### Patch Changes

- [#401](https://github.com/Andarist/react-textarea-autosize/pull/401) [`4a34e1b`](https://github.com/Andarist/react-textarea-autosize/commit/4a34e1b28a4b8840ba041fc9f5e448beabd56c5e) Thanks [@olee](https://github.com/olee)! - Add missing `wordSpacing` and `scrollbarGutter` as properties that can impact sizing

## 8.5.4

### Patch Changes

- [#397](https://github.com/Andarist/react-textarea-autosize/pull/397) [`bf3cad8`](https://github.com/Andarist/react-textarea-autosize/commit/bf3cad84e64cc838834e5c71e6074b96e0109b0c) Thanks [@Oyveloper](https://github.com/Oyveloper)! - Force `display: block` for the hidden textarea to prevent other styles from overriding it and thus breaking the resizing functionality

## 8.5.3

### Patch Changes

- [#386](https://github.com/Andarist/react-textarea-autosize/pull/386) [`b3dc597`](https://github.com/Andarist/react-textarea-autosize/commit/b3dc597c7b33e7fc858e82b1605f1fe1137ec775) Thanks [@Andarist](https://github.com/Andarist)! - Distribute completely separate files for the `worker` condition to avoid bundlers from aliasing files targeting node to the ones targeting browsers through the `package.json#browser` alias field.

## 8.5.2

### Patch Changes

- [#381](https://github.com/Andarist/react-textarea-autosize/pull/381) [`e16c24a`](https://github.com/Andarist/react-textarea-autosize/commit/e16c24aaf15e33458c4b433a2debee87b9aab723) Thanks [@Andarist](https://github.com/Andarist)! - Publish files that were previously missing for some conditions.

## 8.5.1

### Patch Changes

- [#377](https://github.com/Andarist/react-textarea-autosize/pull/377) [`4087205`](https://github.com/Andarist/react-textarea-autosize/commit/4087205acb89a2cdfda02dc9297c0db4cafd0ee9) Thanks [@Andarist](https://github.com/Andarist)! - The provided `onChange` will get forwarded again to the underlying `<textarea/>` on the server side.

## 8.5.0

### Minor Changes

- [#373](https://github.com/Andarist/react-textarea-autosize/pull/373) [`05b014a`](https://github.com/Andarist/react-textarea-autosize/commit/05b014a8c46834bba42ccd506d18e28064b9dc9a) Thanks [@Andarist](https://github.com/Andarist)! - Compatibility with node's ESM has been improved. `import TextareaAutosize from 'react-textarea-autosize';` was always meant to provide you the default export of this package (the exported component) and now node should load it this way.

* [#373](https://github.com/Andarist/react-textarea-autosize/pull/373) [`05b014a`](https://github.com/Andarist/react-textarea-autosize/commit/05b014a8c46834bba42ccd506d18e28064b9dc9a) Thanks [@Andarist](https://github.com/Andarist)! - SSR environments should now be able to pick smaller bundles through `package.json#exports`.

- [#373](https://github.com/Andarist/react-textarea-autosize/pull/373) [`05b014a`](https://github.com/Andarist/react-textarea-autosize/commit/05b014a8c46834bba42ccd506d18e28064b9dc9a) Thanks [@Andarist](https://github.com/Andarist)! - This package no longer depends on `process.env.NODE_ENV`. To get dev-only warnings you have to configure your bundler/runtime to use the `development` condition.

### Patch Changes

- [#370](https://github.com/Andarist/react-textarea-autosize/pull/370) [`d33b120`](https://github.com/Andarist/react-textarea-autosize/commit/d33b1200198eb49a3579225a118389e0e1fb82cd) Thanks [@ArnaudRinquin](https://github.com/ArnaudRinquin)! - Add a guard against potentially missing `documents.fonts`

## 8.4.1

### Patch Changes

- [#353](https://github.com/Andarist/react-textarea-autosize/pull/353) [`19aead9`](https://github.com/Andarist/react-textarea-autosize/commit/19aead90a90311362cec51e841d2a56147ad4b5d) Thanks [@knownasilya](https://github.com/knownasilya)! - Workaround for Firefox `scrollHeight` bug affecting textarea's height on a dynamic toggle

* [#362](https://github.com/Andarist/react-textarea-autosize/pull/362) [`2301195`](https://github.com/Andarist/react-textarea-autosize/commit/23011958b6095ea017ecb4482ac043bb9f7a9c3a) Thanks [@ArnaudRinquin](https://github.com/ArnaudRinquin)! - Support automatic resizing when a custom fonts ends up loading

## 8.4.0

### Minor Changes

- [#354](https://github.com/Andarist/react-textarea-autosize/pull/354) [`41d10b2`](https://github.com/Andarist/react-textarea-autosize/commit/41d10b2c5c8f9b8040fe208d09cdb60863fa0f29) Thanks [@Andarist](https://github.com/Andarist)! - `exports` field has been added to the `package.json` manifest.

  Thanks to this, the package now includes a `worker` condition that can be utilized by properly configured bundlers when targeting worker-like environments. It fixes the issue with browser-specific files being prioritized by some bundlers when targeting workers.

## 8.3.4

### Patch Changes

- [#341](https://github.com/Andarist/react-textarea-autosize/pull/341) [`9124bbf`](https://github.com/Andarist/react-textarea-autosize/commit/9124bbf71e82d9123c5dff2c3b008d33a54fc884) Thanks [@rebelliard](https://github.com/rebelliard)! - Add React 18 to the allowed peer dependency range.

## 8.3.3

### Patch Changes

- [`0d7ac21`](https://github.com/Andarist/react-textarea-autosize/commit/0d7ac21f1dadf1fb9070aea5f76f20b7ce2f24bc) [#326](https://github.com/Andarist/react-textarea-autosize/pull/326) Thanks [@karlingen](https://github.com/karlingen)! - Account for `word-break` property when calculating the height.

* [`6336448`](https://github.com/Andarist/react-textarea-autosize/commit/63364489ca172b800663b8086757d719d911a2f5) [#327](https://github.com/Andarist/react-textarea-autosize/pull/327) Thanks [@circlingthesun](https://github.com/circlingthesun)! - Fixed the `tabindex` attribute name that is set on the hidden textarea used for height calculations.

## 8.3.2

### Patch Changes

- [`3c71884`](https://github.com/Andarist/react-textarea-autosize/commit/3c7188444e66e0e199d90fbfec554f2b97695f38) [#311](https://github.com/Andarist/react-textarea-autosize/pull/311) Thanks [@Andarist](https://github.com/Andarist)! - Changed `TextareaAutosizeProps` to a TS interface which fixes the problem of "resolved" being type alias being inlined in the emitted types declaration which could cause incompatibilities with some versions of `@types/react`.

## 8.3.1

### Patch Changes

- [`49d7d04`](https://github.com/Andarist/react-textarea-autosize/commit/49d7d04737136bea93b17f3c7eadb675a10a25ae) [#305](https://github.com/Andarist/react-textarea-autosize/pull/305) Thanks [@mxschmitt](https://github.com/mxschmitt)! - Moved internal `'resize'` listener to the layout effect since React 17 calls cleanups of regular effects asynchronously. This ensures that we don't ever try to access the already unmounted ref in our listener.

## 8.3.0

### Minor Changes

- [`a16a46d`](https://github.com/Andarist/react-textarea-autosize/commit/a16a46d5dc19772fbdc9f58481699b99b485b9a3) [#296](https://github.com/Andarist/react-textarea-autosize/pull/296) Thanks [@RDIL](https://github.com/RDIL)! - Allow React 17 in the specified peer dependency range.

## 8.2.0

### Minor Changes

- [`a1fc99f`](https://github.com/Andarist/react-textarea-autosize/commit/a1fc99f79fa28b5518f1c5e937f765ace46f68c2) [#284](https://github.com/Andarist/react-textarea-autosize/pull/284) Thanks [@emmenko](https://github.com/emmenko)! - Added `{ rowHeight: number }` as a second parameter to the `onHeightChange` callback. This is useful to construct custom behaviors according to the height values.

## 8.1.1

### Patch Changes

- [`b7c227a`](https://github.com/Andarist/react-textarea-autosize/commit/b7c227a16b848b8bd6090566f3d151d4ffbe8515) [#280](https://github.com/Andarist/react-textarea-autosize/pull/280) Thanks [@emdotem](https://github.com/emdotem)! - Fixed a broken call to `setProperty` that has prevented the library to work correctly.

## 8.1.0

### Minor Changes

- [`722e10a`](https://github.com/Andarist/react-textarea-autosize/commit/722e10a0a446c2b9a51f1526895e47538b3d9f5a) [#278](https://github.com/Andarist/react-textarea-autosize/pull/278) Thanks [@emdotem](https://github.com/emdotem)! - Set inline style's `height` property with the `"important"` priority.

### Patch Changes

- [`db872f0`](https://github.com/Andarist/react-textarea-autosize/commit/db872f035e8c033eb96c40eead9c041ec6b2e09f) Thanks [@Andarist](https://github.com/Andarist)! - `TextareaAutosizeProps` are now based on `React.TextareaHTMLAttributes<HTMLTextAreaElement>` instead of `JSX.IntrinsicElements['textarea']`. The latter one includes a type for `ref` attribute and it being included as part of `TextareaAutosizeProps` has caused problems when using `TextareaAutosizeProps` to declare wrapper components. This is also more semantically correct as `ref` shouldn't be a part of `props`. It's rather accepted by a particular JSX element and in case of the `react-textarea-autosize` this is the type of the exported component which is `React.ForwardRefExoticComponent<TextareaAutosizeProps>` (a result of `React.forwardRef` call).

* [`61ca826`](https://github.com/Andarist/react-textarea-autosize/commit/61ca826a3fbe33abb9c67885d5bbd7b34ecd66db) Thanks [@Andarist](https://github.com/Andarist)! - `maxHeight` and `minHeight` has been disallowed as part of `TextareaAutosizeProps['style']`. The intention to do that was there since the v8 release but it was not implemented correctly and allowed those to slip into the mentioned type.

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
