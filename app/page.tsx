'use client';

import { useEffect, useRef, useState, RefObject } from 'react';
import ScrambleText from 'scramble-text';
import styles from './page.module.css';


function useScrambleOnHover(
  ref: RefObject<HTMLDivElement | null>,
  options: ConstructorParameters<typeof ScrambleText>[1],
  playOnMount = false
) {
  const scrRef = useRef<ScrambleText | null>(null);

  // on-mount play if requested
  useEffect(() => {
    if (playOnMount && ref.current) {
      const scr = new ScrambleText(ref.current, {
        ...options,
        callback: () => {
          scr.stop();
          scrRef.current = null;
        },
      });
      scrRef.current = scr;
      scr.start().play();
    }
  }, [playOnMount, ref, options]);

  // hover handler: do nothing if one's still running
  function handleHover() {
    if (!ref.current || scrRef.current) return;
    const scr = new ScrambleText(ref.current, {
      ...options,
      callback: () => {
        scr.stop();
        scrRef.current = null;
      },
    });
    scrRef.current = scr;
    scr.start().play();
  }
  return handleHover;
}


export default function Home() {
  const titleRef = useRef<HTMLDivElement>(null);
  const pitchRef = useRef<HTMLDivElement>(null);
  const collabRef = useRef<HTMLDivElement>(null);
  const officeRef = useRef<HTMLDivElement>(null);

  const [lang, setLang] = useState<'en' | 'de'>('en');
  const translations = {
    title: {
      en: 'Paraclet',
      de: 'Paraclet'
    },
    pitch: {
      en: 'We develop AI-native solutions for architects and planners.',
      de: 'Wir entwickeln KI-native Lösungen für Architekten und Planer.'
    },
    collab: {
      en: 'Our collaborators include<br/>Pool Architekten<br/>Jan De Vylder<br/>Meteora<br/>Studio 0More',
      de: 'Zu unseren Partnern zählen<br/>Pool Architekten<br/>Jan De Vylder<br/>Meteora<br/>Studio 0More'
    },
    office: {
      en: 'Office<br>Paraclet<br>Geroldstrasse 31b<br>8005 Zurich<br>Switzerland',
      de: 'Büro<br>Paraclet<br>Geroldstrasse 31b<br>8005 Zürich<br>Schweiz'
    }
  };

  const scrambleOpts = {
    timeOffset: 30,
    chars: ['p','a','r','a','c','l','e','t',' '],
    fps: 6
  };
  const scrambleOptsSlow = {
    timeOffset: 60,
    chars: ['p','a','r','a','c','l','e','t',' '],
    fps: 6
  };

  const onTitleHover = useScrambleOnHover(titleRef, scrambleOptsSlow, false);
  const onPitchHover = useScrambleOnHover(pitchRef, scrambleOpts, false);
  const onCollabHover = useScrambleOnHover(collabRef, scrambleOpts, false);
  const onOfficeHover = useScrambleOnHover(officeRef, scrambleOpts, false);

  // Toggle language every 10 seconds
  useEffect(() => {
    const id = setInterval(() => {setLang((prev) => (prev === 'en' ? 'de' : 'en'));}, 7_000);
    return () => clearInterval(id);
  }, []);

  // scramble all three text areas on lang change
  useEffect(() => {
    [titleRef, pitchRef, collabRef, officeRef].forEach(ref => {
      if (!ref.current) return;
      const opts = ref === titleRef ? scrambleOptsSlow : scrambleOpts;
      const scr = new ScrambleText(ref.current, {
        ...opts,
        callback: () => scr.stop(),
      });
      scr.start().play();
    });
  }, [lang]);



  return (
    <div className={styles.pageContainer}>
      {/* <div className={styles.pageTitle} ref={titleRef} onMouseEnter={onTitleHover}> */}
      <div className={styles.pageTitle} ref={titleRef}>
        {translations.title[lang]}
      </div>

      <button className={styles.requestDemoButton}>
        Request a demo
      </button>

      {/* <div className={styles.pitch} ref={pitchRef} onMouseEnter={onPitchHover}> */}
      <div className={styles.pitch} ref={pitchRef}>
        {translations.pitch[lang]}
      </div>

      {/* <div className={styles.collaborators} ref={collabRef} onMouseEnter={onCollabHover}> */}
      <div className={styles.collaborators} ref={collabRef} dangerouslySetInnerHTML={{ __html: translations.collab[lang] }}>
        {/* {translations.collab[lang]}
        <br/>Pool Architekten
        <br/>Jan De Vylder
        <br/>Meteora
        <br/>Studio 0More */}
      </div>

      {/* <div className={styles.office} ref={officeRef} onMouseEnter={onOfficeHover}> */}
      <div className={styles.office} ref={officeRef} dangerouslySetInnerHTML={{ __html: translations.office[lang] }}>
        {/* {translations.office[lang]} */}
        {/* <br/>Paraclet
        <br/>Geroldstrasse 31b
        <br/>8005 Zurich
        <br/>Switzerland */}
      </div>
    </div>
  )
}