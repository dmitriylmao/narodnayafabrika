
'use client'; 

import React from 'react';
import NewsForm from '@/components/Admin/NewsForm';

export default function AdminNewsPage() {
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', minHeight: '80vh' }}>
        <h2 style={{ 
          color: 'var(--color-primary)', 
          borderBottom: '1px solid #eee', 
          paddingBottom: '10px',
          fontWeight: '700'
        }}>
            Управление Новостями
        </h2>
        
        <NewsForm />
    </div>
  );
}