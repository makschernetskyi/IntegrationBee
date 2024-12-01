<script setup lang="ts">
import { usePresentingStore } from '@/stores/presentingStore/presentingStore';
import {ref, onMounted} from 'vue'


const presentingStore = usePresentingStore()


const selectedCompetition = ref<null|number>(null)
const selectedSeries = ref<null|number>(null)

onMounted(async()=>{
    await presentingStore.fetchCompetitions()
})




</script>
<template>

    <div class="w-full h-[100vh] bg-pearl-white min-h-[50rem] min-w-[120rem] px-[2rem] xl:px-[12rem] flex flex-col font-body text-body text-screenBlack py-[2rem]">
        <header class="w-full h-[10rem] flex justify-start items-center">
            <div class="h-full w-max min-w-[5rem] rounded-full border-4 border-primary flex items-center">
                <div class="aspect-square h-full p-[1rem]">
                    <RouterLink to="/" class="w-full h-full p-[1rem] bg-white flex rounded-full transition-transform duration-[.8s] hover:rotate-[360deg]">
                        <svg width="69" height="68" viewBox="0 0 69 68" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-full w-full">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M59.4828 33.7849L51.3108 54.5169L25.3814 58.3861L9.06592 37.8652L13.2027 27.3704C14.3404 27.2488 15.5733 27.1797 16.906 27.1797C22.0917 27.1797 26.0562 28.9823 30.2511 30.8896C34.9633 33.0321 39.9662 35.3068 47.3172 35.3068C52.2665 35.3068 56.3178 34.6415 59.4828 33.7849Z" fill="#FBC151"/>
                            <path d="M19.7919 14.8718L43.9564 11.266L59.1614 30.3902L50.2019 53.1202L26.0374 56.726L10.8324 37.6018L19.7919 14.8718Z" stroke="#001D37" stroke-width="3.09071"/>
                            <path d="M1.70068 31.8987C1.70068 31.8987 5.89532 27.1797 16.9062 27.1797C27.9172 27.1797 33.4226 35.3068 47.3174 35.3068C61.2121 35.3068 68.0284 30.0635 68.0284 30.0635" stroke="#001D37" stroke-width="3.09071"/>
                        </svg>
                    </RouterLink>
                </div>
                <h1 class="font-heading text-title pl-[2rem] pr-[4rem]">Integral Presenting</h1>
            </div>
        </header>
        <main class="grid grid-cols-2 py-[5rem] gap-x-[2rem]">
            <h2 class="text-title font-heading col-start-1 col-span-1 pl-[1rem]">
                Competitions
            </h2>
            <div class="bg-white h-[calc(100vh-30rem)] min-h-[25rem] w-full rounded-xl overflow-y-auto px-[1rem] py-[1rem] col-start-1 col-span-1">
                <div class="w-full h-max flex flex-col gap-[1rem]">
                    <div v-for="competition, i in presentingStore.competitions" :key="i" @click="()=>selectedCompetition=competition.id.toString()" :class="`w-full h-[5rem] rounded-lg  flex justify-center items-center cursor-pointer transition-colors hover:bg-gray-100 ${selectedCompetition == competition.id.toString() ? 'bg-gray-100' : 'bg-pearl-white'}`">
                        <p class="text-center">
                            {{ competition.name }}
                        </p>
                    </div>            
                </div>
            </div>

            <h2 class="text-title font-heading col-start-2 col-span-1 row-start-1 pl-[1rem]">
                Series
            </h2>
            <div class="col-start-2 col-span-1 h-[calc(100vh-30rem)] min-h-[25rem] flex flex-col-reverse justify-between">
                <div class="flex flex-col gap-[2rem]">
                    <RouterLink v-if="selectedCompetition !== null && selectedSeries !== null" :to="`presenting/series_presentation/${selectedCompetition}/${selectedSeries}`" class="flex justify-center font-heading text-title w-full rounded-xl bg-primary py-[1rem]">
                        Start presenting
                    </RouterLink>
                    <div v-else class="flex justify-center font-heading text-title w-full rounded-xl bg-gray-100 py-[1rem]">
                        Start presenting
                    </div>
                    <a href="/admin/" class="flex justify-center font-heading text-title w-full rounded-xl border-4 border-primary py-[1rem]">
                        Go to admin
                    </a>
                </div>
                <div v-if="selectedCompetition !== null" class="bg-white h-[calc(100vh-55rem)] w-full rounded-xl overflow-y-auto px-[1rem] py-[1rem]">
                    <div class="w-full h-max flex flex-col gap-[1rem]">
                        <div v-for="series, i in presentingStore.competitions.find(comp=>comp.id.toString() == selectedCompetition).series" :key="i" @click="()=>{selectedSeries = series.id}" :class="`w-full h-[5rem] rounded-lg flex justify-center items-center cursor-pointer transition-colors hover:bg-gray-100 ${selectedSeries == series.id.toString() ? 'bg-gray-100' : 'bg-pearl-white'}`">
                            <p class="text-center">
                                {{ series.series_name }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        
    </div>

</template>