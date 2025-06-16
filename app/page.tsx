'use client';

import { useEffect, useRef, RefObject } from 'react';
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

  const scrambleOpts = {
    timeOffset: 30,
    chars: ['P','a','r','a','c','l','e','t'],
    fps: 6
  };

  const onTitleHover = useScrambleOnHover(titleRef, {
    timeOffset: 60,
    chars: ['P','a','r','a','c','l','e','t'],
    fps: 6
  }, true);
  const onPitchHover = useScrambleOnHover(pitchRef, scrambleOpts, true);
  const onCollabHover = useScrambleOnHover(collabRef, scrambleOpts, true);
  const onOfficeHover = useScrambleOnHover(officeRef, scrambleOpts, true);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageTitle} ref={titleRef} onMouseEnter={onTitleHover}>
        Paraclet
      </div>

      <button className={styles.requestDemoButton}>
        Request a demo
      </button>

      <div className={styles.pitch} ref={pitchRef} onMouseEnter={onPitchHover}>
        We develop AI-native solutions for architecture professionals.
      </div>

      <div className={styles.collaborators} ref={collabRef} onMouseEnter={onCollabHover}>
        Our collaborators include<br/>
        Pool Architekten<br/>
        Jan De Vylder<br/>
        Studio Meteora<br/>
        Studio 0More
      </div>

      <div className={styles.office} ref={officeRef} onMouseEnter={onOfficeHover}>
        Office<br/>
        Paraclet<br/>
        Geroldstrasse 31b<br/>
        8005 Zurich<br/>
        Switzerland
      </div>
    </div>
  )
}
