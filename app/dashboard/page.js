"use client";

import Link from 'next/link';
import styles from './dashboard.module.css';

export default function Dashboard() {
  // The complete standard Hiragana set, including placeholders for empty grid spots
  const hiraganaSet = [
    { romaji: 'a', kana: 'あ' }, { romaji: 'i', kana: 'い' }, { romaji: 'u', kana: 'う' }, { romaji: 'e', kana: 'え' }, { romaji: 'o', kana: 'お' },
    { romaji: 'ka', kana: 'か' }, { romaji: 'ki', kana: 'き' }, { romaji: 'ku', kana: 'く' }, { romaji: 'ke', kana: 'け' }, { romaji: 'ko', kana: 'こ' },
    { romaji: 'sa', kana: 'さ' }, { romaji: 'shi', kana: 'し' }, { romaji: 'su', kana: 'す' }, { romaji: 'se', kana: 'せ' }, { romaji: 'so', kana: 'そ' },
    { romaji: 'ta', kana: 'た' }, { romaji: 'chi', kana: 'ち' }, { romaji: 'tsu', kana: 'つ' }, { romaji: 'te', kana: 'て' }, { romaji: 'to', kana: 'と' },
    { romaji: 'na', kana: 'な' }, { romaji: 'ni', kana: 'に' }, { romaji: 'nu', kana: 'ぬ' }, { romaji: 'ne', kana: 'ね' }, { romaji: 'no', kana: 'の' },
    { romaji: 'ha', kana: 'は' }, { romaji: 'hi', kana: 'ひ' }, { romaji: 'fu', kana: 'ふ' }, { romaji: 'he', kana: 'へ' }, { romaji: 'ho', kana: 'ほ' },
    { romaji: 'ma', kana: 'ま' }, { romaji: 'mi', kana: 'み' }, { romaji: 'mu', kana: 'む' }, { romaji: 'me', kana: 'め' }, { romaji: 'mo', kana: 'も' },
    
    // Ya row (has empty spots to keep the 5-column grid perfect)
    { romaji: 'ya', kana: 'や' }, { empty: true, id: 'e1' }, { romaji: 'yu', kana: 'ゆ' }, { empty: true, id: 'e2' }, { romaji: 'yo', kana: 'よ' },
    
    // Ra row
    { romaji: 'ra', kana: 'ら' }, { romaji: 'ri', kana: 'り' }, { romaji: 'ru', kana: 'る' }, { romaji: 're', kana: 'れ' }, { romaji: 'ro', kana: 'ろ' },
    
    // Wa row (has empty spots)
    { romaji: 'wa', kana: 'わ' }, { empty: true, id: 'e3' }, { empty: true, id: 'e4' }, { empty: true, id: 'e5' }, { romaji: 'o_wo', kana: 'を' },
    
    // N row (only one character)
    { romaji: 'n', kana: 'ん' }, { empty: true, id: 'e6' }, { empty: true, id: 'e7' }, { empty: true, id: 'e8' }, { empty: true, id: 'e9' }
  ];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
          HIRAGANA <span className={styles.subtitle}>ひらがな</span>
        </h1>
        
        <div className={styles.grid}>
          {hiraganaSet.map((char) => {
            // If it's a placeholder object, render an invisible block to keep the grid aligned
            if (char.empty) {
              return <div key={char.id} className={styles.emptyCard}></div>;
            }

            // Otherwise, render the clickable character card
            return (
              <Link 
                href={`/practice/${char.romaji}`} 
                key={char.romaji} 
                style={{ textDecoration: 'none' }}
              >
                <div className={styles.card}>
                  <span className={styles.kana}>{char.kana}</span>
                  <span className={styles.romaji}>{char.romaji}</span>
                  
                  {/* The Empty Progress Bar */}
                  <div className={styles.progressBarContainer}>
                    <div className={styles.progressBarFill}></div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}