'use client';

import { useState, useEffect } from 'react';

interface RotatingTextProps {
  texts: string[];
  interval?: number;
}

export default function RotatingText({ texts, interval = 2500 }: RotatingTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const rotateTimer = setInterval(() => {
      // Start exit animation
      setVisible(false);
      
      // After exit animation, change text and start enter animation
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setVisible(true);
      }, 400);
    }, interval);

    return () => clearInterval(rotateTimer);
  }, [texts.length, interval]);

  return (
    <div className="job-title">
      <div className="cd-headline">
        <span className="im-text">I&apos;m </span>
        <span className="cd-words-wrapper">
          <span 
            className={`rotating-word ${visible ? 'word-visible' : 'word-hidden'}`}
            key={currentIndex}
          >
            {texts[currentIndex]}
          </span>
        </span>
      </div>
    </div>
  );
}
