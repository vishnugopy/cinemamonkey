import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Header from "../components/Header/header"

export default function Home() {

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Cinema Monkeys" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <main className={styles.main}>
        <div className={styles.grid}>
          <Link href="/1" className={styles.card}>
            <h2>
              பள்ளி மைதானத்தில் சுழன்றடித்துச் சூறாவளி , சுழல் காற்றில் சிக்கி
              வீடுகள் உள்ளிட்ட கட்டிடங்கள் சேதம்
            </h2>
            <p>
              அமெரிக்காவின் ஆர்கன்சாஸ் மாகாணத்தில் உள்ள ஹாட் ஸ்பிரிங்ஸ் சிட்டி
              பள்ளி மைதானத்தில் சக்திவாய்ந்த சூறாவளி சுழன்றடித்துச் சென்ற
              சிசிடிவி காட்சிகள் வெளியாகி உள்ளன. கருமேகக் கூட்டங்களுக்கு
              மத்தியில் கனமழையுடன் தோன்றிய சுழல்காற்றில் சிக்கி வீடுகள் உள்ளிட்ட
              கட்டிடங்கள், மரங்கள், மின் கம்பங்கள் என அனைத்தும் துவம்சம்
              செய்யப்பட்டன.
            </p>
          </Link>
        </div>
      </main>
    </>
  );
}
