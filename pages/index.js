import Head from 'next/head'
import Link from 'next/link'
import { sanityClient } from '../lib/client'

import styles from '../styles/Home.module.css'

export default function Home({ recipes }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Giada's Butter Factory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Giada's Butter Factory</h1>

        {/* show all recipes */}
        <div className="recipe-card">
          {recipes.map(recipe => (
            <Link href={`/recipes/${recipe?.slug?.current}`} key={recipe?._id}>
              <a>{recipe?.name}</a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

export async function getStaticProps() {
  // get props from sanity using groq
  // DO IT
  const recipes = await sanityClient.fetch(
    `*[_type == "recipe"]{
      _id,
      name,
      slug
    }`
  )

  return { props: { recipes } }
}
