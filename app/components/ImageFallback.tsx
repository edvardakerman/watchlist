"use client";

import { useState } from 'react';
import Image from 'next/image';

interface ImageProps {
  src: string;
  styles?: string;
  fallback: string;
  title: string;
}

export default function ImageFallback({ src, styles, fallback, title }: ImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative">
      <Image
        className={styles}
        src={hasError ? fallback : src}
        onError={() => !hasError && setHasError(true)}
        alt={title}
        width={300}
        height={300}
        priority
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-0">
          <span className="text-off_white text-center text-base p-2">
            {title.length > 60 ? `${title.slice(0, 60)}` : title}
          </span>
        </div>
      )}
    </div>
  );
}
