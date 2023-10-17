import styles from "./leo.module.scss";
import Header from "../../components/Header/header";
import { useState } from "react";

export default function Leo() {
  const [name, setName] = useState("");

  return (
    <main className={styles.main}>
      <section className={styles.form}>
        <button
          className={styles.backbutton}
          onClick={() => {
            window.history.back();
          }}
        >
          {" "}
          Back
        </button>
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
