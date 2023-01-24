import styles from "../styles/news.module.scss";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./api/firebase";
import { useRouter } from "next/router";
import Header from "../components/Header/header";

export default function NewsPage() {
  const [article, setArticle] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  
  useEffect(() => {
    const docRef = doc(db, "posts", id);
    const getAPosts = async () => {
      try {
        const docSnap = await getDoc(docRef);
        setArticle(docSnap._document.data.value.mapValue.fields);
      } catch (error) {
        console.log(error);
      }
    };

    getAPosts();
  }, []);

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
                      <li >
                        <blockquote class="twitter-tweet">
                        <a href={link.stringValue} target={"_blank"}>
                          {link.stringValue}
                        </a>
                          </blockquote>
                          <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
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
