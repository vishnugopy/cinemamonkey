import { useState } from "react";
import styles from "../styles/News.module.css";
import {addDoc, collection } from "firebase/firestore"
import { db , auth } from "./api/firebase";
 

export default function CreatePage() {

const [title , setTitle] = useState("");
const [content , setContent] = useState("");

console.log(title,content);

const postCollectionref = collection(db , "posts")

const CreatePost = async () => {
await addDoc(postCollectionref , {
    title : title ,
    content : content ,
    author : {
        name : auth.currentUser.displayName,
        id  : auth.currentUser.uid
    }
})
}


  return (
    <main className={styles.main}>
      <section>
       <input type="text" onChange={(e)=>{
        setTitle(e.target.value)
       }}/>
       <textarea onChange={(e)=>{
        setContent(e.target.value)
       }} />
        <button className="post" onClick={CreatePost}>
          Post
        </button>
      </section>
    </main>
  );
}
