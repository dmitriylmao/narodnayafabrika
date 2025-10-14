
'use client'; 

import React, { useState, useEffect } from 'react'; 
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import styles from './login.module.css'; 

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const router = useRouter();
  const { admin, loading } = useAuth(); 

  useEffect(() => {
    if (!loading && admin) {
      router.push('/admin');
    }
  }, [admin, loading, router]);
  // -----------------------------


  if (loading) {
    return (
        <div className={styles.container}>
            <p className={styles.loading}>Проверка статуса...</p>
        </div>
    );
  }
  
  if (admin) {
    return (
        <div className={styles.container}>
            <p className={styles.loading}>Перенаправление...</p>
        </div>
    );
  }


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      await signInWithEmailAndPassword(auth, email, password);
      

    } catch (firebaseError) {
      console.error('Ошибка входа:', firebaseError.code);
      if (firebaseError.code === 'auth/user-not-found' || firebaseError.code === 'auth/wrong-password') {
        setError('Неверный логин или пароль.');
      } else {
        setError('Произошла ошибка при входе. Попробуйте снова.');
      }
    }
  };
  
  return (
    <div className={styles.container}>
      <form onSubmit={handleLogin} className={styles.form}>
        <h2 className={styles.title}>Вход для Администратора</h2>
        
        {error && <p className={styles.error}>{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Войти
        </button>
        
        <Link href="/" className={styles.backLink}>
            ← Вернуться на сайт
        </Link>
      </form>
    </div>
  );
}