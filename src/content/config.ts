import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const examples = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/examples" }),
  schema: z.object({
    title: z.string(),
    domain: z.enum([
      "saas-b2b",
      "oss-library",
      "agency",
      "side-project",
      "internal-tool",
    ]),
    subtitle: z.string(),
    description: z.string(),
    whyItWorks: z.string(),
    order: z.number(),
  }),
});

export const collections = { examples };
