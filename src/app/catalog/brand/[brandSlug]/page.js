// src/app/catalog/brand/[brandSlug]/page.js

import { notFound } from 'next/navigation';
import Breadcrumbs from '@/components/Catalog/Breadcrumbs';
import ProductCard from '@/components/Catalog/ProductCard';
import CategorySidebar from '@/components/Catalog/CategorySidebar';
import { getAllCategories, getAllBrands, getProductsByBrandSlug } from '@/utils/catalog';
import styles from '../../[categorySlug]/page.module.css';

export async function generateStaticParams() {
  const brands = getAllBrands();

  return brands.map((brand) => ({
    brandSlug: brand.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { brandSlug } = await params;
  const brandData = getProductsByBrandSlug(brandSlug);

  if (!brandData) {
    return { title: 'Бренд не найден' };
  }

  return {
    title: `${brandData.brandName} - Продукция`,
    description: `Вся продукция бренда ${brandData.brandName} в нашем каталоге.`,
  };
}


export default async function BrandPage({ params }) {
  const { brandSlug } = await params;

  const brandData = getProductsByBrandSlug(brandSlug);

  if (!brandData) {
    notFound();
  }

  const { brandName, products } = brandData;
  const allCategories = getAllCategories();
  const allBrands = getAllBrands();
  
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.pageContainer}>
        <Breadcrumbs
          brandName={brandName}
          brandSlug={brandSlug}
        />

        <div className={styles.mainContentWrapper}>
          <CategorySidebar
            categories={allCategories}
            allBrands={allBrands}
            activeBrandSlug={brandSlug}
          />

          <main className={styles.contentArea}>
            <header className={styles.header}>
              <h1 className={styles.heading}>Продукция бренда {brandName}</h1>
            </header>

            {products.length === 0 ? (
              <p className={styles.emptyText}>У этого бренда пока нет товаров.</p>
            ) : (
              <div className={styles.gridContainer}>
                {products.map(product => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    categorySlug={product.categorySlug}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </main>
  );
}