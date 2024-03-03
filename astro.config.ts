import { defineConfig } from 'astro/config';

import react from "@astrojs/react";
import compress from "astro-compress"
import { VitePWA } from "vite-plugin-pwa"

import { manifest, seoConfig } from "./utils/seoConfig"

export default defineConfig({
	site: seoConfig.baseURL,
	integrations: [
		react(),
		compress()
	],
	vite: {
		plugins: [
			VitePWA({
				registerType: "autoUpdate",
				manifest,
				workbox: {
				  globDirectory: 'dist',
				  globPatterns: [
				    '**/*.{js,css,svg,png,jpg,jpeg,gif,webp,woff,woff2,ttf,eot,ico}',
				  ],
				  // Don't fallback on document based (e.g. `/some-page`) requests
				  // This removes an errant console.log message from showing up.
				  navigateFallback: null,
				},
			})
		]
	}
})