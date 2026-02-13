export type Project = {
  title: string
  description: string
  status: 'active' | 'shipped' | 'planned'
  image: string
  link?: string
}

const projects: Array<Project> = [
  {
    title: 'Chaya',
    description:
      'Automating inventory management and ordering for restaurants.',
    status: 'active',
    image: '/projects/chaya.png',
    link: 'https://chayainv.com',
  },
  {
    title: 'Vita3K',
    description: 'Vita3K is a PlayStation Vita emulator written in C++',
    status: 'active',
    image: '/projects/Vita3K.png',
    link: 'https://vita3k.org/',
  },
]

export const getAllProjects = (): Array<Project> => projects
