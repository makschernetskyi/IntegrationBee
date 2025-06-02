import { defineStore } from "pinia";
import { api } from '@/api/api';
import { useToastStore } from "../toastStore/toastStore";

export type RankingType = 'Integration Bee' | 'Integration Gym';

export interface RankingPlayer {
    id: number;
    user: {
        id: number;
        username: string;
        first_name: string;
        last_name: string;
        profile_picture?: string;
    };
    elo_rating?: number;
    gym_rating?: number;
    wins?: number;
    losses?: number;
    games_played?: number;
    institution?: string;
    country?: string;
    rank?: number;
}

export interface RankingsResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: RankingPlayer[];
}

interface User {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    institution?: string;
    region: string;
    elo_rating?: number;
    ranking_gym?: number;
}

export interface Player {
    id: number;
    first_name: string;
    last_name: string;
    username: string;
    institution?: string;
    region: string;
    elo_rating?: number;
    ranking_gym?: number;
    rank?: number;
}

interface RankingsState {
    // Data
    eloRankings: Player[];
    gymRankings: Player[];
    
    // Pagination
    currentPage: number;
    totalPages: number;
    totalPlayers: number;
    pageSize: number;
    
    // Filters
    searchQuery: string;
    selectedRegion: string;
    selectedRankingType: RankingType;
    
    // Available regions for filtering
    availableRegions: string[];
    
    // Loading states
    loading: boolean;
    error: string | null;
}

export const useRankingsStore = defineStore('rankingsStore', {
    state: (): RankingsState => ({
        // Data
        eloRankings: [],
        gymRankings: [],
        
        // Pagination
        currentPage: 1,
        totalPages: 1,
        totalPlayers: 0,
        pageSize: 20,
        
        // Filters
        searchQuery: '',
        selectedRegion: 'All',
        selectedRankingType: 'Integration Bee',
        
        // Available regions for filtering
        availableRegions: ['All'],
        
        // Loading states
        loading: false,
        error: null,
    }),

    getters: {
        currentRankings: (state): Player[] => {
            return state.selectedRankingType === 'Integration Bee' 
                ? state.eloRankings 
                : state.gymRankings;
        },
        
        uniqueRegions: (state) => {
            const rankings = state.selectedRankingType === 'Integration Bee' 
                ? state.eloRankings 
                : state.gymRankings;
            const regions = rankings.map(player => player.region).filter(Boolean);
            return ['All', ...Array.from(new Set(regions))];
        },

        uniqueInstitutions: (state) => {
            const rankings = state.selectedRankingType === 'Integration Bee' 
                ? state.eloRankings 
                : state.gymRankings;
            const institutions = rankings.map(player => player.institution).filter(Boolean);
            return Array.from(new Set(institutions));
        },

        hasNextPage: (state): boolean => state.currentPage < state.totalPages,
        hasPreviousPage: (state): boolean => state.currentPage > 1,

        rankingApiUrl: (state) => state.selectedRankingType === 'Integration Bee' 
            ? '/eloUserData/'
            : '/gymUserData/',
    },

    actions: {
        async fetchRankings(type: RankingType, page = 1, search = '', region = 'All') {
            this.loading = true;
            this.error = null;

            try {
                const endpoint = type === 'Integration Bee' 
                    ? '/eloUserData/' 
                    : '/gymUserData/';
                
                const params: any = {
                    page: page,
                    page_size: this.pageSize,
                };
                
                if (search) {
                    params.search = search;
                }
                
                if (region && region !== 'All') {
                    params.region = region;
                }

                const response = await api.get<RankingsResponse>(endpoint, { params });

                console.log(response.data);
                
                // Add rank numbers to players
                const startRank = (page - 1) * this.pageSize + 1;
                const rankedPlayers = response.data.results.map((player: any, index) => ({
                    id: player.id,
                    first_name: player.first_name,
                    last_name: player.last_name,
                    username: player.username || '',
                    institution: player.institution,
                    region: player.region,
                    elo_rating: player.elo_rating,
                    ranking_gym: player.ranking_gym,
                    rank: startRank + index
                }));

                if (type === 'Integration Bee') {
                    this.eloRankings = rankedPlayers;
                } else {
                    this.gymRankings = rankedPlayers;
                }

                // Update pagination info
                this.totalPlayers = response.data.count;
                this.totalPages = Math.ceil(response.data.count / this.pageSize);
                this.currentPage = page;
                
                // Update filters
                this.searchQuery = search;
                this.selectedRegion = region;
                this.selectedRankingType = type;
                
                // Extract unique regions for filtering
                this.updateAvailableRegions();

            } catch (error: any) {
                this.error = 'Failed to fetch rankings';
                useToastStore().addToast({
                    type: 'error',
                    title: 'Error fetching rankings',
                    message: 'Could not load the rankings data. Please try again.'
                });
                console.error('Error fetching rankings:', error);
            } finally {
                this.loading = false;
            }
        },

        async fetchAllRegions() {
            try {
                // Fetch both ELO and Gym data to get all possible regions
                const [eloResponse, gymResponse] = await Promise.all([
                    api.get('/eloUserData/', { params: { page_size: 1000 } }),
                    api.get('/gymUserData/', { params: { page_size: 1000 } })
                ]);
                
                const allPlayers = [
                    ...eloResponse.data.results,
                    ...gymResponse.data.results
                ];
                
                const regions = new Set(['All']);
                allPlayers.forEach((player: any) => {
                    if (player.region) {
                        regions.add(player.region);
                    }
                });
                
                this.availableRegions = Array.from(regions).sort();
            } catch (error) {
                console.error('Error fetching regions:', error);
                // Keep default regions if fetch fails
                this.availableRegions = ['All', 'Austria', 'Germany', 'Italy', 'Spain', 'France', 'United Kingdom'];
            }
        },
        
        updateAvailableRegions() {
            const currentRankings = this.selectedRankingType === 'Integration Bee' 
                ? this.eloRankings 
                : this.gymRankings;
            
            const regions = new Set(['All']);
            currentRankings.forEach(player => {
                if (player.region) {
                    regions.add(player.region);
                }
            });
            
            this.availableRegions = Array.from(regions).sort();
        },
        
        async changePage(page: number) {
            if (page >= 1 && page <= this.totalPages) {
                await this.fetchRankings(
                    this.selectedRankingType, 
                    page, 
                    this.searchQuery, 
                    this.selectedRegion
                );
            }
        },
        
        async nextPage() {
            if (this.hasNextPage) {
                await this.changePage(this.currentPage + 1);
            }
        },
        
        async previousPage() {
            if (this.hasPreviousPage) {
                await this.changePage(this.currentPage - 1);
            }
        },
        
        async searchPlayers(query: string) {
            this.currentPage = 1; // Reset to first page when searching
            await this.fetchRankings(
                this.selectedRankingType, 
                1, 
                query, 
                this.selectedRegion
            );
        },
        
        async filterByRegion(region: string) {
            this.currentPage = 1; // Reset to first page when filtering
            await this.fetchRankings(
                this.selectedRankingType, 
                1, 
                this.searchQuery, 
                region
            );
        },
        
        async switchRankingType(type: RankingType) {
            this.currentPage = 1; // Reset to first page when switching types
            this.searchQuery = ''; // Clear search when switching types
            this.selectedRegion = 'All'; // Reset region filter
            await this.fetchRankings(type, 1);
        },

        resetFilters() {
            this.searchQuery = '';
            this.selectedRegion = 'All';
            this.currentPage = 1;
        }
    }
});