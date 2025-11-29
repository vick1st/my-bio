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
}
