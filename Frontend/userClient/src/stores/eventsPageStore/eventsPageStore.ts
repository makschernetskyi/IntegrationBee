import { noAuthApi } from '@/api';
import { defineStore } from 'pinia';
import { useToastStore } from '../toastStore/toastStore';
import { formatDateToLocal } from '@/utils/formatDateToLocal';


export interface Event {
  id: string,
  name: string;
  edition: string;
  location: string;
  date: string;
  pictureSrc: string;
  status: 'upcoming' | 'ongoing' | 'past';
}


export const useEventsPageStore = defineStore('eventsPageStore', {
  state: () => ({
    title: '' as string,
    events: [] as Event[],
    currentPage: 1 as number,
    totalPages: 1 as number,
    totalEvents: 0 as number,
    loading: false as boolean,
    error: null as string | null,
    searchQuery: '' as string,
  }),
  actions: {
    async fetchTitle() {
      try {
        const response = await noAuthApi.get('/cms/pages/', {
          params: {
            type: "home.CompetitionsPage",
            fields: "title"
          }
        }); 
        this.title = response.data.items["0"].title;
      } catch (error) {
        useToastStore().addToast({
          type: "error",
          title: "Error has occured",
          message: "Could not fetch title of this page."
        })
        this.error = 'Failed to fetch title.';
      }
    },
    async fetchEvents(page = 1, search = '') {
      this.loading = true;
      try {
        const response = await noAuthApi.get('/cms/pages/', {
          params: {
            type: "home.CompetitionPost",
            fields: "id,title,edition,place,picture,competition"
          }
        });

        function getStatus(startDate:string, endDate:string) {
          const today = new Date();
          const todayDateOnly = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        
          const start = new Date(startDate);
          const startDateOnly = new Date(start.getFullYear(), start.getMonth(), start.getDate());
        
          const end = new Date(endDate);
          const endDateOnly = new Date(end.getFullYear(), end.getMonth(), end.getDate());
        
          if (todayDateOnly < startDateOnly) {
            return "upcoming";
          } else if (todayDateOnly > endDateOnly) {
            return "past";
          } else {
            return "ongoing";
          }
        }

        this.events = response.data.items.map((item:any)=>({
          id: item.id,
          name: item.title,
          edition: item.edition,
          location: item.place,
          date: formatDateToLocal(item.competition.event_date_start),
          pictureSrc: item.picture?.meta.download_url,
          status: getStatus(item.competition.event_date_start, item.competition.event_date_end)
        }));

        //TODO: IMPLEMENT PAGINATION
        //this.currentPage = data.currentPage;
        //this.totalPages = data.totalPages;
        //this.totalEvents = data.totalEvents;
        this.searchQuery = search;
        this.error = null;
      } catch (error) {
        useToastStore().addToast({
          type: "error",
          title: "Error has occured",
          message: "Could not fetch compeitions"
        })
        this.error = 'Failed to fetch events.';
      } finally {
        this.loading = false;
      }
    },
  },
});
