import { doc, getDoc } from "firebase/firestore";
import styles from "../styles/news.module.scss";
import { useEffect, useState } from "react";
import { db } from "./api/firebase";
import { useRouter } from "next/router";
import Head from "next/head";
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
    console.log(id);
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
      <Head>
        <title>{article.title ? article.title.stringValue : ""}</title>
        <meta
          name="description"
          content="Cinema Monkeys is first people based news channel for tamil cinema"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:url" content="https://cinemamonkey.net" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Cinema Monkey" />
        <meta property="og:description" content="Cinema Monkeys" />
        <meta property="og:image" content="https://cinemamonkey.net/api/og" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="cinemamonkey.net" />
        <meta property="twitter:url" content="https://cinemamonkey.net" />
        <meta name="twitter:title" content="Cinema Monkey" />
        <meta name="twitter:description" content="Cinema Monkeys" />
        <meta name="twitter:image" content="https://cinemamonkey.net/api/og" />
      </Head>
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
                    return (
                      <div key={index}>
                        {domain == "twitter.com" ? (
                          <>
                            <blockquote className="twitter-tweet">
                              <a href={link.stringValue}></a>
                            </blockquote>
                            <script src="https://platform.twitter.com/widgets.js"></script>
                          </>
                        ) : domain == "youtu.be" ? (
                          <iframe
                            className={styles.iframe}
                            src={"https://www.youtube.com/embed/" + utubeId}
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
                      </div>
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
