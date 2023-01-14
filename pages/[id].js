import { useRouter } from 'next/router'
import styles from "../styles/news.module.css";
import { db } from "./api/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [article, setArticle] = useState([]);
  const router = useRouter()
  const { id } = router.query;
  
  useEffect(() => {
    const getAPosts = async () => {
      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);
      setArticle(docSnap._document.data.value.mapValue.fields);
    };

    getAPosts();
  }, []);

  return (
    <main className={styles.main}>
      <section className={styles.news}>
        <h1>
          {article.title ? article.title.stringValue : ""}
        </h1>
        <p>
        {article.content ? article.content.stringValue : ""}
        </p>

        <button onClick={() => router.back()}>Go Back</button>
      </section>
    </main>
  );
}
