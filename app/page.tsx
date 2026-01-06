'use client';

import { useEffect, useRef, useState } from 'react';
import ScrambleText from 'scramble-text';
import usePageVisibility from './usePageVisibility';
import styles from './page.module.css';



export default function Home() {
  const titleRef = useRef<HTMLDivElement>(null);
  const pitchRef = useRef<HTMLDivElement>(null);
  const collabRef = useRef<HTMLDivElement>(null);
  const officeRef = useRef<HTMLDivElement>(null);

  // Only english and german
  const [lang, setLang] = useState<'en' | 'de'>('en');

  // Multiple languages
  // const languages: Array<'en'|'de'|'en'|'fr'|'en'|'it'|'en'|'rm'> = ['en','de','en','fr','en','it','en','rm'];
  // const [langIndex, setLangIndex] = useState(0);
  // const lang = languages[langIndex];

  const isVisible = usePageVisibility();

  const translations = {
    title: {
      en: 'Paraclet',
      de: 'Paraclet',
      fr: 'Paraclet',
      it: 'Paraclet',
      rm: 'Paraclet'
    },
    pitch: {
      en: 'We develop AI-native solutions for architects and designers.',
      de: 'Wir entwickeln KI-native Lösungen für Architekten und Designer.',
      fr: 'Nous développons des solutions natives en IA pour les architectes et les designers.',
      it: 'Sviluppiamo soluzioni native per l’IA destinate ad architetti e designer.',
      rm: 'Nus sviluppain soluziuns nativas cun IA per architects ed indeschinaders.'
    },
    collab: {
      en: `Selected clients:<br/>
        <a href="https://www.poolarch.ch/" target="_blank" rel="noopener noreferrer">pool Architekten</a><br/>
        <a href="https://de-vylder.arch.ethz.ch/" target="_blank" rel="noopener noreferrer">a studio – jan de vylder</a><br/>
        <a href="https://meteora.ch/" target="_blank" rel="noopener noreferrer">Meteora ETH</a><br/>
        <a href="https://0more.net/" target="_blank" rel="noopener noreferrer">Studio 0More</a>`,
      de: `Ausgewählte Kunden:<br/>
        <a href="https://www.poolarch.ch/" target="_blank" rel="noopener noreferrer">pool Architekten</a><br/>
        <a href="https://de-vylder.arch.ethz.ch/" target="_blank" rel="noopener noreferrer">a studio – jan de vylder</a><br/>
        <a href="https://meteora.ch/" target="_blank" rel="noopener noreferrer">Meteora ETH</a><br/>
        <a href="https://0more.net/" target="_blank" rel="noopener noreferrer">Studio 0More</a>`,
      fr: 'Clients sélectionnés:<br/>pool Architekten<br/>a studio – jan de vylder<br/>Meteora ETH<br/>Studio 0More',
      it: 'Clienti selezionati:<br/>pool Architekten<br/>a studio – jan de vylder<br/>Meteora ETH<br/>Studio 0More',
      rm: 'Clients tschernids:<br/>pool Architekten<br/>a studio – jan de vylder<br/>Meteora ETH<br/>Studio 0More'
    },
    office: {
      en: `Paraclet<br>
        Geroldstrasse 31b<br>
        CH-8005 Zurich<br><br>
        <a href="mailto:office@paraclet.io">office@paraclet.io</a>`,
      de: `Paraclet<br>
        Geroldstrasse 31b<br>
        CH-8005 Zürich<br><br>
        <a href="mailto:office@paraclet.io">office@paraclet.io</a>`,
      fr: 'Paraclet<br>Geroldstrasse 31b<br>CH-8005 Zurich<br><br>office@paraclet.io',
      it: 'Paraclet<br>Geroldstrasse 31b<br>CH-8005 Zurigo<br><br>office@paraclet.io',
      rm: 'Paraclet<br>Geroldstrasse 31b<br>CH-8005 Turitg<br><br>office@paraclet.io'
    }
  };

  const scrambleOpts = {
    timeOffset: 16,
    chars: ['P','a','r','a','c','l','e','t',' '],
    fps: 12
  };
  const scrambleOptsSlow = {
    timeOffset: 60,
    chars: ['P','a','r','a','c','l','e','t',' '],
    fps: 12
  };

  // Toggle english and german
  useEffect(() => {
    if (!isVisible) return;

    const id = setInterval(() => {
      setLang((prev) => (prev === 'en' ? 'de' : 'en'));
    }, 4500);
    return () => clearInterval(id);
  }, [isVisible]);

  // Toggle multiple languages
  // useEffect(() => {
  //   if (!isVisible) return;

  //   const id = setInterval(() => {
  //     setLangIndex((prev) => (prev + 1) % languages.length);
  //   }, 4500);
  //   return () => clearInterval(id);
  // }, [isVisible]);  

  // Scramble all three text areas on language change
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
      <div className={styles.pageTitle} ref={titleRef}>
        {translations.title[lang]}
      </div>

      <div className={styles.pitch} ref={pitchRef}>
        {translations.pitch[lang]}
      </div>

      <div className={styles.footer}>
        <div className={styles.collaborators} ref={collabRef} dangerouslySetInnerHTML={{ __html: translations.collab[lang] }}></div>
        <div className={styles.office} ref={officeRef} dangerouslySetInnerHTML={{ __html: translations.office[lang] }}></div>
      </div>

      <div className={styles.cr}>© 2026 Paraclet</div>
    </div>
  )
}