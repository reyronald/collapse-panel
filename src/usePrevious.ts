import React from 'react'

export function usePrevious<T>(value: T): T | void {
  const ref = React.useRef<T | void>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
