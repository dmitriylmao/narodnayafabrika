import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const CATALOG_JSON_PATH = path.join(process.cwd(), 'data', 'catalog.json');
const PRODUCTS_DIR = path.join(process.cwd(), 'data', 'products');

function getCatalogDataJson() {
    try {
        const fileContents = fs.readFileSync(CATALOG_JSON_PATH, 'utf8');
        const data = JSON.parse(fileContents);
        return data.categories || [];
    } catch (e) {
        console.error("Error reading catalog.json:", e);
        return [];
    }
}

export const slugify = (text) => {
    if (!text) return '';
    return text.toLowerCase().trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s-]+/g, '-')
        .replace(/^-+|-+$/g, '');
};

export function getAllCategories() {
    const categories = getCatalogDataJson();
    return categories.map(cat => ({
        slug: cat.slug,
        name: cat.name,
        image: cat.image,
        description: cat.description,
        productCount: cat.products ? cat.products.length : 0
    }));
}

export function getProductsByCategorySlug(slug) {
    const categories = getCatalogDataJson();
    const category = categories.find(cat => cat.slug === slug);

    if (!category) return null;

    return {
        slug: category.slug,
        name: category.name,
        description: category.description,
        products: category.products || []
    };
}

export async function getProductData(categorySlug, productSlug) {
    const productsData = getProductsByCategorySlug(categorySlug);
    if (!productsData) return null;

    const productBase = productsData.products.find(p => p.slug === productSlug);
    if (!productBase) return null;

    const fullPath = path.join(PRODUCTS_DIR, `${productSlug}.md`);

    let contentHtml = null;
    let mdData = {};

    if (fs.existsSync(fullPath)) {
        try {
            const fileContents = fs.readFileSync(fullPath, 'utf8');
            const { data, content } = matter(fileContents);

            const processedContent = await remark().use(html).process(content);
            contentHtml = processedContent.toString();
            mdData = data;
        } catch(e) {
            console.error(`Ошибка парсинга MD-файла для ${productSlug}:`, e);
        }
    }

    let allProducts = [];
    getCatalogDataJson().forEach(cat => {
        const productsWithSlug = (cat.products || []).map(p => ({
            ...p,
            categorySlug: cat.slug
        }));
        allProducts.push(...productsWithSlug);
    });

    const relatedProducts = allProducts
        .filter(p =>
            p.brand === productBase.brand &&
            p.slug !== productSlug
        )
        .slice(0, 6);

    return {
        ...productBase,
        ...mdData,
        categorySlug: categorySlug,
        contentHtml,
        relatedProducts,
    };
}

export function getAllProductsSlugs() {
    const categories = getCatalogDataJson();
    let allSlugs = [];

    categories.forEach(cat => {
        (cat.products || []).forEach(prod => {
            allSlugs.push({
                categorySlug: cat.slug,
                productSlug: prod.slug
            });
        });
    });

    return allSlugs;
}

export const getAllBrands = () => {
    const brandsMap = new Map();

    getCatalogDataJson().forEach(category => {
        category.products.forEach(product => {
            const brandName = product.brand;
            if (brandName && !brandsMap.has(brandName)) {
                brandsMap.set(brandName, {
                    name: brandName,
                    slug: slugify(brandName),
                });
            }
        });
    });

    return Array.from(brandsMap.values());
};

export const getProductsByBrandSlug = (brandSlug) => {
    const allProducts = [];
    let brandName = '';
    
    getCatalogDataJson().forEach(category => {
        category.products.forEach(product => {
            const productBrandSlug = slugify(product.brand);
            
            if (productBrandSlug === brandSlug) {
                if (!brandName) {
                    brandName = product.brand;
                }
                
                allProducts.push({
                    ...product,
                    categorySlug: category.slug, 
                });
            }
        });
    });
    
    if (!brandName) return null;

    return {
        brandName,
        products: allProducts,
    };
};
