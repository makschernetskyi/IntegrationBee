<script setup lang="ts">
import DefaultLayout from '@/layouts/Default.vue';
import Flag from '@/components/Flag.vue';
import Select from '@/components/Select.vue';
import { useRankingsStore, type RankingType } from '@/stores/rankingsStore/rankingsStore';
import { ref, onMounted, computed, watch } from 'vue';
import { storeToRefs } from 'pinia';

const rankingsStore = useRankingsStore();
const {
    currentRankings,
    availableRegions,
    loading,
    error,
    currentPage,
    totalPages,
    totalPlayers,
    hasNextPage,
    hasPreviousPage,
    selectedRankingType,
    selectedRegion,
    searchQuery
} = storeToRefs(rankingsStore);

// Local reactive references for form inputs
const searchInput = ref('');
const regionModel = ref('All');
const categoryModel = ref<RankingType>('Integration Bee');

// Computed values for display
const displayedRankings = computed(() => {
    return currentRankings.value.map((player, index) => ({
        nr: player.rank || (currentPage.value - 1) * 20 + index + 1,
        name: `${player.first_name} ${player.last_name}`,
        result: selectedRankingType.value === 'Integration Bee' 
            ? player.elo_rating?.toString() || '0'
            : player.ranking_gym?.toString() || '0',
        school: player.institution || 'No affiliation',
        region: player.region || 'No affiliation',
        profilePicture: null // No profile picture in current API response
    }));
});

// Watchers for reactive updates
watch(categoryModel, async (newCategory) => {
    await rankingsStore.switchRankingType(newCategory);
});

watch(regionModel, async (newRegion) => {
    await rankingsStore.filterByRegion(newRegion);
});

// Pagination handlers
const goToNextPage = async () => {
    await rankingsStore.nextPage();
};

const goToPreviousPage = async () => {
    await rankingsStore.previousPage();
};

// Method to handle search on button click
const performSearch = async () => {
    if (!loading.value) { // Prevent multiple rapid clicks if somehow possible
        await rankingsStore.searchPlayers(searchInput.value);
    }
};

// Initialize data on component mount
onMounted(async () => {
    await rankingsStore.fetchAllRegions();
    await rankingsStore.fetchRankings('Integration Bee', 1);
});
</script>

<template>
    <DefaultLayout>
        <div class="w-full px-[2rem] lg:px-[12rem] xl:px-[10vw] 2xl:px-[calc(50vw-70rem)] bg-screenBlack flex justify-center pt-[8rem] pb-[2rem] lg:pt-[16rem]">
            <h1 class="font-heading text-subtitle lg:text-title text-center text-pearl-white">
                Rankings
            </h1>
        </div>
        
        <div class="w-full px-[2rem] lg:px-[12rem] xl:px-[10vw] flex flex-col bg-screenBlack font-body text-body text-screenBlack">
            <!-- Filters and Search -->
            <div class="flex flex-col lg:grid lg:grid-cols-[3fr_2fr_8fr] h-max lg:h-[5rem] gap-4">
                <div class="font-heading text-pearl-white flex items-center justify-start gap-4">
                    Category:
                    <Select 
                        v-model="categoryModel" 
                        :options="['Integration Bee', 'Integration Gym']" 
                        class="h-full text-body w-[18rem] rounded-[15px]"
                    />
                </div>
                
                <div class="font-heading text-pearl-white flex items-center justify-start gap-4">
                    Region:
                    <Select 
                        v-model="regionModel" 
                        :options="availableRegions" 
                        class="h-full text-body w-[12rem] rounded-[15px]"
                    />
                </div>
                
                <div class="flex items-center relative justify-end h-[5rem]">
                    <!-- Search bar -->
                    <input 
                        v-model="searchInput"
                        type="text" 
                        class="rounded-[15px] bg-pearl-white font-body text-body w-full h-full pl-[1rem] pr-[4rem] max-w-[60rem]" 
                        placeholder="Find integrators..."
                        :disabled="loading"
                    >
                    <button 
                        @click="performSearch"
                        :disabled="loading"
                        class="absolute right-[1rem] top-[50%] -translate-y-[50%] h-[3.5rem] w-[3.5rem]"
                        title="Search"
                    >
                        <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                            <circle cx="17.2961" cy="17.2961" r="15.7961" stroke="#242424" stroke-width="3"/>
                            <path d="M27.5068 30.4541L30.4539 27.5071L43.5978 40.651C43.9883 41.0415 43.9883 41.6747 43.5978 42.0652L42.065 43.598C41.6745 43.9886 41.0413 43.9886 40.6508 43.598L27.5068 30.4541Z" fill="#242424"/>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Table Header -->
            <div class="z-20 top-0 grid grid-cols-[4rem_2fr_1fr_2fr_2fr] md:grid-cols-[8rem_2fr_1fr_2fr_1fr] text-text-xs md:text-text-sm xl:text-body overflow-y-auto text-pearl-white py-[2rem] gutterStable">
                <div class="flex justify-center items-center">#</div>
                <div class="flex justify-center items-center">name</div>
                <div class="flex justify-center items-center gap-2"
                    :title="selectedRankingType === 'Integration Bee' ? 'Modified ELO Rating' : 'Gym problems solved'"
                >
                    {{ selectedRankingType === 'Integration Bee' ? 'Rating' : 'Gym Rating' }}
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" class="hidden md:flex">
                        <path d="M16.4692 3.77109L23.4637 11.1924L20.5339 20.9605L10.6096 23.3072L3.61513 15.8859L6.54491 6.11786L16.4692 3.77109Z" stroke="#F2F1F0" stroke-width="1.17031"/>
                        <path d="M12.6043 15.7582C12.6043 15.3624 12.6631 14.9879 12.7808 14.6348C12.9092 14.271 13.1393 13.8538 13.4709 13.383C13.8561 12.8373 14.1182 12.3666 14.2573 11.9707C14.3964 11.5748 14.466 11.1575 14.466 10.7189C14.466 10.3337 14.3911 10.0555 14.2413 9.88432C14.0915 9.70244 13.8722 9.61149 13.5833 9.61149C13.2944 9.61149 13.0751 9.70244 12.9253 9.88432C12.7755 10.0555 12.7006 10.3337 12.7006 10.7189V11.9386H11.0315V10.8312C11.0315 9.92177 11.2508 9.22632 11.6895 8.74485C12.1282 8.25268 12.7701 8.00659 13.6154 8.00659C14.4713 8.00659 15.1186 8.25268 15.5573 8.74485C16.0067 9.22632 16.2314 9.92177 16.2314 10.8312C16.2314 11.3234 16.1404 11.7995 15.9585 12.2596C15.7873 12.7089 15.4878 13.2172 15.0598 13.7842C14.7174 14.2443 14.4767 14.6295 14.3376 14.9398C14.2092 15.2393 14.145 15.5336 14.145 15.8224V16.4323H12.6043V15.7582ZM12.524 17.7002H14.2252V19.4014H12.524V17.7002Z" fill="white"/>
                    </svg>
                </div>
                <div class="flex justify-center items-center">school</div>
                <div class="flex justify-center items-center">region</div>
            </div>

            <!-- Rankings Table -->
            <div class="w-full max-h-[70rem] overflow-x-auto overflow-y-auto bg-pearl-white rounded gutterStable">
                <!-- Loading State -->
                <div v-if="loading" class="flex justify-center items-center py-12">
                    <div class="text-screenBlack font-heading text-body-lg">Loading rankings...</div>
                </div>

                <!-- Error State -->
                <div v-else-if="error" class="flex justify-center items-center py-12">
                    <div class="text-red font-heading text-body-lg">{{ error }}</div>
                </div>

                <!-- Empty State -->
                <div v-else-if="displayedRankings.length === 0" class="flex justify-center items-center py-12">
                    <div class="text-screenBlack font-heading text-body-lg">No players found</div>
                </div>

                <!-- Rankings Data -->
                <div v-else>
                    <div 
                        v-for="(person, index) in displayedRankings" 
                        :key="`${person.nr}-${person.name}`"
                        class="grid grid-cols-[4rem_2fr_1fr_2fr_2fr] md:grid-cols-[8rem_2fr_1fr_2fr_1fr] text-text-xs md:text-text-sm xl:text-body text-screenBlack py-6 even:bg-pearl-white-300"
                    >
                        <div class="flex justify-center items-center">{{ person.nr }}</div>
                        <div class="flex justify-center items-center text-center">{{ person.name }}</div>
                        <div class="flex justify-center items-center">{{ person.result }}</div>
                        <div class="flex justify-center items-center text-center min-w-0 w-full" :title="person.school">
                            <span class="block w-full overflow-hidden whitespace-nowrap text-ellipsis">
                                {{ person.school }}
                            </span>
                        </div>
                        <div class="flex justify-center items-center">
                            <Flag 
                                :country="person.region" 
                                class="w-[3rem] lg:w-[4rem] shadow-md overflow-hidden rounded-sm" 
                                :title="person.region"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div class="w-full flex justify-center items-center py-[2rem]">
                <div class="flex gap-[2rem] items-center justify-center h-[4rem]">
                    <button 
                        @click="goToPreviousPage"
                        :disabled="!hasPreviousPage || loading"
                        :class="[
                            'h-[80%] transition-all duration-200',
                            hasPreviousPage && !loading 
                                ? 'lg:hover:scale-[110%] cursor-pointer' 
                                : 'opacity-50 cursor-not-allowed'
                        ]"
                        title="previous page"
                    >
                        <svg width="15" height="30" viewBox="0 0 15 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                            <path d="M15 0H10L0 15L10 30H15L5 15L15 0Z" fill="#F2F1F0"/>
                            <path d="M0 15L10 30H15L5 15H0Z" fill="#D9D9D9"/>
                        </svg>
                    </button>
                    
                    <div class="w-max px-[1rem] bg-pearl-white rounded-xl h-full flex justify-center items-center font-heading">
                        <p>{{ currentPage }} / {{ totalPages || 1 }}</p>
                    </div>
                    
                    <button 
                        @click="goToNextPage"
                        :disabled="!hasNextPage || loading"
                        :class="[
                            'h-[80%] transition-all duration-200',
                            hasNextPage && !loading 
                                ? 'lg:hover:scale-[110%] cursor-pointer' 
                                : 'opacity-50 cursor-not-allowed'
                        ]"
                        title="next page"
                    >
                        <svg width="15" height="30" viewBox="0 0 15 30" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
                            <path d="M0 0H5L15 15L5 30H0L10 15L0 0Z" fill="#F2F1F0"/>
                            <path d="M15 15L5 30H0L10 15H15Z" fill="#D9D9D9"/>
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Results Count -->
            <div class="w-full flex justify-center items-center pb-[2rem]">
                <div class="text-pearl-white font-body text-text-sm">
                    Showing {{ displayedRankings.length }} of {{ totalPlayers }} players
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>

<style lang="postcss" scoped>
.gutterStable {
    scrollbar-gutter: stable;
}
</style>