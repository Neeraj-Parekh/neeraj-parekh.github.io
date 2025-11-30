'use client';

import Image from 'next/image';

interface PhotoGalleryProps {
  photos: string[];
  basePath?: string;
}

export default function PhotoGallery({ photos, basePath = '/assets/shots' }: PhotoGalleryProps) {
  // Portrait images (numbers like 1, 2, 3...) span more rows
  // Landscape/rectangular images (r1, r2, l1, l2...) are wider
  const isPortrait = (filename: string) => {
    // Numbers only (1.jpg, 2.jpg) are portraits
    // r/l prefix means landscape/rectangular orientation
    return /^\d+\./.test(filename);
  };

  return (
    <div className="image-gallery-grid">
      {photos.map((photo, index) => {
        const photoPath = `${basePath}/${photo}`;
        const portrait = isPortrait(photo);
        
        return (
          <div 
            key={index} 
            className={`gallery-item ${portrait ? 'portrait' : ''}`}
          >
            <Image
              src={photoPath}
              alt={`Photography ${index + 1}`}
              width={portrait ? 1080 : 1920}
              height={portrait ? 1620 : 1080}
              className="gallery-image"
              style={{ objectFit: 'cover' }}
            />
          </div>
        );
      })}
    </div>
  );
}
