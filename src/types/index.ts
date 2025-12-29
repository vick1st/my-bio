export interface Link {
  id: string
  title: string
  url: string
  icon?: string
  clicks: number
  isActive: boolean
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface Profile {
  name: string
  bio: string
  avatar: string
  socialLinks: SocialLink[]
}

export interface Embed {
  id: string
  src: string
  title?: string
  height?: number
  isActive: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  image?: string
  url?: string
  technologies: string[]
  githubUrl?: string
  isActive: boolean
  status?: 'Em produção' | 'Beta' | 'Desenvolvimento' | 'Concluído'
  scope?: string
  responsibility?: string[]
  result?: string
}

export interface Hobby {
  id: string
  title: string
  description?: string
  type: 'video' | 'edição' | 'drone' | 'freela' | 'imagem' | 'outro'
  thumbnail?: string
  videoUrl?: string
  embedUrl?: string
  imageUrl?: string
  externalUrl?: string
  tags?: string[]
  date?: string
  client?: string
  isActive: boolean
  order?: number
  duration?: string
}
