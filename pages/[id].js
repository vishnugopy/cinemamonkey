import { doc, getDoc } from "firebase/firestore";
import styles from "../styles/news.module.scss";
import { useEffect, useState } from "react";
import { db } from "./api/firebase";
import { useRouter } from "next/router";
import Header from "../components/Header/header";

export default function NewsPage() {
  const [article, setArticle] = useState([]);
  const router = useRouter();
  const query = router.query;
  const id = query.id;

  useEffect(() => {
    const getAPosts = async () => {
      if (id) {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        try {
          const docSnap = await getDoc(docRef);
          setArticle(docSnap._document.data.value.mapValue.fields);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getAPosts();
  }, [id]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.news}>
          {/* <img src={article.image && article.image.stringValue} alt="kijbd"></img> */}
          <h1>{article.title ? article.title.stringValue : ""}</h1>
          <p>{article.content ? article.content.stringValue : ""}</p>

          {article.links ? (
            <div className={styles.source}>
              <ul className={styles.links}>
                {article.links &&
                  article.links.arrayValue.values.map((link, index) => {
                    return (
                      <li key={index}>
                        <a href={link.stringValue} target={"_blank"}>
                          {link.stringValue}
                        </a>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ) : (
            ""
          )}
          <button onClick={() => router.back()}>Go Back</button>
        </section>
      </main>
    </>
  );
}
