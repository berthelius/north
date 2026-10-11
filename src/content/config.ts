import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const examples = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/examples" }),
  schema: z.object({
    title: z.string(),
    domain: z.enum([
      "open-convention",
      "saas-b2b",
      "oss-library",
      "agency",
      "side-project",
      "internal-tool",
    ]),
    // "real" = a NORTH.md in use, reproduced verbatim.
    // "illustrative" = a composite of a fictional organisation.
    kind: z.enum(["real", "illustrative"]),
    subtitle: z.string(),
    description: z.string(),
    whyItWorks: z.string(),
    order: z.number(),
  }),
});

export const collections = { examples };
