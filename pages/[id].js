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
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("async", "true");
    document.head.appendChild(s);
  }, [article]);

  useEffect(() => {
    const getAPosts = async () => {
      if (id) {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        try {
          const docSnap = await getDoc(docRef);
          setArticle(docSnap._document.data.value.mapValue.fields);
          console.log(docSnap._document.data.value.mapValue.fields);
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
          <button onClick={() => router.back()}>Go Back</button>
          <h1>{article.title ? article.title.stringValue : ""}</h1>
          <p>{article.content ? article.content.stringValue : ""}</p>

          {article.links && (
            <div className={styles.source}>
              <div className={styles.links}>
                {JSON.stringify(article.links.arrayValue) != "{}" &&
                  article.links.arrayValue.values.map((link, index) => {
                    let domain = new URL(link.stringValue);
                    let utubeId = "";
                    let array = link.stringValue.split("/");
                    utubeId = array[3];
                    domain = domain.hostname.replace("www.", "");
                    console.log(utubeId);
                    return (
                      <>
                        {domain == "twitter.com" ? (
                          <>
                            <blockquote key={index} className="twitter-tweet">
                              <a href={link.stringValue}></a>
                            </blockquote>
                            <script src="https://platform.twitter.com/widgets.js"></script>
                          </>
                        ) : domain == "youtu.be" ? (
                          <iframe
                            key={index}
                            width="640"
                            height="390"
                            src={"http://www.youtube.com/embed/"+utubeId}
                            controls
                            allowfullscreen
                          />
                        ) : (
                          <a
                            className={styles.sharedLink}
                            href={link.stringValue}
                            target={"_blank"}
                          >
                            {link.stringValue}
                          </a>
                        )}
                      </>
                    );
                  })}
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}
