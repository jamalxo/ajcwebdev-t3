import type { NextPage } from "next"
import Head from "next/head"
import Link from "next/link"
import { trpc } from "../utils/trpc"
import { DefaultQueryCell } from "../utils/DefaultQueryCell"

const appContainerStyle = "container mx-auto flex flex-col items-center justify-center min-h-screen p-4"
const titleStyle = "text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700"
const gridStyle = "grid gap-3 pt-3 mt-3 text-center md:grid-cols-2 lg:w-2/3"
const queryResponseStyle = "pt-6 text-2xl text-blue-500 flex justify-center items-center w-full"
const cardSectionStyle = "flex flex-col justify-center p-6 duration-500 border-2 border-gray-500 rounded shadow-xl motion-safe:hover:scale-105"
const cardTitleStyle = "text-lg text-gray-700"
const cardDescriptionStyle = "text-sm text-gray-600"
const linkStyle = "mt-3 text-sm underline text-violet-500 decoration-dotted underline-offset-2"
const blogHeaderStyle = "text-5xl leading-normal font-extrabold text-gray-700"

type TechnologyCardProps = {
  name: string
  url: string
}

type BlogPostProps = {
  id: string
  title: string
}


const Posts = () => {
  const postsQuery = trpc.useQuery(['post.all'])

  return (
    <div className={queryResponseStyle}>
      {postsQuery.data
        ? <p>{JSON.stringify(postsQuery.data, null, 2)}</p>
        : <p>Loading..</p>
      }
    </div>
  )
}

const Home: NextPage = () => {
  const postsQuery = trpc.useQuery([
    'post.all'
  ])

  return (
    <>
      <Head>
        <title>A First Look at create-t3-app</title>
        <meta name="description" content="Example t3 project from A First Look at create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={appContainerStyle}>
        <h1 className={titleStyle}>
          Hello from <span className="text-purple-300">ajc</span>webdev
        </h1>

        <div className={gridStyle}>
          <TechnologyCard name="Blog" url="ajcwebdev.com/" />
          <TechnologyCard name="Twitter" url="twitter.com/ajcwebdev/" />
          <TechnologyCard name="GitHub" url="github.com/ajcwebdev/" />
          <TechnologyCard name="Polywork" url="poly.work/ajcwebdev/" />
        </div>

        <h2 className={blogHeaderStyle}>
          Posts
        </h2>

        {postsQuery.status === 'loading'}

        <DefaultQueryCell
          query={postsQuery}
          success={({ data }: any) => (
            data.map(({id, title}: BlogPostProps) => (
              <Link key={id} href={`/post/${id}`}>
                <p className={linkStyle}>{title}</p>
              </Link>
            ))
          )}
          empty={() => <p>WE NEED POSTS!!!</p>}
        />
      </main>
    </>
  )
}

const TechnologyCard = (
  { name, url }: TechnologyCardProps
) => {
  return (
    <a href={`https://${url}`} target="_blank" rel="noreferrer">
      <section className={cardSectionStyle}>
        <h2 className={cardTitleStyle}>
          {name}
        </h2>

        <span className={linkStyle}>
          {url}
        </span>
      </section>
    </a>
  )
}

export default Home