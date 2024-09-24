import { useRef, useEffect } from 'react';

export function useHover (setFunction, onMouseOverValue, onMouseOutValue) {
  const ref = useRef(null);

  useEffect(
    () => {
      const node = ref.current;

      const handleMouseOver = () => setFunction(onMouseOverValue);
      const handleMouseOut = () => setFunction(onMouseOutValue);

      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);

        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
    },
    [ setFunction, onMouseOverValue, onMouseOutValue ]
  );

  return ref;
}
