// import Image from "next/image";
// import styles from "./page.module.css";
import './page.css';

export default function Home() {
  return (
    <div className="page-container">
      {/* <div className="page-title">paraclet</div> */}
      <div className="image-container">
        <img src="/Double_slit_interference.png" alt="Center Image" className="center-image" />
      </div>
    </div>
  );
}
