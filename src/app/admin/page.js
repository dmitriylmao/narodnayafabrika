
'use client'; 

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { getAuth, signOut } from 'firebase/auth'; 
import Link from 'next/link';
import styles from './admin.module.css'; 


function AdminRouteGuard({ children }) {
  const { admin, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !admin) {
      router.push('/admin/login');
    }
  }, [admin, loading, router]);

  if (loading || !admin) {
    return (
      <div className={styles.loadingScreen}>
        <p>Проверка доступа...</p>
      </div>
    );
  }
  return children;
}


export default function AdminDashboardPage() {
    
  const handleLogout = async () => {
    try {
      await signOut(getAuth());
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <AdminRouteGuard>
      <div className={styles.dashboardContainer}>
        
        <h1 className={styles.title}>Админ-панель</h1>
        <p className={styles.subtitle}>
          Добро пожаловать, администратор! Выберите раздел для управления контентом.
        </p>

        <div className={styles.cardGrid}>
            
          <Link href="/admin/news" className={styles.cardButton}> 
            Управление Новостями
          </Link>
          
          <Link href="/admin/vacancies" className={styles.cardButton}>
            Управление Вакансиями
          </Link>

          <Link href="/admin/products" className={styles.cardButton}>
            Управление Продукцией
          </Link>

        </div>
        
        <button 
          onClick={handleLogout} 
          className={styles.logoutButton} 
        >
          Выход из системы
        </button>
      </div>
    </AdminRouteGuard>
  );
}