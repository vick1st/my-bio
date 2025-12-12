import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Project } from '@/types'

const initialProjects: Project[] = [
  {
    id: 'chic-decorados',
    title: 'Chic Decorados',
    description: 'Landing page para Chic Decorados, empresa de decoração artesanal para eventos, casamento e festas. Foquei em um design limpo e moderno para destacar o trabalho feito por eles.',
    image: '',
    url: 'https://www.chicdecorados.com.br/',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    githubUrl: '',
    isActive: true,
  },
  {
    id: 'duo-finance',
    title: 'Duo Finance',
    description: 'Plataforma de gestão financeira para casais com foco em transparência. Beta disponível para testes. Atualizações frequentes.',
    image: '',
    url: 'https://two-finance.vercel.app',
    technologies: ['Nuxt.js', 'TypeScript', 'Tailwind CSS', 'Java', 'Vite', 'Docker'],
    githubUrl: '',
    isActive: true,
  },
  {
    id: 'everton-motoboy',
    title: 'Everton Motoboy - Landing Page',
    description: 'Landing page profissional para serviços de motoboy em Curitiba. Site responsivo com formulário de contato, área de cobertura e informações de serviços.',
    image: '',
    url: 'https://everton-motoboy.com.br/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
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

