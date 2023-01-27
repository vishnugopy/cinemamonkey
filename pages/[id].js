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

  const LinkFrame = (props) => {
    console.log(props);
    let domain = new URL(props);
    domain = domain.hostname.replace("www.", "");
    return (
      <>
        {domain == "twitter.com" ? (
          <>
            <blockquote className="twitter-tweet">
              <a href={props}></a>
            </blockquote>
            <script
              src="https://platform.twitter.com/widgets.js"
              charset="utf-8"
            ></script>
          </>
        ) : domain == "youtube.be" ? (
          <iframe width="640" height="390" src={props} frameborder="0"></iframe>
        ) : (
          ""
        )}
      </>
    );
  };

useEffect(() => {
    const s = document.createElement("script");
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("async", "true");
    document.head.appendChild(s);
  }, []);

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
              <div className={styles.links}>
                {article.links &&
                  article.links.arrayValue.values.map((link, index) => {
                    console.log(link);
                    let domain = new URL(link.stringValue);
                    domain = domain.hostname.replace("www.", "");
                    console.log(domain);
                    return (
                      <>
                        {domain == "twitter.com" ? (
                          <>
                            
                            <blockquote key={index} className="twitter-tweet">
                              <a href={link.stringValue}>sfdsds</a>
                            </blockquote>
                            <script src="https://platform.twitter.com/widgets.js"></script>
                          </>
                        ) : domain == "youtu.be" ? (
                          <iframe
                            key={index}
                            width="640"
                            height="390"
                            src={link.stringValue}
                            frameborder="0"
                          ></iframe>
                        ) : (
                          <a href={link.stringValue} target={"_blank"}>
                            {link.stringValue}
                          </a>
                        )}
                      </>
                    );
                  })}
              </div>
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
