import Head from "next/head";
import Link from "next/link";
import { sanityClient } from "../lib/sanity";
import imageUrlBuilder from "@sanity/image-url";

function urlFor(source) {
  return imageUrlBuilder(sanityClient).image(source);
}

export default function Home({ recipes }) {
  return (
    <div>
      <Head>
        <title>Kap's Kitchen 🍍</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to Kaps's Kitchen</h1>

      {/* show all recipes */}
      <ul className="recipes-list">
        {recipes.map((recipe) => (
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
  // get props from sanity using groq
  // DO IT
  const recipes = await sanityClient.fetch(
    `*[_type == "recipe"]{
      _id,
      name,
      slug,
      mainImage{
        asset->{
          _id,
          url
        }
      },
    }`
  );

  return { props: { recipes } };
}
