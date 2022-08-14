import Head from "next/head"
import { styles } from "../styles/styles"
import Card from "../components/Card"
import PostsCell from "../components/PostsCell"

export default function Home() {
  return (
    <>
      <Head>
        <title>A First Look at create-t3-app</title>
        <meta name="description" content="Example t3 project from A First Look at create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.appContainer}>
        <h1 className={styles.title}>
          Hello from <span className="text-purple-300">ajc</span>webdev
        </h1>

        <div className={styles.grid}>
          <Card name="Blog" url="ajcwebdev.com/" />
          <Card name="Twitter" url="twitter.com/ajcwebdev/" />
          <Card name="GitHub" url="github.com/ajcwebdev/" />
          <Card name="Polywork" url="poly.work/ajcwebdev/" />
        </div>

        <PostsCell />
      </main>
    </>
  )
}