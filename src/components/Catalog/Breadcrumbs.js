'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

export default function Breadcrumbs({
  categoryName,
  productName,
  categorySlug,
  productSlug,
  brandName,
  brandSlug
}) {
  const breadcrumbs = [
    { name: 'Каталог', href: '/catalog' }
  ];

  if (brandName && brandSlug) {
    breadcrumbs.push({ name: brandName, href: `/catalog/brand/${brandSlug}` });
  } else if (categoryName && categorySlug) {
    breadcrumbs.push({ name: categoryName, href: `/catalog/${categorySlug}` });
  }

  if (productName) {
    breadcrumbs.push({ name: productName });
  }

  return (
    <nav className={styles.breadcrumbs}>
      {breadcrumbs.map((crumb, idx) => (
        <span key={idx}>
          {crumb.href ? (
            <Link href={crumb.href} className={styles.link}>{crumb.name}</Link>
          ) : (
            <span className={styles.current}>{crumb.name}</span>
          )}
          {idx < breadcrumbs.length - 1 && <span className={styles.separator}> — </span>}
        </span>
      ))}
    </nav>
  );
}
