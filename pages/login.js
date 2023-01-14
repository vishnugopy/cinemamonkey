import styles from "../styles/create.module.css";
import { auth, provider } from "./api/firebase";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Login() {
  const router = useRouter();

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      router.push("/create");
    });
  };

  return (
    <main className={styles.main}>
      <section className={styles.login}>
        <Image
          className={styles.decoLogo}
          src="logo.svg"
          alt="Logo of Cinema Monkeys"
          width={300}
          height={300}
        />
        <button onClick={loginWithGoogle}>LOG IN</button>
      </section>
    </main>
  );
}
