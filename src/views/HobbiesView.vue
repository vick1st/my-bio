<template>
  <div class="hobbies-view bg-black min-h-screen text-white overflow-x-hidden">
    <!-- Navbar simples (ou usar a do layout principal) -->
    <!-- Aqui assumimos que já existe uma nav ou botão voltar global, mas vamos adicionar um específico se precisar -->
    <div class="fixed top-4 left-4 z-50">
      <router-link
        to="/bio"
        class="inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full text-sm font-medium hover:bg-white/10 transition-all border border-white/10"
      >
        <ArrowLeftIcon class="w-4 h-4" />
        <span>Voltar</span>
      </router-link>
    </div>

    <!-- 1. Hero Section -->
    <header class="relative w-full h-screen min-h-[600px] flex flex-col items-center justify-center px-4 overflow-hidden border-b border-zinc-800">
      <!-- Background Video / Gradient -->
      <div class="absolute inset-0 z-0 bg-zinc-900">
          <!-- Placeholder para Video Background (ex: mp4 loop) -->
          <!-- Se não houver video, usar gradiente sofisticado -->
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-900 to-black opacity-80"></div>
          <!-- Grid Pattern Overlay -->
          <div class="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      <div class="relative z-10 text-center max-w-4xl mx-auto flex flex-col items-center gap-6 animate-fade-in-up">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs tracking-widest uppercase mb-4 text-zinc-400">
          <ClapperboardIcon class="w-3 h-3" />
          <span>Cinematography & Editing</span>
        </div>

        <h1 class="text-5xl lg:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
          AUDIOVISUAL <br/> & DRONE FOOTAGE
        </h1>
        
        <p class="text-xl text-zinc-400 max-w-2xl font-light">
          Transformando perspectivas em narrativas visuais impactantes.
        </p>

        <div class="flex flex-col sm:flex-row items-center gap-4 mt-8">
           <button 
             @click="scrollToProjects"
             class="group px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-zinc-200 transition-all flex items-center gap-2"
            >
             <PlayIcon class="w-5 h-5 fill-current" />
             <span>Ver Projetos</span>
           </button>
           
           <a 
             href="https://wa.me/5541988232894"
             target="_blank"
             class="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-medium text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
           >
             Solicitar Orçamento
           </a>
        </div>
      </div>

      <!-- Showreel Embed Container (Floating) -->
      <div class="relative z-10 w-full max-w-5xl mt-16 lg:mt-24 p-2 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl animate-fade-in-delayed">
        <div class="aspect-video w-full rounded-xl overflow-hidden bg-black relative group cursor-pointer">
            <!-- Placeholder Youtube Embed (Showreel) -->
            <iframe 
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                src="https://player.vimeo.com/video/1149974608?autoplay=1&loop=1&muted=1&badge=0&autopause=0&player_id=0&app_id=58479&controls=0" 
                title="Showreel" 
                frameborder="0" 
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
            ></iframe>
           
            <!-- Overlay Info (some when paused/hover, but for autoplay mute loop keeping it clean) -->
            <div class="absolute bottom-4 left-4 flex gap-2">
                <span class="px-2 py-1 bg-black/60 backdrop-blur rounded text-xs">Showreel 2025</span>
                <span class="px-2 py-1 bg-black/60 backdrop-blur rounded text-xs flex items-center gap-1"><VolumeXIcon class="w-3 h-3"/> Muted</span>
            </div>
        </div>
      </div>

       <!-- Scroll Indicator -->
       <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
         <ArrowDownIcon class="w-6 h-6 text-white" />
       </div>
    </header>
    
    <!-- 2. Projects Grid Section -->
    <section id="projects" class="py-24 px-4 lg:px-12 max-w-7xl mx-auto">
        <div class="flex flex-col items-center mb-16">
            <h2 class="text-3xl font-bold mb-4 flex items-center gap-3">
                <StarIcon class="w-8 h-8 text-yellow-500 fill-yellow-500" />
                <span class="tracking-widest uppercase">Projetos em Destaque</span>
            </h2>
            <div class="h-1 w-24 bg-gradient-to-r from-transparent via-zinc-500 to-transparent"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
                v-for="hobby in activeHobbies" 
                :key="hobby.id"
                @click="openModal(hobby.videoUrl)"
                class="group flex flex-col gap-4 cursor-pointer"
            >
                <!-- Thumbnail Container -->
                <div class="relative aspect-[16/9] bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800 group-hover:border-zinc-600 transition-colors">
                    <img 
                        :src="hobby.thumbnail || 'https://placehold.co/600x400/222222/666666?text=No+Image'" 
                        :alt="hobby.title"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    
                    <!-- Duration Badge -->
                    <div class="absolute bottom-3 right-3 px-2 py-1 bg-black/80 backdrop-blur-sm rounded text-xs font-mono flex items-center gap-1">
                        <PlayIcon class="w-3 h-3 fill-white" />
                        {{ hobby.duration || '0:00' }}
                    </div>

                    <!-- Overlay Play Button -->
                    <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                        <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50">
                             <PlayIcon class="w-5 h-5 fill-white ml-0.5" />
                        </div>
                    </div>
                </div>

                <!-- Info -->
                <div>
                    <h3 class="text-xl font-bold text-white group-hover:text-blue-400 transition-colors mb-1 truncate">{{ hobby.title }}</h3>
                    <p class="text-zinc-400 text-sm mb-3 line-clamp-2 h-10">{{ hobby.description }}</p>
                    
                    <div class="flex flex-wrap gap-2">
                        <span 
                            class="text-[10px] uppercase tracking-wider px-2 py-1 border border-zinc-700 rounded text-zinc-400 group-hover:border-zinc-500 transition-colors"
                        >
                            {{ hobby.type }}
                        </span>
                        <span 
                            v-for="tag in hobby.tags?.slice(0, 2)" 
                            :key="tag"
                            class="text-[10px] uppercase tracking-wider px-2 py-1 bg-zinc-900 rounded text-zinc-500"
                        >
                            {{ tag }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-16 flex justify-center">
            <button class="px-6 py-2 border border-zinc-700 hover:border-zinc-500 text-zinc-400 hover:text-white rounded-full transition-colors uppercase text-sm tracking-widest">
                Carregar Mais Projetos
            </button>
        </div>
    </section>

    <!-- 3. Services Section -->
    <section class="py-24 bg-zinc-900 border-y border-zinc-800">
        <div class="max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <h2 class="text-3xl font-bold mb-16 tracking-widest uppercase text-zinc-200 flex items-center justify-center gap-3">
                <ClapperboardIcon class="w-8 h-8" />
                <span>Serviços</span>
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
                <!-- Service 1 -->
                <div class="flex flex-col items-center gap-4 group">
                    <div class="w-20 h-20 rounded-2xl bg-zinc-800 flex items-center justify-center mb-2 group-hover:bg-blue-500/20 group-hover:scale-110 transition-all duration-300">
                        <HexagonIcon class="w-10 h-10 text-zinc-400 group-hover:text-blue-400" />
                    </div>
                    <h3 class="text-xl font-bold">Filmagens com Drone</h3>
                    <p class="text-zinc-400 leading-relaxed max-w-xs">
                        Capturas aéreas em 4K/60fps. <br/>
                        Takes cinematográficos para imobiliárias, turismo e eventos ao ar livre.
                    </p>
                </div>

                <!-- Service 2 -->
                <div class="flex flex-col items-center gap-4 group">
                    <div class="w-20 h-20 rounded-2xl bg-zinc-800 flex items-center justify-center mb-2 group-hover:bg-purple-500/20 group-hover:scale-110 transition-all duration-300">
                         <SmartphoneIcon class="w-10 h-10 text-zinc-400 group-hover:text-purple-400" />
                    </div>
                    <h3 class="text-xl font-bold">Reels Promocionais</h3>
                    <p class="text-zinc-400 leading-relaxed max-w-xs">
                        Vídeos verticais dinâmicos para Instagram e TikTok. <br/>
                        Edição ágil (15-60s) focada em retenção e engajamento.
                    </p>
                </div>

                <!-- Service 3 -->
                <div class="flex flex-col items-center gap-4 group">
                    <div class="w-20 h-20 rounded-2xl bg-zinc-800 flex items-center justify-center mb-2 group-hover:bg-green-500/20 group-hover:scale-110 transition-all duration-300">
                        <ClapperboardIcon class="w-10 h-10 text-zinc-400 group-hover:text-green-400" />
                    </div>
                    <h3 class="text-xl font-bold">Institucional & Eventos</h3>
                    <p class="text-zinc-400 leading-relaxed max-w-xs">
                        Cobertura completa de eventos corporativos e sociais. <br/>
                        Vídeos institucionais que contam a história da sua marca.
                    </p>
                </div>
            </div>

             <div class="mt-16">
                 <a 
                 href="https://wa.me/5541988232894"
                 target="_blank"
                 class="inline-block px-8 py-3 bg-white text-black font-bold rounded hover:bg-zinc-200 transition-colors"
                 >
                    SOLICITAR ORÇAMENTO
                 </a>
             </div>
        </div>
    </section>

    <!-- 4. Equipment Section -->
    <section class="py-24 max-w-4xl mx-auto px-4 text-center">
         <h2 class="text-3xl font-bold mb-16 flex items-center justify-center gap-3 text-zinc-300">
            <WrenchIcon class="w-8 h-8" />
            <span class="uppercase tracking-widest">Equipamentos & Setup</span>
         </h2>

         <div class="flex flex-wrap justify-center gap-6 text-left">
            <div 
                v-for="item in equipment"
                :key="item.value"
                class="min-w-[250px] flex-1 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl hover:border-zinc-700 transition-colors"
            >
                <span class="block text-xs uppercase text-zinc-500 mb-1">{{ item.label }}</span>
                <span class="font-bold text-lg">{{ item.value }}</span>
            </div>
         </div>
    </section>

    <!-- 5. Footer / CTA -->
    <footer class="py-24 border-t border-zinc-800 bg-zinc-950 text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-8">Vamos conversar?</h2>
        <div class="flex flex-wrap justify-center gap-4">
             <a 
             href="https://wa.me/5541988232894"
             target="_blank"
             class="px-6 py-3 bg-[#25D366] text-white rounded-lg flex items-center gap-2 hover:brightness-110 transition-all font-bold"
             >
                <MessageCircleIcon class="w-5 h-5"/>
                WhatsApp
             </a>
             <a 
             href="mailto:contato@vick1st.com"
             class="px-6 py-3 bg-zinc-800 text-white rounded-lg flex items-center gap-2 hover:bg-zinc-700 transition-all font-bold"
             >
                <MailIcon class="w-5 h-5"/>
                Email
             </a>
             <a 
             href="https://instagram.com/vick1st"
             target="_blank"
             class="px-6 py-3 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-500 text-white rounded-lg flex items-center gap-2 hover:brightness-110 transition-all font-bold"
             >
                <InstagramIcon class="w-5 h-5"/>
                Instagram
             </a>
        </div>
        <div class="mt-12 text-zinc-600 text-sm">
            &copy; {{ new Date().getFullYear() }} Vick1st. Todos os direitos reservados.
        </div>
    </footer>

    <!-- Video Modal -->
    <Transition name="modal">
      <div v-if="selectedVideo" class="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" @click.self="closeModal">
        <div class="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl animate-scale-in">
          <button 
            @click="closeModal"
            class="absolute top-4 right-4 z-50 p-2 bg-black/50 text-white rounded-full hover:bg-white/20 transition-colors"
          >
            <XIcon class="w-6 h-6" />
          </button>
          
          <iframe 
            v-if="getVideoEmbedUrl(selectedVideo)"
            :src="getVideoEmbedUrl(selectedVideo)" 
            class="w-full h-full"
            frameborder="0" 
            allow="autoplay; fullscreen; picture-in-picture" 
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useHobbiesStore } from '@/stores/hobbiesAudiovisual'
import { ref } from 'vue'
import { 
    ArrowLeft as ArrowLeftIcon, 
    Play as PlayIcon, 
    VolumeX as VolumeXIcon, 
    ArrowDown as ArrowDownIcon,
    Star as StarIcon,
    Hexagon as HexagonIcon,
    Smartphone as SmartphoneIcon,
    Clapperboard as ClapperboardIcon,
    Wrench as WrenchIcon,
    MessageCircle as MessageCircleIcon,
    Mail as MailIcon,
    Instagram as InstagramIcon,
    X as XIcon,
    Briefcase as Clapperboard
} from 'lucide-vue-next'

const store = useHobbiesStore()
const { activeHobbies } = storeToRefs(store)
const selectedVideo = ref<string | null>(null)

const equipment = [
    { label: 'Drone', value: 'DJI NEO' },
    { label: 'Câmera Principal', value: 'Sony A6400' },
    { label: 'Edição', value: 'Premiere Pro, DaVinci Resolve, Capcut' }
]

function scrollToProjects() {
    const projectsSection = document.getElementById('projects')
    if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' })
    }
}

function openModal(url?: string) {
    if (url) {
        selectedVideo.value = url
    }
}

function closeModal() {
    selectedVideo.value = null
}

function getVideoEmbedUrl(url: string) {
    if (url.includes('vimeo')) {
        // Extrair ID Vimeo: https://vimeo.com/123456 -> https://player.vimeo.com/video/123456
        const id = url.split('/').pop()
        return `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`
    }
    if (url.includes('youtube') || url.includes('youtu.be')) {
         // Lógica simples para YT (melhorar se necessário regex)
         let id = ''
         if (url.includes('youtu.be')) id = url.split('/').pop() || ''
         else id = new URL(url).searchParams.get('v') || ''
         return `https://www.youtube.com/embed/${id}?autoplay=1`
    }
    return url
}
</script>

<style scoped>
/* Animações simples */
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scale-in {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
}

.animate-scale-in {
    animation: scale-in 0.3s ease-out;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.animate-fade-in-up {
  animation: fade-in-up 0.8s ease-out forwards;
}

.animate-fade-in-delayed {
    opacity: 0;
    animation: fade-in-up 0.8s ease-out 0.4s forwards;
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0f0f0f;
}
::-webkit-scrollbar-thumb {
  background: #333;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
