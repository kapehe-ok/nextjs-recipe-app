import Head from "next/head";
import Link from "next/link";
import { sanityClient } from "../lib/client";
import imageUrlBuilder from "@sanity/image-url";

function urlFor(source) {
  return imageUrlBuilder(sanityClient).image(source);
}

export default function Home({ recipes }) {
  return (
    <div>
      <Head>
        <title>Giada's Butter Factory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Welcome to Giada's Butter Factory</h1>

      {/* show all recipes */}
      <div className="recipes-list">
        {recipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <Link href={`/recipes/${recipe.slug.current}`}>
              <a>
                <img src={urlFor(recipe.mainImage).url()} />
                <span>{recipe.name}</span>
              </a>
            </Link>
          </div>
        ))}
      </div>
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
