// src/stores/newsStore.ts

import { defineStore } from 'pinia';
import axios from 'axios';
import { useToastStore } from '../toastStore/toastStore';

export interface Comment {
  author: string;
  text: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  pictureSrc: string | null;
  pictureAlt?: string;
  comments: Comment[];
}

export interface NewsResponse {
  data: NewsItem[];
  currentPage: number;
  totalPages: number;
  totalNews: number;
}

export const useNewsPageStore = defineStore('newsPageStore', {
  state: () => ({
    title: '' as string,
    newsItems: [] as NewsItem[],
    currentPage: 1 as number,
    totalPages: 1 as number,
    totalNews: 0 as number,
    loading: false as boolean,
    error: null as string | null,
    commentText: '' as string
  }),
  actions: {
    async fetchTitle() {
      try {
        const response = await axios.get('/api/news/title'); // Replace with your API endpoint
        this.title = response.data.title;
      } catch (error) {
        console.error('Error fetching title:', error);
        this.error = 'Failed to fetch title.';
      }
    },
    async fetchNews(page = 1) {
      this.loading = true;
      try {
        const response = await axios.get('/api/news', {
          params: {
            page: page,
          },
        }); // Replace with your API endpoint

        const data: NewsResponse = response.data;
        this.newsItems = data.data;
        this.currentPage = data.currentPage;
        this.totalPages = data.totalPages;
        this.totalNews = data.totalNews;
        this.error = null;
      } catch (error) {
        console.error('Error fetching news:', error);
        this.error = 'Failed to fetch news.';
      } finally {
        this.loading = false;
      }
    },
    async postComment(id: string){
      try {
        
      } catch (error) {
        const toastStore = useToastStore()
        toastStore.addToast({
          type: 'error',
          title: 'An error has occured',
          message: 'Could not send comment. Try again later.'
        })
      }
    }
  },
});
