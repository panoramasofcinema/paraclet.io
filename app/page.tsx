'use client';

import { useEffect, useRef, useState } from 'react';
import ScrambleText from 'scramble-text';
import usePageVisibility from './usePageVisibility';
import styles from './page.module.css';


export default function Home() {
  const titleRef = useRef<HTMLDivElement>(null);
  const pitchRef = useRef<HTMLDivElement>(null);
  const collabRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const officeRef = useRef<HTMLDivElement>(null);
  const crRef = useRef<HTMLDivElement>(null);

  // Only english and german
  const [lang, setLang] = useState<'en' | 'de'>('en');

  const isVisible = usePageVisibility();

  const translations = {
    title: {
      en: 'Paraclet',
      de: 'Paraclet'
    },
    pitch: {
      en: 'We develop AI-native solutions for architects and designers.',
      de: 'Wir entwickeln KI-native Lösungen für Architekten und Designer.'
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
    },
    projects: {
      en: `Selected projects:<br/>
        <a href="https://marksearch.online/" target="_blank" rel="noopener noreferrer">Mark</a><br/>
        <a href="https://jdv.marksearch.online/" target="_blank" rel="noopener noreferrer">round a round</a><br/>
        <a href="https://panoramasofcinema.ch/" target="_blank" rel="noopener noreferrer">Panoramas of Cinema</a><br/>
        <a href="https://search.0more.net/" target="_blank" rel="noopener noreferrer">Search 0More</a>`,
      de: `Ausgewählte Projekte:<br/>
        <a href="https://marksearch.online/" target="_blank" rel="noopener noreferrer">Mark</a><br/>
        <a href="https://jdv.marksearch.online/" target="_blank" rel="noopener noreferrer">round a round</a><br/>
        <a href="https://panoramasofcinema.ch/" target="_blank" rel="noopener noreferrer">Panoramas of Cinema</a><br/>
        <a href="https://search.0more.net/" target="_blank" rel="noopener noreferrer">Search 0More</a>`,
    },
    office: {
      en: `Paraclet<br/>
        Geroldstrasse 31b<br/>
        CH-8005 Zurich<br>
        <a href="mailto:office@paraclet.io">office@paraclet.io</a><br><br>
        © 2026 Paraclet`,
      de: `Paraclet<br/>
        Geroldstrasse 31b<br/>
        CH-8005 Zürich<br>
        <a href="mailto:office@paraclet.io">office@paraclet.io</a><br><br>
        © 2026 Paraclet`,
    },
    cr: {
      en: `© 2026 Paraclet`,
      de: `© 2026 Paraclet`
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
    }, 5000);
    return () => clearInterval(id);
  }, [isVisible]);

  // Scramble all text areas on language change
  useEffect(() => {
    [titleRef, pitchRef, collabRef, projectsRef,].forEach(ref => {
      if (!ref.current) return;
      const opts = (ref === titleRef || ref === crRef) ? scrambleOptsSlow : scrambleOpts;
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

      <div className={styles.pitch} ref={pitchRef}>{translations.pitch[lang]}</div>
      
      <div className={styles.projectsWrap}>
        <div className={styles.collaborators} ref={collabRef} dangerouslySetInnerHTML={{ __html: translations.collab[lang] }}></div>
        <div className={styles.collaborators} ref={projectsRef} dangerouslySetInnerHTML={{ __html: translations.projects[lang] }}></div>
      </div>

      <div className={styles.footer}>
        <div className={styles.office} ref={officeRef} dangerouslySetInnerHTML={{ __html: translations.office[lang] }}></div>
        {/* <div className={styles.cr} ref={crRef}>{translations.cr[lang]}</div> */}
      </div>
    </div>
  )
}