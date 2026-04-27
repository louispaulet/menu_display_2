/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

function ProgressiveImage({
  src,
  alt,
  className = '',
  imageClassName = '',
  loading = 'lazy',
  decoding = 'async',
  placeholderClassName = 'bg-stone-100',
  objectClassName = 'object-cover',
  onClick,
  ...rest
}) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [src]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div
        aria-hidden="true"
        className={`absolute inset-0 animate-pulse ${placeholderClassName} transition-opacity duration-500 ${isLoaded ? 'opacity-0' : 'opacity-100'}`}
      />
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(true)}
        onClick={onClick}
        className={`relative z-10 h-full w-full transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${objectClassName} ${imageClassName}`}
        {...rest}
      />
    </div>
  );
}

export default ProgressiveImage;
