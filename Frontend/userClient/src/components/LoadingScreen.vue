<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref } from 'vue';
import Loader from './Loader.vue';

let t: any;

onBeforeMount(()=>{
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
    t = setInterval(()=>{
        currentPhrase.value = loadingPhrases[Math.floor(Math.random()*loadingPhrases.length)]
    }, 2000)
})

onUnmounted(()=>{
    document.getElementsByTagName('body')[0].style.overflowY = 'unset'
    clearInterval(t)
})

const loadingPhrases: string[] = [
  "Hacking the Pentagon",
  "Searching for the missing +C",
  "Decrypting secret keys",
  "Making series converge",
  "Solving for x",
  "Escaping singularities",
  "Conducting Fourier analysis",
  "Dividing and conquering",
  "Synchronizing with sine waves",
  "Optimizing decay factors",
  "Grilling the sandwich theorem",
  "Remembering Bunyakovsky",
  "Making inequalities equal"
];

const currentPhrase = ref(loadingPhrases[Math.floor(Math.random()*loadingPhrases.length)])

</script>
<template>
    <div class="fixed top-0 left-0 w-full h-full bg-pearl-white z-[10000] flex flex-col justify-center items-center px-[2rem]">
        <Loader class="scale-[0.8]"/>
        <div class="h-[5rem] flex justify-center items-center">\
            <p class="text-screenBlack text-body font-body text-center">{{ currentPhrase }}</p>
        </div>
    </div>
</template>