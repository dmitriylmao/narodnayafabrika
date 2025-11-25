// src/app/catalog/[categorySlug]/[productSlug]/page.js

import { notFound } from 'next/navigation';
import BrandProducts from '@/components/Catalog/BrandProducts';
import Breadcrumbs from '@/components/Catalog/Breadcrumbs';
import styles from './page.module.css';
import { 
    getAllProductsSlugs, 
    getProductData, 
    getProductsByCategorySlug 
} from '@/utils/catalog'; 

export async function generateStaticParams() {
    const slugs = getAllProductsSlugs(); 
    
    return slugs.map((item) => ({
        categorySlug: item.categorySlug,
        productSlug: item.productSlug,
    }));
}

export async function generateMetadata({ params }) {
    const { categorySlug, productSlug } = await params; 

    const product = await getProductData(categorySlug, productSlug);

    if (!product) {
        return { title: 'Товар не найден' };
    }

    return {
        title: `${product.title} - ${product.brand}`, 
        description: product.contentHtml ? product.contentHtml.substring(0, 150) : `Подробное описание товара ${product.title}.`,
    };
}


export default async function ProductPage({ params }) {
    const { categorySlug, productSlug } = await params;

    const product = await getProductData(categorySlug, productSlug);

    if (!product) {
        notFound();
    }
    
    const categoryData = getProductsByCategorySlug(categorySlug);
    const categoryName = categoryData ? categoryData.name : categorySlug; 
    
    const brandName = product.brand;
    const baseProductName = product.title;
    const packSize = product.volume;
    const imageUrl = product.image;
    const descriptionHtml = product.contentHtml;
    const relatedProducts = product.relatedProducts;

    const whatsappNumber = '79991234567';
    const whatsappLink = `https://wa.me/${whatsappNumber}`;

    return (
        <main className={styles.mainWrapper}>
            <div className={styles.pageContainer}>

                <Breadcrumbs 
                    categoryName={categoryName} 
                    categorySlug={categorySlug} 
                    productName={baseProductName} 
                    productSlug={productSlug} 
                />

                <div className={styles.productContainer}>

                    <div className={styles.imageContainer}>
                        <img
                            src={imageUrl || 'https://placehold.co/400x400/f3f4f6/a3a3a3?text=Нет+Фото'}
                            alt={baseProductName}
                            className={styles.productImage}
                        />
                    </div>

                    <div className={styles.infoContainer}>
                        <h2 className={styles.brand}>{brandName}</h2>
                        <h1 className={styles.title}>
                            {baseProductName} 
                        </h1>

                        {descriptionHtml && (
                                <div className={styles.descriptionContainer}>
                                    <h3>Описание:</h3>
                                    <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
                                </div>
                        )}

                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className={styles.whatsappButton}>
                            Связаться
                        </a>
                    </div>
                </div>

                

                <BrandProducts 
                    brandName={brandName} 
                    relatedProducts={relatedProducts} 
                />

            </div>
        </main>
    );
}