import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Header from "../components/Header/header";
import { useEffect, useState } from "react";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "./api/firebase";

export default function Home() {
  const [postsList, setPostsList] = useState([]);
  const postCollectionref = collection(db, "posts");

  
  useEffect(() => {
    const getPosts = async () => {
      console.log("1");
      const data = await getDocs(postCollectionref);
      setPostsList(
        data.docs.map((doc) => ({
          ...doc.data(), id:doc.id
        }))
       )
    };

    getPosts()
  }, []);
  
   

   

  return (
    <>
      <Head>
        <title>Cinema Monkeys</title>
        <meta name="description" content="Cinema Monkeys" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Arima+Madurai:wght@100;200;300;400;500;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <div className={styles.grid}>
          {postsList.map((post) => {
            return (
              <Link key={post.id} href={`/${post.id}`} className={styles.card}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
