import { useRouter } from "next/router";
import styles from "../styles/news.module.scss";
import { db } from "./api/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function NewsPage() {
  const [article, setArticle] = useState([]);
  console.log(article);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const getAPosts = async () => {
      const docRef = doc(db, "posts", id);
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

        {/* <div className={styles.source}>
          <h3>Sources</h3>
          <ul className={styles.links}>
          <li> <a href="https://nextjs.org" target={"_blank"}>Next.js!</a></li>
          <li> <a href="https://nextjs.org" target={"_blank"}>Next.js!</a></li>
          <li> <a href="https://nextjs.org" target={"_blank"}>Next.js!</a></li>
          <li> <a href="https://nextjs.org" target={"_blank"}>Next.js!</a></li>
        
            {JSON.stringify(article.links)} 
         
          </ul>
        </div> */}

        <button onClick={() => router.back()}>Go Back</button>
      </section>
    </main>
  );
}
