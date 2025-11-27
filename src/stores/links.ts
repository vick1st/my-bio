import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Link, Profile, Embed } from '@/types'

const initialLinks: Link[] = [
  {
    id: 'github',
    title: 'Github',
    url: 'https://github.com/vick1st',
    icon: '',
    clicks: 0,
    isActive: true,
  },
  {
    id: 'youtube',
    title: 'Youtube',
    url: 'https://www.youtube.com/@vick1st',
    icon: '',
    clicks: 0,
    isActive: true,
  },
]

const initialProfile: Profile = {
  name: '@vick1st',
  bio: 'Se chegou até aqui, já é curioso - então completa a missão e confere meus links.',
  avatar: '/perfil.jpeg',
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/', icon: 'instagram' },
    { platform: 'twitter', url: 'https://twitter.com/', icon: 'twitter' },
  ],
}

const initialEmbeds: Embed[] = [
  {
    id: 'spotify-playlist',
    src: 'https://open.spotify.com/embed/playlist/2t2ijFzSSxphZMYES6BKVB?utm_source=generator&theme=0',
    title: 'Spotify Playlist',
    height: 352,
    isActive: true,
  },
]

export const useLinksStore = defineStore('links', () => {
  const persisted = useLocalStorage<Link[]>('links', initialLinks)
  const profile = useLocalStorage<Profile>('profile', initialProfile)
  const embeds = useLocalStorage<Embed[]>('embeds', initialEmbeds)

  function incrementClick(id: string) {
    const idx = persisted.value.findIndex((l) => l.id === id)
    if (idx !== -1) persisted.value[idx].clicks += 1
  }

  function setLinks(links: Link[]) {
    persisted.value = links
  }

  function setProfile(p: Profile) {
    profile.value = p
  }

  function addLink(l: Link) {
    persisted.value.push(l)
  }

  function addEmbed(e: Embed) {
    embeds.value.push(e)
  }

  function setEmbeds(list: Embed[]) {
    embeds.value = list
  }

  return {
    links: persisted,
    profile,
    embeds,
    incrementClick,
    setLinks,
    setProfile,
    addLink,
    addEmbed,
    setEmbeds,
  }
})
