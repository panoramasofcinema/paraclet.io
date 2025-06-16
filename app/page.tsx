'use client';

import { useState, useEffect } from 'react'
import styles from './page.module.css'


export default function Home() {
  const titles = ['aPraclet', 'Paraclet', 'Praalcet', 'Paraclet', 'aaetPrcl', 'Paraclet']
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(idx => (idx + 1) % titles.length);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [titles.length]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageTitle}>
        {titles[currentIndex]}
      </div>

      <button className={styles.requestDemoButton}>
        Request a demo
      </button>

      <div className={styles.pitch}>
        We develop AI-native solutions for architecture professionals.
      </div>

      <div className={styles.collaborators}>
        Our collaborators include<br/>
        Pool Architekten<br/>
        Jan De Vylder - A Studio<br/>
        Studio Meteora<br/>
        Studio 0More
      </div>

      <div className={styles.office}>
        Office<br/>
        Paraclet<br/>
        Geroldstrasse 31<br/>
        8005 Zurich<br/>
        Switzerland
      </div>
    </div>
  )
}
