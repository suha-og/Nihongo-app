import Link from 'next/link';
import styles from './page.module.css';

export default function LandingPage() {
  return (
    <div className={styles.landingContainer}>
      {/* Navbar Section */}
      <nav className={styles.navbar}>
        <div className={styles.logo}>
          <span>🌸</span> Nihongo App
        </div>
        
        <div className={styles.navLinks}>
          <span className={styles.navItem}>Features</span>
          <span className={styles.navItem}>About</span>
          <span className={styles.navItem}>Contact</span>
        </div>

        <div>
          <Link href="/signup" className={styles.primaryButton}>
            Start Your Journey →
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <main className={styles.hero}>
        <h1 className={styles.title}>Where Calm Meets<br/>Learning.</h1>
        <p className={styles.subtitle}>
          In the rush of life, imagine a space that feels like a deep breath. 
          Here, you can master Japanese characters at your own pace in a private digital sanctuary.
        </p>
        
        <Link href="/signup" className={styles.primaryButton}>
          Start Your Journey →
        </Link>
      </main>
    </div>
  );
}