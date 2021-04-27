import { sanityClient } from '../../lib/client'

export default function OneRecipe({ recipe }) {
  return (
    <React.Fragment>
      <h1>This is my first recipe! And it's yummy!</h1>
      <h2>{recipe?.name}</h2>
      {/* <img src={recipe.image} /> */}

      {/* probably need to map over ingredients since it will be an array */}
      {/* <div>{recipe.ingredients}</div> */}
    </React.Fragment>
  )
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
  )

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
    fallback: true
  }
}

// STEP 2: tell next.js how to get data for each individual recipe
export async function getStaticProps({ params }) {
  const { slug } = params
  // go get the recipe data from sanity using groq
  // const recipe = sanity groq query using params.slug
  const recipe = await sanityClient.fetch(
    `*[_type == "recipe" && slug.current == $slug][0]{
      name,
      slug
    }`,
    { slug }
  )

  return { props: { recipe } }
}
