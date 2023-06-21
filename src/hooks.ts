import * as React from 'react';
import useLatest from 'use-latest';

export { default as useComposedRef } from 'use-composed-ref';

type UnknownFunction = (...args: any[]) => any;

type InferEventType<TTarget> = TTarget extends {
  // we infer from 2 overloads which are super common for event targets in the DOM lib
  // we "prioritize" the first one as the first one is always more specific
  addEventListener(type: infer P, ...args: any): void;
  // we can ignore the second one as it's usually just a fallback that allows bare `string` here
  // we use `infer P2` over `any` as we really don't care about this type value
  // and we don't want to accidentally fail a type assignability check, remember that `any` isn't assignable to `never`
  addEventListener(type: infer P2, ...args: any): void;
}
  ? P & string
  : never;

type InferEvent<
  TTarget,
  TType extends string,
> = `on${TType}` extends keyof TTarget
  ? Parameters<Extract<TTarget[`on${TType}`], UnknownFunction>>[0]
  : Event;

function useListener<
  TTarget extends EventTarget,
  TType extends InferEventType<TTarget>,
>(
  target: TTarget,
  type: TType,
  listener: (event: InferEvent<TTarget, TType>) => void,
) {
  const latestListener = useLatest(listener);
  React.useLayoutEffect(() => {
    const handler: typeof listener = (ev) => latestListener.current(ev);

    // might happen if document.fonts is not defined, for instance
    if (!target) {
      return;
    }

    target.addEventListener(type, handler);
    return () => target.removeEventListener(type, handler);
  }, []);
}

export const useWindowResizeListener = (listener: (event: UIEvent) => any) => {
  useListener(window, 'resize', listener);
};

export const useFontsLoadedListener = (listener: (event: Event) => any) => {
  useListener(document.fonts, 'loadingdone', listener);
};
