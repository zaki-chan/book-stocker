import Image from "next/image";
import Link from "next/link"
import styles from "./page.module.css";


export default function Home() {
  return (
    <div className={styles.page}>
      <p>This is the home</p>
    </div>
  );
}
