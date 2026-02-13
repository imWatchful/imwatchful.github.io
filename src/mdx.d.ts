import type { ComponentType } from 'react'

declare module '*.mdx' {
  export const meta: {
    title: string
    date: string
    excerpt?: string
    tags?: string[]
    slug?: string
  }
  const MDXComponent: ComponentType
  export default MDXComponent
}
