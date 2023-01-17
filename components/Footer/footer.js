import styles from "./footer.module.scss";
import { useEffect, useState } from "react";

export default function Footer() {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    let localTheme = window.localStorage.getItem('theme');
    setTheme(localTheme);
  }, []);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    window.localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle("dark-mode");
    alert(window.matchMedia("(prefers-color-scheme: dark)").matches)
    setTheme(newTheme);
  };


  return (
    <footer className={styles.footer}>
      <div className={styles.footerDiv}>
        <p>&copy; CINEMA MONKEY 2023</p>
      </div>
    </footer>
  );
}
