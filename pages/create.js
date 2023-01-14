import { useState } from "react";
import styles from "../styles/create.module.css";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "./api/firebase";
import { useRouter } from "next/router";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  console.log(title, content);

  const postCollectionref = collection(db, "posts");

  const CreatePost = async () => {
    await addDoc(postCollectionref, {
      title: title,
      content: content,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    }).then(router.push("/"));
  };

  return (
    <main className={styles.main}>
      <section className={styles.form}>
        <button onClick={() => router.back()}>Go Back</button>
        <label> Title</label>
        <input
          placeholder="Title"
          type="text"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label> Content</label>
        <textarea
          placeholder="Content"
          rows={10}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button className="post" onClick={CreatePost}>
          Post
        </button>
      </section>
    </main>
  );
}
