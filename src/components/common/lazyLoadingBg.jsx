import React, { useEffect, useRef, useState } from 'react';

export function LazyBackgroundImage({ src }) {
  const ref = useRef();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoaded(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '0px 0px 100px 0px',
        threshold: 0.01,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        // width: '100%',
        // height: '100%',
        // backgroundColor: '#ccc', // placeholder
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundImage: loaded ? `url(${src})` : 'none',
        // borderRadius:"20px"
      }}
      className="w-full h-full object-cover"

    />
  );
}


export default function BackgroundImageGallery({ images }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 200px)',
        gap: '10px',
      }}
    >
      {images.map((url, idx) => (
        <LazyBackgroundImage key={idx} src={url} />
      ))}
    </div>
  );
}
