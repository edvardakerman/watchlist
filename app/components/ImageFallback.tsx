"use client"

import { useState } from 'react';
import Image from 'next/image';

interface ImageProps {
    src: string;
    alt: string;
    styles?: string;
    fallback: string;
}

export default function ImageFallback(image: ImageProps) {
    const [hasError, setHasError] = useState(false);

    return (
        <Image
            className={image.styles}
            src={hasError ? image.fallback : image.src}
            onError={() => !hasError && setHasError(true)}
            alt={image.alt}
            width={300} 
            height={300}
        />
    );
};