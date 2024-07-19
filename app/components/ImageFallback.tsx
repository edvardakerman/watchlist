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
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-off_white text-xl">{title}</span>
        </div>
      )}
    </div>
  );
}
