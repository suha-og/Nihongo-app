"use client";

import { useState, useRef, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import styles from './practice.module.css';

const hiraganaDict = {
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
  ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
  sa: 'さ', shi: 'し', su: 'す', se: 'せ', so: 'そ',
  ta: 'た', chi: 'ち', tsu: 'つ', te: 'て', to: 'と',
  na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
  ha: 'は', hi: 'ひ', fu: 'ふ', he: 'へ', ho: 'ほ',
  ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
  ya: 'や', yu: 'ゆ', yo: 'よ',
  ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
  wa: 'わ', o_wo: 'を', n: 'ん'
};

export default function PracticePage() {
  const params = useParams();
  const romaji = params.romaji;
  const kana = hiraganaDict[romaji] || '?';

  // Magic line: Converts 'あ' into '03042' so we can fetch the exact stroke order SVG
  const unicodeHex = kana !== '?' ? kana.charCodeAt(0).toString(16).padStart(5, '0') : '';
  // We are swapping to the raw GitHub user content link
  const strokeOrderImgUrl = `https://raw.githubusercontent.com/KanjiVG/kanjivg/master/kanji/${unicodeHex}.svg`;
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#4A3B32'; 
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link href="/dashboard" className={styles.backButton}>
          ← Back
        </Link>
        <h1 className={styles.title}>Practice Mode</h1>
        <div style={{ width: '80px' }}></div>
      </div>

      <div className={styles.workspace}>
        {/* Left Side: Reference Character with Stroke Order */}
        <div className={styles.referenceCard}>
          <div className={styles.refKanaWrapper}>
            {/* The dynamically fetched stroke order SVG */}
            <img 
              src={strokeOrderImgUrl} 
              alt={`Stroke order for ${kana}`}
              className={styles.refKanaImg}
            />
            {/* Hidden by default, only shows if the image fails to load */}
            <span className={styles.refKanaText} style={{ display: 'none' }}>{kana}</span>
          </div>
          
          <span className={styles.refRomaji}>{romaji}</span>
          <p style={{ marginTop: '2rem', color: '#a0aec0', fontSize: '0.9rem' }}>
            Follow the stroke numbers!
          </p>
        </div>

        {/* Right Side: Drawing Canvas */}
        <div className={styles.canvasSection}>
          <canvas
            ref={canvasRef}
            width={350}
            height={350}
            className={styles.canvas}
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDrawing}
            onPointerOut={stopDrawing}
          />
          
          <div className={styles.controls}>
            <button onClick={clearCanvas} className={styles.clearBtn}>
              Clear
            </button>
            <button className={styles.submitBtn}>
              Check Progress
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}