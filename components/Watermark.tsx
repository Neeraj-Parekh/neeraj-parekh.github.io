'use client';

export default function Watermark() {
  return (
    <>
      <div className="watermark" style={{ top: 0, left: '-2em' }}>
        Neeraj
      </div>
      <div
        className="watermark"
        style={{ bottom: '0em', right: '-1em', fontSize: '27rem' }}
      >
        Neeraj
      </div>
    </>
  );
}
