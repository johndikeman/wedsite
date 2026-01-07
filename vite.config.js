import { sveltekit } from "@sveltejs/kit/vite"
import { enhancedImages } from "@sveltejs/enhanced-img"

/** @type {import('vite').UserConfig} */
export default {
  plugins: [enhancedImages(), sveltekit()],
}
