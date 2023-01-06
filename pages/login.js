import styles from "../styles/News.module.css";
import { auth, provider } from "./api/firebase";
import { signInWithPopup } from "firebase/auth";

export default function Login() {

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      alert("ok");
      localStorage.setItem("isAuth", true);
    });
  };

  return (
    <main className={styles.main}>
      <section>
        <p>ijgsiudishbk</p>
        <button className="login-with-google-btn" onClick={loginWithGoogle}>
          LOG IN
        </button>
      </section>
    </main>
  );
}
