import Head from "next/head";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import Header from "../components/Header/header";
import Footer from "../components/Footer/footer";
import styles from "../styles/home.module.scss";
import Link from "next/link";
import { db } from "./api/firebase";

export default function Home() {
  const [postsList, setPostsList] = useState([]);
  const postCollectionref = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionref);
      setPostsList(
        data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    };

    getPosts();
  }, []);

  return (
    <>
      <Head>
        <title>Cinema Monkey</title>
        <meta name="description" content="Cinema Monkeys" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {postsList.map((post) => {
            return (
              <Link key={post.id} href={`/${post.id}`}>
                <div className={styles.cards}>
                  <h2>{post.title}</h2>
                  <div className={styles.author}>
                    <p>{post.author.name}</p>
                    <p>12/01/2023</p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
      <Footer />
    </>
  );
}
