import React, { useEffect, useRef, useState } from "react";

export function LazyImage({ src }) {
  const imgRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // stop observing once loaded
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 100px 0px", // preload when 100px below fold
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : ""}
      width={200}
      height={200}
      style={{ objectFit: "cover", background: "#ccc" }}
      alt=""
    />
  );
}

function ImageGallery({ images }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 200px)",
        gap: "10px",
      }}
    >
      {images.map((url, index) => (
        <LazyImage key={index} src={url} />
      ))}
    </div>
  );
}

export default ImageGallery;
