import styles from "./footer.module.css";
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


        <div className={styles.footerBottom}>

        <div className={styles.footList}>
          <ul >
            <li><a href="#About">About</a></li>
            <li><a href="#Blog">Blog</a></li>
            <li><a href="#Mentionlégale">Mention légale</a></li>
            <li><a href="#Contact">Contact</a></li>
          </ul>
        </div>

        <div  className={styles.footList}>
          <ul>
            <li><a href="#" class="fa fa-facebook">  Facebook</a></li>
            <li><a href="#" class="fa fa-twitter">  Twitter</a></li>
            <li><a href="#" class="fa fa-instagram">  Instagram</a></li>
            <li><a href="#" class="fa fa-whatsapp">  whatsapp</a></li>
          </ul>
        </div>
        </div>

      </div>

    </footer>
  );
}
