export interface FriendLink {
  name: string
  description: string
  url: string
  avatar?: string
  tags?: string[]
}

export const friendsData: FriendLink[] = [
  {
    name: 'Astro',
    description: 'The modern web framework for content-focused websites',
    url: 'https://astro.build',
    avatar: 'https://astro.build/assets/astro.svg',
    tags: ['Framework', 'Static Site'],
  },
  {
    name: 'UnoCSS',
    description: 'The instant on-demand atomic CSS engine',
    url: 'https://unocss.dev',
    avatar: 'https://unocss.dev/logo.svg',
    tags: ['CSS', 'Atomic'],
  },
  {
    name: 'TypeScript',
    description: 'JavaScript with syntax for types',
    url: 'https://www.typescriptlang.org',
    avatar: 'https://www.typescriptlang.org/favicon-32x32.png',
    tags: ['Language', 'Types'],
  },
]
