import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import path from "path";
import { defineConfig } from "vite";
import devServer, { defaultOptions } from '@hono/vite-dev-server';

installGlobals();

export default defineConfig({
	plugins: [
		remix(),
		devServer({
			entry: 'server.dev.ts',
			exclude: [...defaultOptions.exclude, '/assets/**', '/app/**'],
			injectClientScript: false,
		})
	],
	resolve: {
		alias: {
			"~": path.resolve(__dirname, "./app"),
		},
	},
});
