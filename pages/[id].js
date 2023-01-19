import styles from "../styles/news.module.scss";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./api/firebase";
import { useRouter } from "next/router";

export default function NewsPage() {
  const [article, setArticle] = useState([]);
  console.log(article);
  const router = useRouter();
  const { id} = router.query;
  const docRef = doc(db, "posts", id);
  
  useEffect(() => {
    // const getAPosts = async () => {
    //   try {
    //     const docSnap = await getDoc(docRef);
    //     setArticle(docSnap._document.data.value.mapValue.fields);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // getAPosts();
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
