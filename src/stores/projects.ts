import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'
import type { Project } from '@/types'

const initialProjects: Project[] = [
  {
    id: 'chic-decorados',
    title: 'Chic Decorados',
    description: '',
    image: '',
    url: 'https://www.chicdecorados.com.br/',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS'],
    githubUrl: '',
    isActive: true,
    status: 'Em produção',
    scope: 'Frontend',
    responsibility: ['Desenvolvimento', 'Design', 'Deploy'],
    result: 'Landing page em produção | 3+ meses no ar',
  },
  {
    id: 'duo-finance',
    title: 'Duo Finance',
    description: '',
    image: '',
    url: 'https://two-finance.vercel.app',
    technologies: ['Nuxt.js', 'TypeScript', 'Tailwind CSS', 'Java', 'Vite', 'Docker'],
    githubUrl: '',
    isActive: true,
    status: 'Beta',
    scope: 'Fullstack',
    responsibility: ['Arquitetura', 'Frontend', 'Backend', 'Deploy'],
    result: 'Sistema escalável com arquitetura preparada para múltiplos usuários simultâneos',
  },
  {
    id: 'everton-motoboy',
    title: 'Everton Motoboy - Landing Page',
    description: '',
    image: '',
    url: 'https://everton-motoboy.com.br/',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    githubUrl: '',
    isActive: true,
    status: 'Em produção',
    scope: 'Frontend',
    responsibility: ['Desenvolvimento', 'Design', 'Deploy'],
    result: 'Site responsivo em produção | Formulário de contato funcional',
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
          existingProject.status = initialProject.status
          existingProject.scope = initialProject.scope
          existingProject.responsibility = initialProject.responsibility
          existingProject.result = initialProject.result
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

