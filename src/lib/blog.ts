import type { ComponentType } from 'react'

export type BlogMeta = {
  title: string
  date: string
  tags?: Array<string>
  slug?: string
}

export type BlogPost = BlogMeta & {
  slug: string
  tags: Array<string>
  component: ComponentType
}

type BlogMdxModule = {
  default: ComponentType
  meta?: BlogMeta
}

const blogModules = import.meta.glob<BlogMdxModule>(
  '../content/blog/*.mdx',
  { eager: true }
)

const normalizeSlug = (path: string, meta?: BlogMeta) => {
  const fileSlug = path.split('/').pop()?.replace('.mdx', '') ?? 'post'
  return meta?.slug?.trim() || fileSlug
}

const getPostList = () =>
  Object.entries(blogModules).map(([path, module]) => {
    const meta = module.meta
    return {
      title: meta?.title ?? 'Untitled post',
      date: meta?.date ?? '',
      tags: meta?.tags ?? [],
      slug: normalizeSlug(path, meta),
      component: module.default,
    }
  })

export const getAllPosts = (): Array<BlogPost> =>
  getPostList().sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  )

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  getPostList().find((post) => post.slug === slug)

export const getAllTags = (posts: Array<BlogPost>): Array<string> => {
  const unique = new Set<string>()
  posts.forEach((post) => {
    post.tags.forEach((tag) => unique.add(tag))
  })
  return [...unique].sort((a, b) => a.localeCompare(b))
}
