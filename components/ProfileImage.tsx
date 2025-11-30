'use client';

import Image from 'next/image';

interface ProfileImageProps {
  src: string;
  alt: string;
}

export default function ProfileImage({ src, alt }: ProfileImageProps) {
  return (
    <div className="avatar parallax" data-relative-input="true">
      <span className="one">
        <span className="in layer" data-depth="0.14"></span>
      </span>
      <span className="two">
        <span className="in layer" data-depth="0.18"></span>
      </span>
      <span className="three">
        <span className="in layer" data-depth="0.22"></span>
      </span>
      <span className="four">
        <span
          className="in layer"
          data-depth="0.26"
          style={{
            backgroundImage: `url('${src}')`,
            backgroundSize: 'contain',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            marginRight: '158px',
            paddingLeft: '0px',
            marginLeft: '-29px',
            paddingTop: '132px',
            paddingBottom: '0px',
            minWidth: '15px',
            width: '413px',
            height: '443px',
          }}
        ></span>
      </span>
      <span className="five">
        <span className="in layer" data-depth="0.3"></span>
      </span>
      <h3 className="stroke_text">
        <span></span>
      </h3>
    </div>
  );
}
