import Image from "next/image";
import Link from "next/link"
import styles from "./page.module.css";
import Header from "../components/Header"


export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <p>This is the home</p>
    </div>
  );
}
