import * as React from 'react';
import useLatest from 'use-latest';

export { default as useComposedRef } from 'use-composed-ref';

export const useWindowResizeListener = (listener: (event: UIEvent) => any) => {
  const latestListener = useLatest(listener);

  React.useLayoutEffect(() => {
    const handler: typeof listener = (event) => {
      latestListener.current(event);
    };

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);
};

export const useFontsLoadedListener = (listener: () => any) => {
  const latestListener = useLatest(listener);

  React.useLayoutEffect(() => {
    const handler: typeof listener = () => {
      console.log('loaded!');
      latestListener.current();
    };

    document.fonts.addEventListener('loadingdone', handler);

    return () => {
      document.fonts.removeEventListener('loadingdone', handler);
    };
  }, []);
};
