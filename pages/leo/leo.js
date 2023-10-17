import styles from "./leo.module.scss";
import Image from "next/image";
import { useState } from "react";

export default function Leo() {
  const [name, setName] = useState("");

  return (
    <main className={styles.main}>
      <section className={styles.form}>
        <h1 className={styles.title}>Input your name here</h1>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <img src={"/api/leoog?title=" + name} />
        <button
          className={styles.button}
          onClick={() => {
            // on click download image generated in image tag
            const a = document.createElement("a");
            a.href = "/api/leoog?title=" + name;
            a.download = "leo.png";
            a.click();
          }}
          download
        >
          Download
        </button>
      </section>
    </main>
  );
}
