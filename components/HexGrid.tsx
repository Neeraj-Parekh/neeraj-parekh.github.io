'use client';

import Image from 'next/image';

interface HexGridProps {
  photos: string[];
  basePath?: string;
}

export default function HexGrid({ photos, basePath = '/assets' }: HexGridProps) {
  return (
    <div id="hexGrid">
      {photos.map((photo, index) => {
        const photoPath = photo.startsWith('http') ? photo : `${basePath}/${photo}`;
        const fileName = photo.split('/').pop() || `Photo ${index + 1}`;
        
        return (
          <a
            key={index}
            href={photoPath}
            target="_blank"
            rel="noopener noreferrer"
            className="hex-grid-link"
            style={{ '--i': index } as React.CSSProperties}
          >
            <Image
              src={photoPath}
              alt={fileName}
              width={200}
              height={230}
              className="w-full"
              style={{ aspectRatio: '1.732 / 2', objectFit: 'cover' }}
            />
          </a>
        );
      })}
    </div>
  );
}
