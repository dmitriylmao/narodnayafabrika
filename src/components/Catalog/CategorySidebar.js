'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CategorySidebar.module.css';

export default function CategorySidebar({ categories, allBrands, activeCategorySlug, activeBrandSlug }) {
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);

  if (!categories || categories.length === 0) {
    return null;
  }

  const toggleBrands = () => {
    setIsBrandsOpen(!isBrandsOpen);
  };

  return (
    <aside className={styles.sidebar}>
      <ul className={styles.list}>
        {categories.map(category => {
          const key = category.slug;
          const isActive = category.slug === activeCategorySlug;
          const linkClassName = `${styles.link} ${isActive ? styles.active : ''}`;

          return (
            <li key={key}>
              <Link href={`/catalog/${category.slug}`} className={linkClassName}>
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={30}
                    height={30}
                    className={styles.icon}
                  />
                ) : (
                  <div className={styles.iconPlaceholder}></div>
                )}
                <span>{category.name}</span>
              </Link>
            </li>
          );
        })}

        {allBrands && allBrands.length > 0 && (
          <li className={styles.brandsWrapper}>
            <div
              className={`${styles.link} ${styles.brandsToggle} ${isBrandsOpen ? styles.brandsActive : ''}`}
              onClick={toggleBrands}
            >
              <span>Бренды</span>
              <span className={`${styles.arrow} ${isBrandsOpen ? styles.open : ''}`}>&#9660;</span>
            </div>

            <ul className={`${styles.brandsList} ${isBrandsOpen ? styles.openBrands : ''}`}>
              {allBrands.map(brand => {
                const isBrandActive = brand.slug === activeBrandSlug;
                const brandLinkClassName = `${styles.brandLink} ${isBrandActive ? styles.activeBrand : ''}`;

                return (
                  <li key={brand.slug}>
                    <Link href={`/catalog/brand/${brand.slug}`} className={brandLinkClassName}>
                      {brand.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
        )}
      </ul>
    </aside>
  );
}
