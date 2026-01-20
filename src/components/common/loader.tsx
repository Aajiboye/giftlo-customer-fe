import React from 'react';

interface LoadingSkeletonProps {
  height?: string;
  width?: string;
  className?: string;
}

const Loader: React.FC<LoadingSkeletonProps> = ({
  height = 'h-6',
  width = 'w-full',
  className = ''
}) => {
  return (
    <div
      className={`animate-pulse bg-gray-200 ${height} ${width} rounded ${className}`}
    ></div>
  );
};

export default Loader;
