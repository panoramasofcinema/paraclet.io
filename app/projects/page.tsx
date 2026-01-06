import Link from "next/link";
import styles from "./projects.module.css";


export default function ProjectsPage() {
  return (
    <div className={styles.pageContainer}>
      <div className={styles.pageTitle}>
        <a href="https://www.paraclet.io/">Paraclet</a>
      </div>

      <div className={styles.projects}>
        <br/>
        Selected projects:<br/>
        <a href="https://marksearch.online/" target="_blank" rel="noopener noreferrer">Mark AI</a><br/>
        <a href="https://www.poolarch.ch/" target="_blank" rel="noopener noreferrer">pool Architekten</a><br/>
        <a href="https://oma.marksearch.online/" target="_blank" rel="noopener noreferrer">Office for Metropolitan Architecture OMA</a><br/>
        <a href="https://jdv.marksearch.online/" target="_blank" rel="noopener noreferrer">round a round</a><br/>
        <a href="https://panoramasofcinema.ch/" target="_blank" rel="noopener noreferrer">Panoramas of Cinema</a><br/>
        <a href="https://search.0more.net/" target="_blank" rel="noopener noreferrer">Search 0More</a><br/>
        <a href="https://paradiso.panoramasofcinema.ch/" target="_blank" rel="noopener noreferrer">Paradiso</a>
      </div>

      <div className={styles.cr}>© 2026 Paraclet</div>
    </div>
  );
}
