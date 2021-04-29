import { useState } from "react";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "../../lib/client";

function urlFor(source) {
  return imageUrlBuilder(sanityClient).image(source);
}

export default function OneRecipe({ recipe }) {
  const [likes, setLikes] = useState(recipe.likes);

  const addLike = async () => {
    const { likes: newLikes } = await sanityClient
      .fetch("/api/handle-like", {
        method: "POST",
        body: JSON.stringify({ _id: recipe._id }),
      })
      .then((response) => response.json());

    setLikes(newLikes);
  };

  return (
    <div className="recipe">
      <h1>{recipe.name}</h1>

      {/* likes */}
      <button className="like-button" onClick={addLike}>
        {recipe.likes}{" "}
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
      <div className="content">
        <img src={urlFor(recipe.mainImage).url()} />

        <div className="breakdown">
          <div className="ingredients">{recipe.ingredients}</div>

          <div className="instructions">
            <BlockContent
              blocks={recipe.instructions}
              projectId={sanityClient.clientConfig.projectId}
              dataset={sanityClient.clientConfig.dataset}
            />
          </div>
        </div>
      </div>
    </div>
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
    // paths: [
    //   { params: { slug: 'first-recipe' }},
    //   { params: { slug: 'first-recipe' }},
    //   { params: { slug: 'first-recipe' }},
    //   { params: { slug: 'first-recipe' }},
    //   { params: { slug: 'first-recipe' }},
    // ],
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
  const recipe = await sanityClient.fetch(
    `*[_type == "recipe" && slug.current == $slug][0]{
      name,
      slug,
      mainImage{
        asset->{
          _id,
          url
        }
      },
      ingredient,
      instructions,
      likes
    }`,
    { slug }
  );

  return { props: { recipe } };
}
