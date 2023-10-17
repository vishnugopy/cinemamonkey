import Link from "next/link";
import styles from "./header.module.scss";
import "./logo.svg";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerDiv}>
        <Link href={"/"}>
          <img
            className={styles.logo}
            src="./logo.svg"
            alt="Logo of Cinema Monkeys"
            width={80}
            height={60}
          />
        </Link>

        <nav className={styles.nav}>
          <Link href={"/leo/leo"}>Leo Dass Font</Link>
        </nav>
      </div>
    </header>
  );
}
