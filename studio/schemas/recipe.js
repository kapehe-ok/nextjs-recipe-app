export default {
  name: "recipe",
  title: "Recipe",
  type: "document",
  fields: [
    {
      name: "name",
      Title: "Recipe Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "chef",
      title: "Chef",
      type: "reference",
      to: { type: "chef" },
    },
    {
      name: "mainImage",
      title: "Recipe Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
    {
      name: "ingredient",
      title: "Ingredient",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              title: "Ingredient",
              name: "ingredient",
              type: "reference",
              to: [{ type: "ingredient" }],
            },
            {
              name: "wholeNumber",
              title: "Whole Numbers",
              type: "number",
            },
            {
              name: "fraction",
              title: "Fraction Amount",
              type: "string",
              options: {
                list: ["1/2", "1/3", "1/4", "3/4", "2/3"],
              },
            },
            {
              name: "unit",
              title: "Unit",
              type: "string",
              options: {
                list: ["grams", "cup", "Tbsp.", "tsp."],
              },
            },
          ],
          preview: {
            select: {
              title: "ingredient.name",
              name: "ingredient.name",
              media: "ingredient.image",
              fraction: "fraction",
              unit: "unit",
            },
            prepare({
              title,
              subtitle,
              media,
              fraction = "(No fraction set)",
              unit = "(No unit set)",
            }) {
              return {
                title,
                subtitle: `${fraction} ${unit}`,
                media,
              };
            },
          },
        },
      ],
    },
    {
      name: "instructions",
      title: "Instructions",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "likes",
      title: "Likes",
      type: "number",
    },
  ],
  initialValue: {
    likes: 0,
  },
};
