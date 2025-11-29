import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Project } from '@/types'

const initialProjects: Project[] = [
  
  {
    id: 'everton-motoboy',
    title: 'Everton Motoboy - Landing Page',
    description: 'Landing page profissional para serviços de motoboy em Curitiba. Site responsivo com formulário de contato, área de cobertura e informações de serviços.',
    image: '',
    url: 'https://everton-motoboy.com.br/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: '',
    isActive: true,
  },
  {
    id: 'duo-finance',
    title: 'Duo Finance',
    description: 'Aplicação financeira para gerenciamento de despesas e receitas de casais. Esta em fase de desenvolvimento.',
    image: '',
    url: 'https://two-finance.vercel.app',
    technologies: ['Nuxt.js', 'TypeScript', 'Tailwind CSS', 'Java', 'Vite', 'Docker'],
    githubUrl: '',
    isActive: true,
  }
]

export const useProjectsStore = defineStore('projects', () => {
  const projects = useLocalStorage<Project[]>('projects', initialProjects)

  function syncProjects() {
    const initialIds = new Set(initialProjects.map(p => p.id))
    const existingIds = new Set(projects.value.map(p => p.id))
    
    // Remove projetos que não estão mais no initialProjects ou estão vazios
    projects.value = projects.value.filter(p => {
      return initialIds.has(p.id) && p.title && p.description
    })
    
    // Adiciona ou atualiza projetos do initialProjects
    initialProjects.forEach(initialProject => {
      if (!existingIds.has(initialProject.id)) {
        projects.value.push(initialProject)
      } else {
        const existingProject = projects.value.find(p => p.id === initialProject.id)
        if (existingProject) {
          existingProject.title = initialProject.title
          existingProject.description = initialProject.description
          existingProject.image = initialProject.image
          existingProject.url = initialProject.url
          existingProject.technologies = initialProject.technologies
          existingProject.githubUrl = initialProject.githubUrl
          existingProject.isActive = initialProject.isActive
        }
      }
    })
  }

  syncProjects()

  function setProjects(newProjects: Project[]) {
    projects.value = newProjects
  }

  function addProject(project: Project) {
    projects.value.push(project)
  }

  return {
    projects,
    setProjects,
    addProject,
  }
})

