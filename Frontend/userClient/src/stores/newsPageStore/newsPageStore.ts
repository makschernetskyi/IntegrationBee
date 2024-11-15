import { defineStore } from 'pinia';
import axios from 'axios';
import { useToastStore } from '../toastStore/toastStore';
import { noAuthApi } from '@/api';
import { formatDateToUTC } from '@/utils/formatDateToUTC';
import { sanitizeHtml } from '@/utils/htmlSanitizers';

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



export const useNewsPageStore = defineStore('newsPageStore', {
  state: () => ({
    title: '' as string,
    newsItems: [] as NewsItem[],
    currentPage: 1 as number,
    totalPages: 1 as number,
    loading: false as boolean,
    error: null as string | null,
    commentText: '' as string
  }),
  actions: {
    async fetchNewsPage() {
      try {
        const response = await noAuthApi.get('/cms/pages/', {
          params: {
            type: "home.NewsPage",
            fields: "title"
          }
        });
        this.title = response.data.items["0"].title;
      } catch (error) {
        useToastStore().addToast({
          type: "error",
          title: "Error has occured",
          message: "Could not fetch news page, try again later."
        })
      }
    },
    async fetchNews(page:number = 0) {
      this.loading = true;
      const NEWS_PER_PAGE = 10
      try {
        const response = await noAuthApi.get('/cms/pages/', {
          params: {
            type: "home.NewsPost",
            fields: "title,id,text,picture",
            offset: page*NEWS_PER_PAGE
          }
        })
        const data = response.data.items;
        this.newsItems = data.map((newsItem: any)=>({
          id: newsItem.id,
          title: newsItem.title,
          content: newsItem.text,
          pictureSrc: newsItem.picture?.meta.download_url,
          date: formatDateToUTC(newsItem.meta.first_published_at)
        }))
        

        //this.newsItems = data.;
        //this.currentPage = page
        //this.totalPages = data.totalPages;
        //this.error = null;
      } catch (error) {
        
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
