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
  const columns = certifications.reduce((acc: Record<string, Certification[]>, cert: Certification) => {
    if (!acc[cert.column]) {
      acc[cert.column] = [];
    }
    acc[cert.column].push(cert);
    return acc;
  }, {});

  const handleCardClick = useCallback((cert: Certification) => {
    const now = Date.now();
    const isDoubleClick = lastClickId === cert.id && (now - lastClickTime) < 400;
    
    if (isDoubleClick && cert.hasCertificate) {
      // Double click - show certificate
      setActiveCertId(cert.id);
      setShowCertificate(true);
    } else {
      // Single click - just update tracking
      setLastClickTime(now);
      setLastClickId(cert.id);
    }
  }, [lastClickTime, lastClickId]);

  const closeCertificate = () => {
    setShowCertificate(false);
    setActiveCertId(null);
  };

  const activeCert = certifications.find((c: Certification) => c.id === activeCertId);

  // Determine if a card should be collapsed to pill
  const shouldBePill = (certId: string) => {
    if (!showCertificate || !activeCertId) return false;
    return certId !== activeCertId;
  };

  return (
    <>
      <div className={`certifications-grid ${showCertificate ? 'certificate-active' : ''}`}>
        {Object.entries(columns).map(([columnName, columnCerts]) => (
          <div key={columnName} className="cert-column">
            {(columnCerts as Certification[]).map((cert: Certification) => (
              <div
                key={cert.id}
                className={`cert-card-wrapper ${shouldBePill(cert.id) ? 'pill-mode' : ''} ${cert.id === activeCertId ? 'active-cert' : ''}`}
              >
                {shouldBePill(cert.id) ? (
                  // Pill View
                  <div 
                    className="cert-pill"
                    style={{ 
                      background: `linear-gradient(135deg, ${cert.color}dd, ${cert.color}99)`,
                    }}
                    onClick={() => {
                      setShowCertificate(false);
                      setActiveCertId(null);
                    }}
                  >
                    <span className="cert-pill-text">{cert.title}</span>
                  </div>
                ) : (
                  // Normal Card View
                  <div
                    className={`cert-card ${cert.wide ? 'cert-card-wide' : ''} ${cert.hasCertificate ? 'has-certificate' : ''}`}
                    style={{
                      backgroundImage: `url(${cert.backgroundImage})`,
                      backgroundColor: cert.color,
                      minHeight: cert.height,
                    }}
                    onClick={() => handleCardClick(cert)}
                  >
                    {cert.hasCertificate && (
                      <div className="certificate-indicator">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                        </svg>
                      </div>
                    )}
                    <span style={{ color: cert.color === '#ffffff' || cert.color === '#000000' ? (cert.color === '#ffffff' ? '#000' : '#fff') : '#fff' }}>
                      {cert.title}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
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
