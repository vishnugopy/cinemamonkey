import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";

export default function Header() {
    
  return (
    <header className={styles.header}>
        <div className={styles.headerDiv}>
        <Link href={"/"}>
        <Image
        className={styles.logo}
          src="Logo.svg" 
          alt="Logo of Cinema Monkeys"
          width={80}
          height={60}
        />
      </Link>

      <Link href={"/login"}>
      <Image
        className={styles.loginButton}
          src="avatar.svg" 
          alt="Profile of Cinema Monkeys"
          width={80}
          height={60}
        />
      </Link>
        </div>
     
    </header>
  );
}
