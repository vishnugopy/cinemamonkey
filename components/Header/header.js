import Link from "next/link";
import styles from "./header.module.scss";
import Image from "next/image";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerDiv}>
        <Link href={"/"}>
          <Image
            className={styles.logo}
            src="logo.svg"
            alt="Logo of Cinema Monkeys"
            width={80}
            height={60}
          />
        </Link>
      </div>
    </header>
  );
}
