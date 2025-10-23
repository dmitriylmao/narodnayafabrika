'use client'; 

import React, { useState } from 'react';
import ProductCategoryForm from '@/components/Admin/ProductCategoryForm';
import ProductCategoryTable from '@/components/Admin/ProductCategoryTable';

export default function AdminProductCategoriesPage() {
    const [categoryToEdit, setCategoryToEdit] = useState(null);
    const [tableRefreshKey, setTableRefreshKey] = useState(0);

    const handleEditCategory = (category) => {
        setCategoryToEdit(category);
    };

    const handleCategorySaved = () => {
        setCategoryToEdit(null); 
        setTableRefreshKey(prevKey => prevKey + 1); 
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', minHeight: '80vh' }}>
            <h2 style={{ 
                color: 'var(--color-primary)', 
                borderBottom: '1px solid #eee', 
                paddingBottom: '10px',
                fontWeight: '700'
            }}>
                Управление Категориями Продукции
            </h2>
            
            <ProductCategoryForm 
                initialCategory={categoryToEdit} 
                onCategorySaved={handleCategorySaved}
            />
            
            {categoryToEdit && (
                <button 
                    onClick={() => setCategoryToEdit(null)}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#ffc107',
                        color: '#333',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        marginTop: '20px',
                        fontWeight: '600'
                    }}
                >
                    + Добавить новую категорию
                </button>
            )}

            <ProductCategoryTable 
                key={tableRefreshKey}
                onEdit={handleEditCategory}
            />
        </div>
    );
}
