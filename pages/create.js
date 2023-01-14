import { useState } from "react";
import styles from "../styles/create.module.css";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "./api/firebase";
import { useRouter } from "next/router";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ link , setLink] = useState("");
  const [ links , setLinks] = useState([])
  const router = useRouter();

  console.log(links);

  const postCollectionref = collection(db, "posts");

  const CreatePost = async () => {
    await addDoc(postCollectionref, {
      title: title,
      content: content,
      links : links,
      author: {
        name: auth.currentUser.displayName,
        id: auth.currentUser.uid,
      },
    }).then(router.push("/"));
  };

  const AddToLink = () => {
    links.push(link);
    setLink("");
  }

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
        {
          links.map((link, index) => {
            return (
              <li key={index}>
                {link}
              </li>
           );
          })}
        </ul>
         <button className="post" onClick={AddToLink}>
          Add Link
        </button>
       
        <button className="post" onClick={CreatePost}>
          Post
        </button>
      </section>
    </main>
  );
}
