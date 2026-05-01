/* eslint-disable react/prop-types */
function ProgressiveImage({
  src,
  alt,
  className = '',
  imageClassName = '',
  loading = 'lazy',
  decoding = 'async',
  objectClassName = 'object-cover',
  onClick,
  ...rest
}) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding={decoding}
        onClick={onClick}
        className={`h-full w-full ${objectClassName} ${imageClassName}`}
        {...rest}
      />
    </div>
  );
}

export default ProgressiveImage;
