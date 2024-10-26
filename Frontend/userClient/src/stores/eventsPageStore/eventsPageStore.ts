// src/stores/eventsStore.ts

import { defineStore } from 'pinia';
import axios from 'axios';

export interface Event {
  id: number;
  name: string;
  edition: string;
  location: string;
  date: string;
  pictureSrc: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

export interface EventsResponse {
  data: Event[];
  currentPage: number;
  totalPages: number;
  totalEvents: number;
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
        const response = await axios.get('/api/events/title'); // Replace with your API endpoint
        this.title = response.data.title;
      } catch (error) {
        console.error('Error fetching title:', error);
        this.error = 'Failed to fetch title.';
      }
    },
    async fetchEvents(page = 1, search = '') {
      this.loading = true;
      try {
        const response = await axios.get('/api/events', {
          params: {
            page: page,
            search: search,
          },
        }); // Replace with your API endpoint

        const data: EventsResponse = response.data;
        this.events = data.data;
        this.currentPage = data.currentPage;
        this.totalPages = data.totalPages;
        this.totalEvents = data.totalEvents;
        this.searchQuery = search;
        this.error = null;
      } catch (error) {
        console.error('Error fetching events:', error);
        this.error = 'Failed to fetch events.';
      } finally {
        this.loading = false;
      }
    },
  },
});
