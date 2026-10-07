import { Img } from './Img';
import { Zoom } from './Icons';
import { aspectFor } from '@/lib/dimensions';

/**
 * A lightbox-enabled figure. Picked up by <Lightbox /> via the data-lb attribute.
 * `ratio` overrides the aspect; otherwise the real image ratio is used when known,
 * falling back to a deterministic cycle so nothing shifts on load.
 */
export function Figure({
  src,
  alt,
  cat,
  index = 0,
  ratio,
  className,
  sizes,
}: {
  src: string;
  alt: string;
  cat?: string;
  index?: number;
  ratio?: number | 'auto';
  className?: string;
  sizes?: string;
}) {
  const aspect = ratio === 'auto' ? aspectFor(src, index) : (ratio ?? aspectFor(src, index));
  return (
    <figure
      data-lb
      data-src={src}
      data-cat={cat}
      className={className}
      style={{ aspectRatio: String(aspect) }}
    >
      <Img src={src} alt={alt} sizes={sizes} />
      <span className="zoom">
        <Zoom />
      </span>
    </figure>
  );
}
