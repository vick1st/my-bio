import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Link, Profile, Embed } from '@/types'

const initialLinks: Link[] = [
  {
    id: 'portfolio',
    title: 'Portfólio Dev',
    url: '/portfolio',
    icon: '',
    lucideIcon: 'code-xml',
    clicks: 0,
    isActive: true,
  },
]

const initialProfile: Profile = {
  name: '@vick1st',
  bio: 'Desenvolvedor de Sistemas e Entusiasta de Audiovisual • Web & Software, foco em solução.',
  avatar: '/perfil.jpeg',
  socialLinks: [
    { platform: 'instagram', url: 'https://instagram.com/', icon: 'instagram' },
    { platform: 'twitter', url: 'https://twitter.com/', icon: 'twitter' },
    { platform: 'duofinance', url: 'https://two-finance.vercel.app/', icon: 'duofinance' },
  ],
}

const initialEmbeds: Embed[] = []

export const useLinksStore = defineStore('links', () => {
  const links = useLocalStorage<Link[]>('links', initialLinks)
  const profile = useLocalStorage<Profile>('profile', initialProfile)
  const embeds = useLocalStorage<Embed[]>('embeds', initialEmbeds)

  // Sincronizar novos links do initialLinks com o localStorage
  function syncLinks() {
    const initialIds = new Set(initialLinks.map(l => l.id))
    const existingIds = new Set(links.value.map(l => l.id))

    // Remove links que não estão mais no initialLinks
    links.value = links.value.filter(l => initialIds.has(l.id))

    // Adicionar novos links que não existem no localStorage
    initialLinks.forEach(initialLink => {
      if (!existingIds.has(initialLink.id)) {
        links.value.push(initialLink)
      } else {
        // Atualizar links existentes mantendo os cliques
        const existingLink = links.value.find(l => l.id === initialLink.id)
        if (existingLink) {
          // Preserva cliques e atualiza outros campos
          existingLink.title = initialLink.title
          existingLink.url = initialLink.url
          existingLink.icon = initialLink.icon
          existingLink.lucideIcon = initialLink.lucideIcon
          existingLink.isActive = initialLink.isActive
        }
      }
    })
  }

  // Sincronizar profile do initialProfile com o localStorage
  function syncProfile() {
    // Atualizar campos do profile mantendo dados existentes se necessário
    profile.value.name = initialProfile.name
    profile.value.bio = initialProfile.bio
    profile.value.avatar = initialProfile.avatar
    profile.value.socialLinks = initialProfile.socialLinks
  }

  // Sincronizar embeds do initialEmbeds com o localStorage
  function syncEmbeds() {
    const existingIds = new Set(embeds.value.map(e => e.id))

    initialEmbeds.forEach(initialEmbed => {
      if (!existingIds.has(initialEmbed.id)) {
        embeds.value.push(initialEmbed)
      } else {
        const existingEmbed = embeds.value.find(e => e.id === initialEmbed.id)
        if (existingEmbed) {
          existingEmbed.src = initialEmbed.src
          existingEmbed.title = initialEmbed.title
          existingEmbed.height = initialEmbed.height
          existingEmbed.isActive = initialEmbed.isActive
        }
      }
    })
  }

  // Executar sincronização na inicialização
  syncLinks()
  syncProfile()
  syncEmbeds()

  function incrementClick(id: string) {
    const idx = links.value.findIndex((l) => l.id === id)
    if (idx !== -1) {
      links.value[idx].clicks += 1
    }
  }

  function setLinks(newLinks: Link[]) {
    links.value = newLinks
  }

  function setProfile(newProfile: Profile) {
    profile.value = newProfile
  }

  function addLink(link: Link) {
    links.value.push(link)
  }

  function addEmbed(embed: Embed) {
    embeds.value.push(embed)
  }

  function setEmbeds(newEmbeds: Embed[]) {
    embeds.value = newEmbeds
  }

  return {
    links,
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
