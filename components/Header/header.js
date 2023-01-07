import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
        <div className={styles.headerDiv}>
        <Link href={"/"}>
        <Image
          src="Logo.svg"
          alt="Picture of the author"
          width={80}
          height={60}
        />
      </Link>

      <Link href={"/login"}>
        <div className={styles.loginButton}></div>
      </Link>
        </div>
     
    </header>
  );
}
