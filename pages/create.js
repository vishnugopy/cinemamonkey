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

  const ImageHandler = (e) => {
    let counter = 0;
    const files = e.target.files;
    console.log(files);
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target.result;
       const clean =  data.replace('data:', '').replace(/^.+,/, '')
        setImage(clean);
        counter++;
      };
      reader.readAsDataURL(files[i]);
    }
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
        <label> Image</label>
        <input type="file" accept="image/jpeg" onChange={ImageHandler} />
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
