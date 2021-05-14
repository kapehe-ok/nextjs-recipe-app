import { useState } from "react";
import {
  sanityClient,
  urlFor,
  usePreviewSubscription,
  PortableText,
} from "../../lib/sanity";

const recipeQuery = `*[_type == "recipe" && slug.current == $slug][0]{
      _id,
      name,
      slug,
      mainImage,
      ingredient[]{
        _key,
        unit,
        wholeNumber,
        fraction,
        ingredient->{
          name
        }
      },
      instructions,
      likes
    }`;

export default function OneRecipe({ data, preview }) {
  if (!data) return <div>Loading...</div>;

  /**
   * This is the real-time preview functionality.
   * It takes the same GROQ query we use to fetch the data,
   * and then an object that takes parameters, in this case the slug from the document,
   * and the initial data which is the data we're fetching in getStaticProps,
   * we also pass the preview variable to enable preview, more on that below
   */
  const { data: recipe } = usePreviewSubscription(recipeQuery, {
    params: { slug: data.recipe?.slug.current },
    initialData: data,
    enabled: preview,
  });

  // we initialize the likes state with the number of likes in the fetched document
  // do the conditional chaining just in case there's no data
  const [likes, setLikes] = useState(data?.recipe?.likes);

  // whenever we push the button, we do a request to a serverless function/API-route
  const addLike = async () => {
    const res = await fetch("/api/handle-like", {
      method: "POST",
      body: JSON.stringify({ _id: recipe._id }),
    }).catch((error) => console.log(error));

    const data = await res.json();

    setLikes(data.likes);
  };

  return (
    <article className="recipe">
      <h1>{recipe.name}</h1>

      {/* likes */}
      <button className="like-button" onClick={addLike}>
        {likes}{" "}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>

      {/* the content for the recipe */}
      <main className="content">
        <img src={urlFor(recipe?.mainImage).url()} />

        <div className="breakdown">
          <ul className="ingredients">
            {recipe.ingredient?.map((ingredient) => (
              <li key={ingredient._key} className="ingredient">
                {ingredient?.wholeNumber}
                {ingredient?.fraction} {ingredient?.unit}
                <br />
                {ingredient?.ingredient?.name}
              </li>
            ))}
          </ul>
          <PortableText
            className="instructions"
            blocks={recipe?.instructions}
          />
        </div>
      </main>
    </article>
  );
}

// STEP 1: tell next.js how many recipe pages it needs to make
export async function getStaticPaths() {
  // go get all recipes
  const paths = await sanityClient.fetch(
    `*[_type == "recipe" && defined(slug.current)]{
      "params": {
        "slug": slug.current
      }
    }`
  );

  return {
    paths,
    // set to true if you want incremental static regeneration
    // goes to check sanity for the content every page load
    // if content is changed/new, then next.js gives user the new version
    // if content is the same, next.js gives user the cached static HTML version
    fallback: true,
  };
}

// STEP 2: tell next.js how to get data for each individual recipe
export async function getStaticProps({ params }) {
  const { slug } = params;

  // go get the recipe data from sanity using groq
  // const recipe = sanity groq query using params.slug
  const recipe = await sanityClient.fetch(recipeQuery, { slug });

  // we just pass
  return { props: { data: { recipe }, preview: true } };
}
