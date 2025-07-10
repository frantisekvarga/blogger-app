import React, { useState } from 'react';
import { LoadingIndicator } from '../shared/LoadingIndicator';

type ArticleImageProps = {
  src: string;
  alt: string;
  className?: string;
  uniqueKey?: string | number;
  maxWidth?: string;
  maxHeight?: string;
};

export const ArticleImage: React.FC<ArticleImageProps> = ({src, alt, className = '', uniqueKey}) => {
  const [loaded, setLoaded] = useState(false);
  const finalSrc = uniqueKey ? `${src}?v=${uniqueKey}` : src;

  return (
    <div
      className="position-relative w-100 mb-4"
      style={{ minHeight: '300px'}}>
      {!loaded && (
        <div className="position-absolute top-50 start-50 translate-middle">
          <LoadingIndicator />
        </div>
      )}

      <img key={uniqueKey} src={finalSrc} alt={alt}
        onLoad={() => setLoaded(true)}
        className={`${loaded ? '' : 'invisible'} ${className}`}
      />
    </div>
  );
};
