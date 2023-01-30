import { useState } from "react";
import styles from "../styles/create.module.scss";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "./api/firebase";
import { useRouter } from "next/router";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [link, setLink] = useState("");
  const [links, setLinks] = useState([]);
  const [image, setImage] = useState([]);
  const router = useRouter();
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  const postCollectionref = collection(db, "posts");

  const CreatePost = async () => {
    await addDoc(postCollectionref, {
      title: title,
      content: content,
      links: links,
      date: currentDate,
      image: image,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    }).then(router.push("/"));
  };

  const AddToLink = () => {
    setLinks((links) => [...links, link]);
    setLink("");
  };

 

  return (
    <main className={styles.main}>
      <section className={styles.form}>
        <button  className={styles.goBackButton}  onClick={() => router.back()}>Go Back</button>
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
        <label>Link</label>
        <input
          placeholder="Link"
          type="text"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <ul className={styles.links}>
          {links.map((link, index) => {
            return <li key={index}>{link}</li>;
          })}
        </ul>
        <button className={styles.formButton} onClick={AddToLink}>
          Add Link
        </button>

        <button className={styles.formButton} onClick={CreatePost}>
          Post
        </button>
      </section>
    </main>
  );
}
