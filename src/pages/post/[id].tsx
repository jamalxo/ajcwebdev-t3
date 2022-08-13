import type { NextPage } from "next"
import { useRouter } from "next/router"
import Head from "next/head"
import { DefaultQueryCell } from "../../utils/DefaultQueryCell"
import { trpc } from "../../utils/trpc"

const blogContainerStyle = "container mx-auto min-h-screen p-4"
const blogTitleStyle = "text-5xl leading-normal font-extrabold text-gray-700"
const blogBodyStyle = "mb-2 text-lg text-gray-700"

const PostPage: NextPage = () => {
  const id = useRouter().query.id as string
  const postQuery = trpc.useQuery(['post.byId', { id }])

  return (
    <DefaultQueryCell
      query={postQuery}
      success={({ data }) => (
        <>
          <Head>
            <title>{data.title}</title>
            <meta name="description" content={data.description} />
          </Head>

          <main className={blogContainerStyle}>
            <h1 className={blogTitleStyle}>{data.title}</h1>
            <p className={blogBodyStyle}>{data.body}</p>
            <em>Created {data.createdAt.toLocaleDateString()}</em>
          </main>
        </>
      )}
    />
  )
}

export default PostPage