"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './signup.module.css';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const router = useRouter(); // Initializes the router

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage({ text: 'Creating account...', type: 'normal' });

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatusMessage({ text: 'Account created! Redirecting...', type: 'success' });
        // Redirects the user directly to the Japanese dashboard upon success
        router.push('/dashboard');
      } else {
        setStatusMessage({ text: data.message, type: 'error' });
      }
    } catch (error) {
      setStatusMessage({ text: 'Something went wrong. Try again.', type: 'error' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formCard}>
        <h1 className={styles.title}>SIGN UP</h1>
        
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label className={styles.label}>Email</label>
            <input 
              type="email" 
              required 
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Password</label>
            <input 
              type="password" 
              required 
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className={styles.button}>Register</button>
        </form>

        {statusMessage.text && (
          <p className={`${styles.message} ${statusMessage.type === 'success' ? styles.success : ''}`}>
            {statusMessage.text}
          </p>
        )}

        {/* The new link back to the Login page */}
        <p style={{ marginTop: '1.5rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
          Already have an account?{' '}
          <Link href="/login" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 'bold' }}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}