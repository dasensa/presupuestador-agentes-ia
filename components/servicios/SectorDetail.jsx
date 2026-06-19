import { useState } from 'react';
import Image from 'next/image';
import Button from '../ui/Button';
import UseCaseList from './UseCaseList';
import SectorIcon from '../icons/SectorIcon';

const FALLBACK_IMAGE =
  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1080" height="420" viewBox="0 0 1080 420"%3E%3Crect width="1080" height="420" fill="%230e1a2b"/%3E%3Cpath d="M0 290c190-80 360 30 550-40s310-170 530-110v280H0Z" fill="%2314273d"/%3E%3C/svg%3E';
const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAzMiAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMTgiIGZpbGw9IiMwZTFhMmIiLz48cmVjdCB4PSIxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE4IiBmaWxsPSIjMTQyNzNkIi8+PC9zdmc+';

export default function SectorDetail({ name, meta, casos }) {
  const [imageSrc, setImageSrc] = useState(meta.image || FALLBACK_IMAGE);
  const anchor = name.toLowerCase().replace('/', '-');
  const minPrice = Math.min(...casos.map(c => c.ini));

  return (
    <section id={anchor} className="py-12 scroll-mt-32">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left panel */}
        <div className="ds-card p-6 lg:p-8">
          <SectorIcon sector={name} color={meta.color} size={28} className="mb-4" />
          <h2 className="font-serif italic text-display-sm text-base-text mb-3">{name}</h2>
          <p className="text-body-sm text-base-muted leading-relaxed mb-6">{meta.longDescription}</p>

          <div className="relative h-[140px] w-full overflow-hidden mb-6 border border-border">
            <Image
              src={imageSrc}
              alt=""
              fill
              loading="lazy"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              onError={() => setImageSrc(FALLBACK_IMAGE)}
              sizes="(min-width: 1024px) 33vw, 100vw"
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute inset-0 bg-base-bg/30" />
          </div>

          <div className="space-y-3 mb-6 pt-4 border-t border-border">
            <div className="flex justify-between text-body-sm">
              <span className="text-base-subtle">Casos de uso</span>
              <span className="font-serif italic text-brand-blue-soft">{casos.length}</span>
            </div>
            <div className="flex justify-between text-body-sm">
              <span className="text-base-subtle">Desde</span>
              <span className="font-serif italic text-brand-blue-soft">&euro;{minPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-body-sm">
              <span className="text-base-subtle">Tipos</span>
              <span className="text-base-muted">{[...new Set(casos.map(c => c.t))].join(', ')}</span>
            </div>
          </div>

          <Button
            href={`/presupuestador?sector=${encodeURIComponent(name)}`}
            variant="primary"
            size="sm"
            className="w-full"
          >
            Presupuestar sector
          </Button>
        </div>

        {/* Right grid */}
        <div className="lg:col-span-2">
          <UseCaseList casos={casos} />
        </div>
      </div>
    </section>
  );
}
