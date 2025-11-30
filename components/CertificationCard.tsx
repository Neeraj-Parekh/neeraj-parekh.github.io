'use client';

import type { Certification } from '@/types';

interface CertificationCardProps {
  certification: Certification;
}

export default function CertificationCard({ certification }: CertificationCardProps) {
  return (
    <div
      className="cert-container rounded-lg overflow-hidden relative"
      style={{
        backgroundImage: certification.backgroundImage ? `url('${certification.backgroundImage}')` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '180px',
        width: '200px',
        padding: '1em',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '5px 5px 0px 2px var(--light-accent-color)',
        border: '2px solid var(--light-accent-color)',
        backgroundColor: certification.backgroundImage ? 'transparent' : 'var(--background-color)',
      }}
    >
      {certification.title && (
        <h4 className="text-sm font-bold text-white bg-black/30 p-1 rounded">
          <i title="Certifications">{certification.title}</i>
        </h4>
      )}
      <ul className="mt-auto">
        <li 
          className="font-semibold text-lg"
          style={{ color: certification.color || '#ffffff' }}
        >
          {certification.subtitle}
        </li>
      </ul>
    </div>
  );
}
