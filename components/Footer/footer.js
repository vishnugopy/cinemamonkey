import styles from "./footer.module.scss";
import { useEffect, useState } from "react";
import { BsFacebook, BsTwitter , BsInstagram , BsMail } from "react-icons/bs";
import { SiMinutemailer } from "react-icons/si";


export default function Footer() {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    let localTheme = window.localStorage.getItem("theme");
    setTheme(localTheme);
  }, []);

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    window.localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark-mode");
    alert(window.matchMedia("(prefers-color-scheme: dark)").matches);
    setTheme(newTheme);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerDiv}>
        <p>&copy; CINEMA MONKEY 2023</p>

         <div className={styles.footerBottom}>
        {/*  <div className={styles.footList}>
            <ul>
              <li>
                <a href="About">About</a>
              </li>
              <li>
                <a href="Blog">Blog</a>
              </li>
              <li>
                <a href="Mentionlégale">Mention légale</a>
              </li>
              <li>
                <a href="Contact">Contact</a>
              </li>
            </ul>
          </div> */}

          <div className={styles.footList}>
            <ul>
              <li>
                <a href="https://www.instagram.com/cinema_monkeys/" target={"_blank"}>
                  <BsFacebook />
                  <span> Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://twitter.com/cinema_monkey" target={"_blank"}>
                  <BsTwitter /> <span> Twitter</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/cinema_monkeys/" target={"_blank"}>
                  <BsInstagram/>
                  <span> Instagram</span>
                </a>
              </li>
              <li>
                <a href="mailto:cinemamonkey10@gmail.com" target={"_blank"}>
                  <SiMinutemailer /> <span> Mail</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
