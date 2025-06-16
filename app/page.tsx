'use client';

import { useEffect, useRef } from 'react';
import ScrambleText from 'scramble-text';
import styles from './page.module.css';


export default function Home() {
  const titleRef = useRef(null);
  const pitchRef = useRef(null);
  const collabRef = useRef(null);
  const officeRef = useRef(null);


  useEffect(() => {
    const instances: ScrambleText[] = [];

    if (titleRef.current) {
      const titleScramble = new ScrambleText(titleRef.current,
        {
          timeOffset: 100,
          chars: [
            'P','a','r','c','l','e','t'
          ]
        }
      )
        .start()
        .play();
      instances.push(titleScramble);
    }

    if (pitchRef.current) {
      const pitchScramble = new ScrambleText(pitchRef.current,
        {
          timeOffset: 10,
          chars: [
            'P','a','r','c','l','e','t'
          ]
        }
      )
        .start()
        .play();
      instances.push(pitchScramble);
    }

    if (collabRef.current) {
      const collabScramble = new ScrambleText(collabRef.current,
        {
          timeOffset: 8,
          chars: [
            'P','a','r','c','l','e','t'
          ]
        }
      )
        .start()
        .play();
      instances.push(collabScramble);
    }

    if (officeRef.current) {
      const officeScramble = new ScrambleText(officeRef.current,
        {
          timeOffset: 15,
          chars: [
            'P','a','r','c','l','e','t'
          ]
        }
      )
        .start()
        .play();
      instances.push(officeScramble);
    }

    return () => {
      // clean up both instances
      instances.forEach(inst => {
        if (typeof inst.stop === 'function') {
          inst.stop();
        }
      });
    };
  }, []);


  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageTitle} ref={titleRef}>
        Paraclet
      </div>

      <button className={styles.requestDemoButton}>
        Request a demo
      </button>

      <div className={styles.pitch} ref={pitchRef}>
        We develop AI-native solutions for architecture professionals.
      </div>

      <div className={styles.collaborators} ref={collabRef}>
        Our collaborators include<br/>
        Pool Architekten<br/>
        Jan De Vylder - A Studio<br/>
        Studio Meteora<br/>
        Studio 0More
      </div>

      <div className={styles.office} ref={officeRef}>
        Office<br/>
        Paraclet<br/>
        Geroldstrasse 31<br/>
        8005 Zurich<br/>
        Switzerland
      </div>
    </div>
  )
}
