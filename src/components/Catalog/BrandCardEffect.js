'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import styles from './BrandCardEffect.module.css';

export default function BrandCardEffect({ brandName, brandSlug }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;

    const rotateX = (y - 0.5) * 20;
    const rotateY = -(x - 0.5) * 20;

    const translateX = -(x - 0.5) * 20;
    const translateY = -(y - 0.5) * 20;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

    cardRef.current.style.setProperty('--tx', `${translateX}px`);
    cardRef.current.style.setProperty('--ty', `${translateY}px`);
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
    cardRef.current.style.setProperty('--tx', '0px');
    cardRef.current.style.setProperty('--ty', '0px');
  };

  return (
    <Link
      href={`/catalog/brand/${brandSlug}`}
      className={styles.cardWrapper}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={cardRef}
    >
      <div className={styles.brandName}>{brandName}</div>
      <div className={styles.arrowIcon}>→</div>
    </Link>
  );
}
