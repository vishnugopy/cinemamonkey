import { useRouter } from "next/router";
import styles from "../styles/news.module.css";
import { db } from "./api/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [article, setArticle] = useState([]);
  console.log(article);
  const router = useRouter();
  const { id } = router.query;

  const docRef = doc(db, "posts", id);
  console.log(docRef);
  useEffect(() => {
    const getAPosts = async () => {
      try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data());
          setArticle(docSnap._document.data.value.mapValue.fields);
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getAPosts();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.news}>
        <h1>{article.title ? article.title.stringValue : ""}</h1>
        <p>{article.content ? article.content.stringValue : ""}</p>

        <div>
          <h2>Sources</h2>
          <ul className={styles.links}>
            {/* {JSON.stringify(article.links)} */}
            {/* {article.links.arrayValue.values.map((link, index) => {
              return <li key={index}>{link}</li>;
            })} */}
          </ul>
        </div>

        <button onClick={() => router.back()}>Go Back</button>
      </section>
    </main>
  );
}
