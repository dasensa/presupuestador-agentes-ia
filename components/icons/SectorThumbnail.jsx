import { useState } from 'react';
import Image from 'next/image';

const FALLBACK_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="320" height="220" viewBox="0 0 320 220"%3E%3Crect width="320" height="220" fill="%230e1a2b"/%3E%3Cpath d="M0 150c58-24 108 9 166-12 58-22 96-56 154-38v120H0Z" fill="%2314273d"/%3E%3C/svg%3E';
const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMjIiIHZpZXdCb3g9IjAgMCAzMiAyMiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMjIiIGZpbGw9IiMwZTFhMmIiLz48cmVjdCB4PSIxNCIgd2lkdGg9IjE4IiBoZWlnaHQ9IjIyIiBmaWxsPSIjMTQyNzNkIi8+PC9zdmc+';

export default function SectorThumbnail({
  src,
  alt = '',
  className = '',
  sizes = '48px',
}) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE);

  return (
    <span className={`relative block overflow-hidden border border-border ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        fill
        loading="lazy"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        onError={() => setImageSrc(FALLBACK_IMAGE)}
        sizes={sizes}
        style={{ objectFit: 'cover' }}
      />
      <span className="absolute inset-0 bg-base-bg/25" />
    </span>
  );
}
