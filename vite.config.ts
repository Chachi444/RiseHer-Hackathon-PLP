import { defineConfig } from 'vite';

export default defineConfig(async () => {
	// Dynamically import the ESM-only plugin at runtime to avoid esbuild's require error.
	const reactPlugin = (await import('@vitejs/plugin-react')).default;

	return {
		// Ensure static files in /public are served as-is in production
		publicDir: 'public',

		// Set base to root (adjust if deploying to a subpath)
		base: '/',

		plugins: [
			reactPlugin()
		],
		server: {
			port: 5173
		},
		build: {
			// Avoid inlining images (so they become separate files on Vercel)
			assetsInlineLimit: 0,
			assetsDir: 'assets',
			rollupOptions: {
				output: {
					// Emit assets to assets/ with stable names (hash helps cache busting)
					assetFileNames: 'assets/[name]-[hash][extname]'
				}
			}
		}
	};
});
