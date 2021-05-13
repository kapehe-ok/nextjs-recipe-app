import Head from "next/head";
import Link from "next/link";
import { sanityClient, urlFor } from "../lib/sanity";

const recipesQuery = `*[_type == "recipe" && slug.current != null]{
  _id,
  name,
  slug,
  mainImage{
    asset->{
      _id,
      url
    }
  },
}`;

export default function Home({ recipes }) {
  console.log(recipes);
  return (
    <div>
      <Head>
        <title>Kap's Kitchen 🍍</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to Kaps's Kitchen</h1>

      <ul className="recipes-list">
        {recipes.length > 0 &&
          recipes.map((recipe) => (
            <li key={recipe._id} className="recipe-card">
              <Link href={`/recipes/${recipe.slug.current}`}>
                <a>
                  <img src={urlFor(recipe.mainImage).url()} />
                  <span>{recipe.name}</span>
                </a>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
<<<<<<< HEAD
  const recipes = await sanityClient.fetch(recipesQuery);
=======
  // get props from sanity using groq
  // DO IT
  const recipes = await sanityClient.fetch(
    `*[_type == "recipe"]{
      _id,
      name,
      slug,
      mainImage
      },
    }`
  );

>>>>>>> cbc3e87a0ed45ca0ebe5ee86b0a5a2fa6ce7bd4b
  return { props: { recipes } };
}
