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

  // const [lang, setLang] = useState<'en' | 'de'>('en');
  const languages: Array<'en'|'de'|'en'|'fr'|'en'|'it'|'en'|'rm'> = ['en','de','en','fr','en','it','en','rm'];
  const [langIndex, setLangIndex] = useState(0);
  const lang = languages[langIndex];

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
      en: 'Selected clients:<br/>pool Architekten<br/>a studio – jan de vylder<br/>Meteora ETH<br/>Studio 0More<br>',
      de: 'Ausgewählte Kunden:<br/>pool Architekten<br/>a studio – jan de vylder<br/>Meteora ETH<br/>Studio 0More',
      fr: 'Clients sélectionnés:<br/>pool Architekten<br/>a studio – jan de vylder<br/>Meteora ETH<br/>Studio 0More',
      it: 'Clienti selezionati:<br/>pool Architekten<br/>a studio – jan de vylder<br/>Meteora ETH<br/>Studio 0More',
      rm: 'Clients tschernids:<br/>pool Architekten<br/>a studio – jan de vylder<br/>Meteora ETH<br/>Studio 0More'
    },
    office: {
      en: 'Paraclet<br>Geroldstrasse 31b<br>CH-8005 Zurich<br><br>office@paraclet.io',
      de: 'Paraclet<br>Geroldstrasse 31b<br>CH-8005 Zürich<br><br>office@paraclet.io',
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

  // Toggle language every X seconds
  // useEffect(() => {
  //   if (!isVisible) return;

  //   const id = setInterval(() => {setLang((prev) => (prev === 'en' ? 'de' : 'en'));}, 5_000);
  //   return () => clearInterval(id);
  // }, [isVisible]);
  useEffect(() => {
    if (!isVisible) return;
  
    const id = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % languages.length);
    }, 5000);
  
    return () => clearInterval(id);
  }, [isVisible]);  

  // scramble all three text areas on language change
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

      <div className={styles.cr}>© 2025 Paraclet</div>
    </div>
  )
}