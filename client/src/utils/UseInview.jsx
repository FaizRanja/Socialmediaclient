import React, { useEffect, useRef } from 'react'


// Custom Hook for detecting element in viewport
const UseInview = (options) => {
  const ref = useRef(null);
  const [isInView, setInView] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
    }, options);

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [options]);

  return [ref, isInView];
};

export default UseInview