import { defineStore } from "pinia";
import { api } from "@/api";
import { useToastStore } from "../toastStore/toastStore";




export const usePresentingStore = defineStore('presenting', {
	state: () => ({
	  competitions: [] as any[],
	  currentSeriesName: "",
	  series: [] as any[],
	  currentIntegralIndex: 0,
	  timePerIntegral: 180,
	  tieBreakers: [],
	  currentTieBreakerIndex: 0,
	}),
	actions: {
	  // Fetch all competitions and handle minimal errors
	  async fetchCompetitions() {
		try {
		  const response = await api.get('/competitions/');
		  this.competitions = response.data;
		} catch (error) {
		  useToastStore().addToast({
			type: 'error',
			title: "could not fetch competitions",
			message: ""
		  })
		}
	  },
  
	  // Fetch a specific series of a competition by IDs
	  async fetchSeries(competitionId:string, seriesId:string) {
		try {
		  const response = await api.get(`/competitions/${competitionId}/series/${seriesId}/`);
		  const seriesData = response.data;
  
		  // Update the store with the fetched series data
		  this.currentSeriesName = seriesData.series_name;
		  this.series = seriesData.integrals.map((integral:any) => ({
			...integral,
			isTieBreaker: false, // Flag to indicate it's not a tie-breaker
		  }));
		  this.currentIntegralIndex = 0;
		} catch (error) {
			useToastStore().addToast({
				type: 'error',
				title: "Error during fetching series",
				message: "series could not be fetched, try later."
			})
		}
	  },
  
	  // Fetch tie-breakers for a competition and reset the current tie-breaker index
	  async fetchTieBreakers(competitionId:string) {
		try {
		  const response = await api.get(`/competitions/${competitionId}/tie-breakers/`);
		  const tieBreakersData = response.data;
  
		  // Update the store with the fetched tie-breakers
		  this.tieBreakers = tieBreakersData.integrals.map((integral:any) => ({
			...integral,
			isTieBreaker: true, // Flag to indicate it's a tie-breaker
		  }));
		  this.currentTieBreakerIndex = 0;
		} catch (error) {
			useToastStore().addToast({
				type: 'error',
				title: "Error during fetching tie-breakers",
				message: "tie-breakers could not be fetched, try later."
			})
		}
	  },
  
	  // Add the current tie-breaker after the current integral and increment the index
	  addCurrentTieBreaker() {
		if (this.currentTieBreakerIndex < this.tieBreakers.length) {
		  const tieBreakerIntegral = this.tieBreakers[this.currentTieBreakerIndex];
  
		  // Insert the tie-breaker after the current integral
		  this.series.splice(this.currentIntegralIndex + 1, 0, tieBreakerIntegral);
  
		  // Increment the tie-breaker index for next addition
		  if(this.tieBreakers.length-1 !== this.currentTieBreakerIndex){
			this.currentTieBreakerIndex += 1;
		  }else{
			useToastStore().addToast({
				type: 'warning',
				title: "Last tie-breaker",
				message: "this was the last tie-breaker."
			})
		  }
		  

		  useToastStore().addToast({
			type: 'info',
			title: "Tie breaker was added.",
			message: "next integral will be a tie breaker, current series will continue afterwards."
		})
		} else {
			useToastStore().addToast({
				type: 'warning',
				title: "No more Tie Breakers available",
				message: ""
			})
		}
	  },
	},
  });
  