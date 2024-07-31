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
        width={480}
        height={270}
        priority
      />
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-opacity-0">
          <span className="text-off_white text-4xl p-2">{title}</span>
        </div>
      )}
    </div>
  );
}
