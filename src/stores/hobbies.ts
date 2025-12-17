import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import { computed } from 'vue'
import type { Hobby } from '@/types'

const initialHobbies: Hobby[] = []

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

