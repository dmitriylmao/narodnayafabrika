// src/components/Catalog/BrandProducts.js
'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import styles from './BrandProducts.module.css';

export default function BrandProductsSlider({ brandName, relatedProducts }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const products = relatedProducts || [];
  if (!products || products.length === 0) return null;

  const CARD_WIDTH = 330;
  const CARD_GAP = 24;
  const VISIBLE_COUNT = isMobile ? 1 : 4;
  const STEP = 1;

  const maxIndex = Math.max(products.length - VISIBLE_COUNT, 0);

  const handlePrev = () =>
    setCurrentIndex((prev) => Math.max(prev - STEP, 0));

  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(prev + STEP, maxIndex));

  const isPrevDisabled = currentIndex === 0;
  const isNextDisabled = currentIndex === maxIndex;

  const transformValue = isMobile
    ? 0
    : -(currentIndex * (CARD_WIDTH + CARD_GAP));

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>Похожие товары бренда {brandName}</h3>

      <div className={styles.sliderWrapper}>
        {!isMobile && (
          <button
            className={`${styles.arrow} ${styles.left}`}
            onClick={handlePrev}
            disabled={isPrevDisabled}
            aria-label="Предыдущий товар"
          >
            &lsaquo;
          </button>
        )}

        <div className={styles.sliderClip}>
          <div
            className={styles.slider}
            style={{ transform: `translateX(${transformValue}px)` }}
          >
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                product={product}
                categorySlug={product.categorySlug}
              />
            ))}
          </div>
        </div>

        {!isMobile && (
          <button
            className={`${styles.arrow} ${styles.right}`}
            onClick={handleNext}
            disabled={isNextDisabled}
            aria-label="Следующий товар"
          >
            &rsaquo;
          </button>
        )}
      </div>
    </div>
  );
}
