import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import type { Hobby } from '@/types'

const initialHobbies: Hobby[] = [
  {
    id: 'contablize-video',
    title: 'CONTABLIZE | Vídeo Aéreo 4K',
    description: 'Transformamos a identidade visual da Contablize em uma narrativa aérea impactante.',
    type: 'video',
    thumbnail: 'https://vumbnail.com/1149975102.jpg',
    videoUrl: 'https://vimeo.com/1149975102',
    duration: '0:15',
    tags: ['Institucional', '4K'],
    isActive: true,
    order: 1
  },
  {
    id: 'aniversario-namoro',
    title: 'Love Story Video 2025',
    description: 'Edição criativa e dinâmica para aniversário de namoro.',
    type: 'edição',
    thumbnail: 'https://vumbnail.com/1149974608.jpg',
    videoUrl: 'https://vimeo.com/1149974608',
    duration: '0:29',
    tags: ['Love', 'Couple', 'Storytelling'],
    isActive: true,
    order: 2
  },
  {
    id: 'academia-ajuste',
    title: 'ACADEMIA AJUSTE | Vídeo Aéreo 4K',
    description: 'Imagens aéreas em alta definição para academia.',
    type: 'drone',
    thumbnail: 'https://vumbnail.com/1149977427.jpg',
    videoUrl: 'https://vimeo.com/1149977427',
    duration: '0:20',
    tags: ['Fitness', '4K'],
    isActive: true,
    order: 3
  },

]

export const useHobbiesStore = defineStore('hobbies', () => {
  const hobbies = useLocalStorage<Hobby[]>('hobbies', initialHobbies)

  function syncHobbies() {
    const initialIds = new Set(initialHobbies.map(h => h.id))
    const existingIds = new Set(hobbies.value.map(h => h.id))

    // Remove hobbies que não estão mais no initialHobbies
    hobbies.value = hobbies.value.filter(h => initialIds.has(h.id))

    // Adiciona ou atualiza hobbies do initialHobbies
    initialHobbies.forEach(initialHobby => {
      if (!existingIds.has(initialHobby.id)) {
        hobbies.value.push(initialHobby)
      } else {
        const existingHobby = hobbies.value.find(h => h.id === initialHobby.id)
        if (existingHobby) {
          existingHobby.title = initialHobby.title
          existingHobby.description = initialHobby.description
          existingHobby.type = initialHobby.type
          existingHobby.thumbnail = initialHobby.thumbnail
          existingHobby.videoUrl = initialHobby.videoUrl
          existingHobby.embedUrl = initialHobby.embedUrl
          existingHobby.imageUrl = initialHobby.imageUrl
          existingHobby.externalUrl = initialHobby.externalUrl
          existingHobby.tags = initialHobby.tags
          existingHobby.date = initialHobby.date
          existingHobby.client = initialHobby.client
          existingHobby.isActive = initialHobby.isActive
          existingHobby.duration = initialHobby.duration
          existingHobby.order = initialHobby.order
        }
      }
    })
  }

  syncHobbies()

  const activeHobbies = computed(() =>
    hobbies.value
      .filter(h => h.isActive)
      .sort((a, b) => (a.order || 0) - (b.order || 0))
  )

  function setHobbies(newHobbies: Hobby[]) {
    hobbies.value = newHobbies
  }

  function addHobby(hobby: Hobby) {
    hobbies.value.push(hobby)
  }

  return {
    hobbies,
    activeHobbies,
    setHobbies,
    addHobby,
  }
})

