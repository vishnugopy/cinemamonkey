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
    const s = document.createElement("script");
    const getAPosts = async () => {
      try {
        const docSnap = await getDoc(docRef);
        setArticle(docSnap._document.data.value.mapValue.fields);
      } catch (error) {
        console.log(error);
      }
    };
    s.setAttribute("src", "https://platform.twitter.com/widgets.js");
    s.setAttribute("async", "true");
    document.head.appendChild(s);
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

                    let url = link.stringValue;
                    const array = url.split("/");
                    let utubeId="";
                    let tweetUrl ="";
                    if(array[2]= "youtu.be"){
                      utubeId = array[3]
                    }
                    else if(array[2]= "twitter.com"){
                      tweetUrl =link.stringValue;
                    }
              
                    return (
                      <ul>
                        <li >
                          <blockquote className="twitter-tweet">
                            <a href={link.stringValue} ></a>
                          </blockquote>
                          <script  src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>    
                        </li>
                        <li>
                          <iframe  width="640" height="390"
                            src={"http://www.youtube.com/embed/"+utubeId}
                            frameborder="0">
                          </iframe>
                        </li>
                      </ul>
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
