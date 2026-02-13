import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import viteReact from '@vitejs/plugin-react'
import mdx from '@mdx-js/rollup'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import type { Plugin } from 'vite'

const mdxPlugin = mdx({ providerImportSource: '@mdx-js/react' }) as Plugin
mdxPlugin.enforce = 'pre'

export default defineConfig({
  plugins: [
    mdxPlugin,
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
      routeFileIgnorePattern: 'blog\\.tsx',
    }),
    viteReact({ include: [/\.[jt]sx?$/, /\.mdx$/] }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
