import NextImage from 'next/image';
import { mediaUrl } from '@/lib/media';

type Props = {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  fill?: boolean;
};

/**
 * next/image over the WordPress media library (or the local copy).
 * Dimensions are unknown ahead of time, so we fill a sized parent by default.
 */
export function Img({
  src,
  alt,
  className,
  priority,
  sizes = '(max-width: 680px) 100vw, (max-width: 1024px) 50vw, 33vw',
  width,
  height,
  fill = true,
}: Props) {
  const url = mediaUrl(src);
  if (width && height) {
    return (
      <NextImage
        src={url}
        alt={alt}
        width={width}
        height={height}
        className={className}
        priority={priority}
        sizes={sizes}
      />
    );
  }
  return (
    <NextImage
      src={url}
      alt={alt}
      fill={fill}
      className={className}
      priority={priority}
      sizes={sizes}
      style={{ objectFit: 'cover' }}
    />
  );
}
