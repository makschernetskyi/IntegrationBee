<script setup lang="ts">
import DefaultLayout from '@/layouts/Default.vue';
import Flag from '@/components/Flag.vue';
import bs from '@/assets/icons/Picture.png'
import Select from '@/components/Select.vue';

import { ref } from 'vue';

const competitors = [
    {
        nr: 1,
        name: "Lorenzo Vallani",
        result: "726",
        school: "Uniwien",
        region: "Austria"
    },
    {
        nr: 2,
        name: "Elena Petrova",
        result: "710",
        school: "Sofia University",
        region: "No affiliation"
    },
    {
        nr: 3,
        name: "Carlos Mendoza",
        result: "695",
        school: "Complutense University of Madrid",
        region: "Spain"
    },
    {
        nr: 4,
        name: "Anna Schmidt",
        result: "730",
        school: "LMU Munich",
        region: "Germany"
    },
    {
        nr: 5,
        name: "Giulia Bianchi",
        result: "705",
        school: "University of Bologna",
        region: "Italy"
    },
    {
        nr: 6,
        name: "Sofia Rossi",
        result: "720",
        school: "Sapienza University",
        region: "Italy"
    },
    {
        nr: 7,
        name: "James O'Connor",
        result: "700",
        school: "Trinity College Dublin",
        region: "Ireland"
    },
    {
        nr: 8,
        name: "Chloe Dubois",
        result: "715",
        school: "Sorbonne University",
        region: "France"
    },
    {
        nr: 9,
        name: "Hans Müller",
        result: "725",
        school: "University of Heidelberg",
        region: "Germany"
    },
    {
        nr: 10,
        name: "Pedro Silva",
        result: "690",
        school: "University of Lisbon",
        region: "Portugal"
    },
    {
        nr: 11,
        name: "Pierre Lefevre",
        result: "710",
        school: "Université de Paris",
        region: "France"
    },
    {
        nr: 12,
        name: "Marta Kowalska",
        result: "705",
        school: "University of Warsaw",
        region: "Poland"
    },
    {
        nr: 13,
        name: "David Smith",
        result: "715",
        school: "University of Oxford",
        region: "United Kingdom"
    },
    {
        nr: 14,
        name: "Maria Garcia",
        result: "720",
        school: "University of Barcelona",
        region: "Spain"
    },
    {
        nr: 15,
        name: "Luca Moretti",
        result: "695",
        school: "University of Milan",
        region: "Italy"
    },
    {
        nr: 16,
        name: "Nils Andersen",
        result: "730",
        school: "University of Copenhagen",
        region: "Denmark"
    }
];

const regionModel = ref('Austria')
const cathegoryModel = ref('Integration Bee')



</script>
<template>
    <DefaultLayout>
        <div class="w-full px-[2rem] lg:px-[12rem] xl:px-[10vw] 2xl:px-[calc(50vw-70rem)] bg-screenBlack flex justify-center pt-[8rem] pb-[2rem] lg:pt-[16rem]">
			<h1 class="font-heading text-subtitle lg:text-title text-center text-pearl-white">
				Rankings
			</h1>
		</div>
        <div class="w-full px-[2rem] lg:px-[12rem] xl:px-[10vw] flex flex-col bg-screenBlack font-body text-body text-screenBlack">
            <div class="grid grid-cols-[3fr_2fr_8fr] h-[5rem]">
                 <div class="font-heading text-pearl-white flex items-center justify-start gap-4">
                    Cathegory:
                    <Select v-model="cathegoryModel" :options="['Integration Bee', 'Integration Gym']" class="h-full text-body w-[18rem] rounded-[15px]"/>
                 </div>
                 <div class="font-heading text-pearl-white flex items-center justify-start gap-4">
                    Region
                    <Select v-model="regionModel" :options="['Austria', 'Poland', 'United Kingdom']" class="h-full text-body w-[12rem] rounded-[15px]"/>
                </div>
                <div class="flex items-center relative justify-end">
                <!-- Search bar -->
                    <input type="text" class="rounded-[15px] bg-pearl-white font-body text-body w-full h-full pl-[1rem] pr-[4rem] max-w-[60rem]" placeholder="Find integrators...">
                    <button class="absolute right-[1rem] top-[50%] -translate-y-[50%] h-[3.5rem] w-[3.5rem]">
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                            <circle cx="17.2961" cy="17.2961" r="15.7961" stroke="#242424" stroke-width="3"/>
                            <path d="M27.5068 30.4541L30.4539 27.5071L43.5978 40.651C43.9883 41.0415 43.9883 41.6747 43.5978 42.0652L42.065 43.598C41.6745 43.9886 41.0413 43.9886 40.6508 43.598L27.5068 30.4541Z" fill="#242424"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="z-20 top-0 grid grid-cols-[4rem_2fr_1fr_2fr_2fr] md:grid-cols-[8rem_2fr_1fr_2fr_1fr] text-text-sm md:text-body overflow-y-auto text-pearl-white py-[2rem] gutterStable">
                <div class="flex justify-center items-center">#</div>
                <div class="flex justify-center items-center">name</div>
                <div class="flex justify-center items-center gap-2">
                    result
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="hidden md:flex">
                        <path d="M16.4692 3.77109L23.4637 11.1924L20.5339 20.9605L10.6096 23.3072L3.61513 15.8859L6.54491 6.11786L16.4692 3.77109Z" stroke="#F2F1F0" stroke-width="1.17031"/>
                        <path d="M12.6043 15.7582C12.6043 15.3624 12.6631 14.9879 12.7808 14.6348C12.9092 14.271 13.1393 13.8538 13.4709 13.383C13.8561 12.8373 14.1182 12.3666 14.2573 11.9707C14.3964 11.5748 14.466 11.1575 14.466 10.7189C14.466 10.3337 14.3911 10.0555 14.2413 9.88432C14.0915 9.70244 13.8722 9.61149 13.5833 9.61149C13.2944 9.61149 13.0751 9.70244 12.9253 9.88432C12.7755 10.0555 12.7006 10.3337 12.7006 10.7189V11.9386H11.0315V10.8312C11.0315 9.92177 11.2508 9.22632 11.6895 8.74485C12.1282 8.25268 12.7701 8.00659 13.6154 8.00659C14.4713 8.00659 15.1186 8.25268 15.5573 8.74485C16.0067 9.22632 16.2314 9.92177 16.2314 10.8312C16.2314 11.3234 16.1404 11.7995 15.9585 12.2596C15.7873 12.7089 15.4878 13.2172 15.0598 13.7842C14.7174 14.2443 14.4767 14.6295 14.3376 14.9398C14.2092 15.2393 14.145 15.5336 14.145 15.8224V16.4323H12.6043V15.7582ZM12.524 17.7002H14.2252V19.4014H12.524V17.7002Z" fill="white"/>
                    </svg>
                </div>
                <div class="flex justify-center items-center">school</div>
                <div class="flex justify-center items-center">region</div>
            </div>
            <div class="w-[full] max-h-[70rem] overflow-x-auto overflow-y-auto bg-pearl-white rounded gutterStable">
                <div v-for="person in competitors" class="grid grid-cols-[4rem_2fr_1fr_2fr_2fr] md:grid-cols-[8rem_2fr_1fr_2fr_1fr] text-text-sm xl:text-body text-screenBlack py-6 even:bg-pearl-white-300">
                    <div class="flex justify-center items-center">{{person.nr}}</div>
                    <div class="flex justify-center items-center text-center">{{person.name}}</div>
                    <div class="flex justify-center items-center">{{person.result}}</div>
                    <div class="flex justify-center items-center text-center min-w-0 w-full" :title="person.school">
                        <span class="block w-full overflow-hidden whitespace-nowrap text-ellipsis">
                            {{ person.school }}
                        </span>
                    </div>
                    <div class="flex justify-center items-center">
                        <Flag :country="person.region" class="w-[3rem] lg:w-[4rem] shadow-md overflow-hidden rounded-sm" :title="person.region"/>
                    </div>
                </div>
            </div>
            <div class="w-full flex justify-center items-center py-[2rem]">
                <div class="flex gap-[2rem] items-center justify-center h-[4rem]">
                    <button class="lg:hover:scale-[110%] h-[80%]" title="previous page">
                        <svg width="15" height="30" viewBox="0 0 15 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                            <path d="M15 0H10L0 15L10 30H15L5 15L15 0Z" fill="#F2F1F0"/>
                            <path d="M0 15L10 30H15L5 15H0Z" fill="#D9D9D9"/>
                        </svg>
                    </button>
                    <div class="w-max px-[1rem] bg-pearl-white rounded-xl h-full flex justify-center items-center font-heading">
                        <p>7</p>
                    </div>
                    <button class="lg:hover:scale-[110%] h-[80%]" title="next page">
                        <svg width="15" height="30" viewBox="0 0 15 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                            <path d="M0 0H5L15 15L5 30H0L10 15L0 0Z" fill="#F2F1F0"/>
                            <path d="M15 15L5 30H0L10 15H15Z" fill="#D9D9D9"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>
<style lang="postcss" scoped>

.gutterStable{
    scrollbar-gutter: stable;
}

</style>