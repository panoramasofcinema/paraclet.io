'use client';

import { useState, useEffect, useRef } from "react";
import ScrambleText from "scramble-text";
import Image from "next/image";
import styles from "./projects.module.css";


export default function ProjectsPage() {
  const titleRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const officeRef = useRef<HTMLDivElement>(null);

  const [showPool, setShowPool] = useState(false);
  const poolButtonRef = useRef<HTMLButtonElement>(null);

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

  // Scramble effect
  useEffect(() => {
    [titleRef, projectsRef, officeRef].forEach(ref => {
    if (!ref.current) return;
    const opts = ref === titleRef ? scrambleOptsSlow : scrambleOpts;
    const scr = new ScrambleText(ref.current, {
      ...opts,
      callback: () => scr.stop(),
    });
    scr.start().play();
  });
  }, []);
  
  // Modal effect
  useEffect(() => {
    if (!showPool) return;
  
    const close = () => {
      setShowPool(false);
      poolButtonRef.current?.blur();
    };
  
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
  
    const handlePointerDown = (e: PointerEvent) => {
      const modalEl = document.getElementById("pool-modal-content");
      if (modalEl && modalEl.contains(e.target as Node)) return;
      close();
    };
  
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown, true);
  
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown, true);
    };
  }, [showPool]);
  
  
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageTitle} ref={titleRef}>
        <a href="https://www.paraclet.io/">Paraclet</a>
      </div>

      <div className={styles.projects} ref={projectsRef}>
        Selected projects:<br/>
        <a href="https://marksearch.online/" target="_blank" rel="noopener noreferrer">Mark AI</a><br/>
        <button ref={poolButtonRef} onClick={() => setShowPool(true)} className={styles.projectLink}>
          pool Architekten
        </button><br/>
        <a href="https://oma.marksearch.online/" target="_blank" rel="noopener noreferrer">Office for Metropolitan Architecture OMA</a><br/>
        <a href="https://jdv.marksearch.online/" target="_blank" rel="noopener noreferrer">round a round</a><br/>
        <a href="https://panoramasofcinema.ch/" target="_blank" rel="noopener noreferrer">Panoramas of Cinema</a><br/>
        <a href="https://search.0more.net/" target="_blank" rel="noopener noreferrer">Search 0More</a><br/>
      </div>

      <div className={styles.footer}>
        <div></div>
        <div ref={officeRef}>
          Paraclet<br/>
          Geroldstrasse 31b<br/>
          CH-8005 Zurich<br/><br/>
          <a href="mailto:office@paraclet.io">office@paraclet.io</a>
        </div>
      </div>

      <div className={styles.cr}>© 2026 Paraclet</div>

      {showPool && (
        <div className={styles.modalOverlay}>
          <div
            id="pool-modal-content"
            className={styles.modalContent}
          >
            <Image
              src="/pool.png"
              alt="pool Architekten"
              width={3678}
              height={2474}
              className={styles.modalImage}
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
