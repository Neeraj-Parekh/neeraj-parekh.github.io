'use client';

import { useState, useCallback } from 'react';
import certifications from '@/data/certifications.json';

interface Certification {
  id: string;
  column: string;
  title: string;
  backgroundImage: string;
  color: string;
  height: string;
  wide?: boolean;
  certificate?: string;
  certificateImage?: string;
  hasCertificate: boolean;
}

export default function CertificationGrid() {
  const [activeCertId, setActiveCertId] = useState<string | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [lastClickId, setLastClickId] = useState<string | null>(null);

  // Group certifications by column
  const certByColumn = (certifications as Certification[]).reduce((acc, cert) => {
    if (!acc[cert.column]) acc[cert.column] = [];
    acc[cert.column].push(cert);
    return acc;
  }, {} as Record<string, Certification[]>);

  const handleCardClick = useCallback((cert: Certification) => {
    const now = Date.now();
    const isDoubleClick = lastClickId === cert.id && (now - lastClickTime) < 400;
    
    if (isDoubleClick && cert.hasCertificate) {
      setActiveCertId(cert.id);
      setShowCertificate(true);
    } else {
      setLastClickTime(now);
      setLastClickId(cert.id);
    }
  }, [lastClickTime, lastClickId]);

  const closeCertificate = () => {
    setShowCertificate(false);
    setActiveCertId(null);
  };

  const activeCert = (certifications as Certification[]).find((c) => c.id === activeCertId);

  const renderCard = (cert: Certification) => (
    <div
      key={cert.id}
      className={`cert-card ${cert.wide ? 'cert-card-wide' : ''} ${cert.hasCertificate ? 'has-certificate' : ''}`}
      style={{
        backgroundImage: `url(${cert.backgroundImage})`,
        height: cert.height,
        backgroundSize: cert.title === 'Android' ? 'contain' : 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      onClick={() => handleCardClick(cert)}
    >
      {cert.hasCertificate && (
        <div className="certificate-indicator">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
          </svg>
        </div>
      )}
      <span style={{ color: cert.color, fontSize: cert.wide ? '1.5rem' : undefined }}>{cert.title}</span>
    </div>
  );

  return (
    <>
      <div className="certifications-grid">
        {/* Row 1 - A1, A2, A3 */}
        <div className="cert-row">
          {/* Column A1 */}
          <div className="cert-column">
            {certByColumn['A1']?.map(renderCard)}
          </div>

          {/* Column A2 */}
          <div className="cert-column">
            {certByColumn['A2']?.map(renderCard)}
          </div>

          {/* Column A3 - MATLAB */}
          <div className="cert-column cert-column-wide">
            {certByColumn['A3']?.map(renderCard)}
          </div>
        </div>

        {/* Row 2 - A4, A5, A6 */}
        <div className="cert-row">
          {/* Column A4 - KICAD, CSS */}
          <div className="cert-column">
            {certByColumn['A4']?.map(renderCard)}
          </div>

          {/* Column A5 - VS Code, Jupyter, etc */}
          <div className="cert-column cert-column-wide">
            {certByColumn['A5']?.map(renderCard)}
          </div>

          {/* Column A6 - Office 365, PyCharm, Terminal */}
          <div className="cert-column">
            {certByColumn['A6']?.map(renderCard)}
          </div>
        </div>

        {/* Row 3 - A8 (Cloud), A9 (SolidWorks) */}
        <div className="cert-row">
          {/* Column A8 - AWS, Google Cloud */}
          <div className="cert-column">
            {certByColumn['A8']?.map(renderCard)}
          </div>

          {/* Column A9 - SolidWorks, Fusion */}
          <div className="cert-column">
            {certByColumn['A9']?.map(renderCard)}
          </div>
        </div>

        {/* Row 4 - A10 (Operating Systems) */}
        <div className="cert-row">
          {/* Column A10 - Ubuntu, Kali, Android, Fedora */}
          <div className="cert-column cert-column-os">
            <div className="os-grid">
              {certByColumn['A10']?.map(renderCard)}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && activeCert && (
        <div className="certificate-modal-overlay" onClick={closeCertificate}>
          <div className="certificate-modal" onClick={(e) => e.stopPropagation()}>
            <button className="certificate-close" onClick={closeCertificate}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <h3 className="certificate-title">{activeCert.title} Certificate</h3>
            {activeCert.certificateImage ? (
              <img 
                src={activeCert.certificateImage} 
                alt={`${activeCert.title} Certificate`}
                className="certificate-image"
              />
            ) : (
              <div className="certificate-placeholder">
                <p>Certificate image not available</p>
                {activeCert.certificate && (
                  <a href={activeCert.certificate} target="_blank" rel="noopener noreferrer" className="certificate-link">
                    Download PDF
                  </a>
                )}
              </div>
            )}
            {activeCert.certificate && (
              <a href={activeCert.certificate} target="_blank" rel="noopener noreferrer" className="certificate-download">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7,10 12,15 17,10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Certificate
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}
