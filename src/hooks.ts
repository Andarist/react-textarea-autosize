import * as React from 'react';
import useLatest from 'use-latest';

export { default as useComposedRef } from 'use-composed-ref';

export const useWindowResizeListener = (listener: (event: UIEvent) => any) => {
  const latestListener = useLatest(listener);

  React.useEffect(() => {
    const handler: typeof listener = event => {
      latestListener.current(event);
    };

    window.addEventListener('resize', handler);

    return () => {
      window.removeEventListener('resize', handler);
    };
  }, []);
};
