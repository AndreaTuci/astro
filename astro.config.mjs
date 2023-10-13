import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import react from "@astrojs/react";
import storyblok from "@storyblok/astro";
import { loadEnv } from "vite";
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

// Since the Astro config file does not normally support environment
// https://vitejs.dev/guide/env-and-mode.html#env-files


// Using loadEnv to load the environment variables from the .env file
const env = loadEnv("", process.cwd(), "STORYBLOK");

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue(),
    react(),
    storyblok({
      accessToken: env.STORYBLOK_TOKEN,
      components: {
        blogPost: "storyblok/BlogPost",
        blogPostList: "storyblok/BlogPostList",
        page: "storyblok/Page",
      },
      apiOptions: {
        region: "eu",
      },
    }),
    tailwind(),
  ],
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
});
