'use client';

import * as React from 'react';
function usePreviousProps(value) {
  const ref = React.useRef({});
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
export default usePreviousProps;