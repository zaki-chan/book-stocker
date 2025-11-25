import Link from "next/link"
import Image from "next/image"
import styles from "./header.module.css"
import iconImage from "../../public/account_circle.png"

export default function Header() {
    return(
        <header className=''>
            <nav className=''>
                <ul className=''>
                    <li><Link href="/" className=''>Home</Link></li>
                    <li><Link href="/search" className=''>Search</Link></li>
                    <li><Link href="/library" className=''>MyLibrary</Link></li>
                </ul>
            </nav>
            <div className=''>
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