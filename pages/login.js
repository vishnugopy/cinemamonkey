import styles from "../styles/Create.module.css";
import { auth, provider } from "./api/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      alert("ok");
      localStorage.setItem("isAuth", true);
      router.push("/create")
    });
  };

  return (
    <main className={styles.main}>
      <section className={styles.login}>
        <p>Welcome ! Log in if your can right news in tamil</p>
        <button className="login-with-google-btn" onClick={loginWithGoogle}>
          LOG IN
        </button>
      </section>
    </main>
  );
}
