import Link from "next/link"
import Image from "next/image"
import styles from "./header.module.css"
import iconImage from "../../public/account_circle.png"

export default function Header() {
    return(
        <header className={styles.header}>
            <nav className={styles.navigator}>
                <ul className={styles.navflexbox}>
                    <li><Link href="/" className={styles.navlink}>Home</Link></li>
                    <li><Link href="/search" className={styles.navlink}>Search</Link></li>
                    <li><Link href="/library" className={styles.navlink}>MyLibrary</Link></li>
                </ul>
            </nav>
            <div className={styles.icon}>
                <Image
                    src={iconImage}
                    width={30}
                    height={30}
                    alt="Picture of the account icon"
                />
            </div>
        </header>
    )
}