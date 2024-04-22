import axios from 'axios'
import {defineStore} from 'pinia'

import {useErrorStore} from "@/store/modules/error.js";


const PAGES_URL = "/api/v2/cms/pages/"


export const useNewsPageStore = defineStore('newsPage', {
    state: ()=>({
        headerText: null,
        news:[],
        fetchNewsPageInfoRequest:{
            status: null,
            code: null,
            error: null,
            errorMSG: null,
        },
        fetchNewsInfoRequest:{
            status: null,
            code: null,
            error: null,
            errorMSG: null,
        }
    }),
    getters:{
        newsLatestToFirst(state){
            return state.news.reverse()
        }
    },
    actions: {
        async fetchNewsPageInfo(){
            try {
                // Reset the request status before making a new request
                this.fetchNewsPageInfoRequest = {
                    status: 'pending',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

                const response = await axios.get(PAGES_URL, {
                    params: {
                        type: "home.NewsPage",
                        fields: "page_title"
                    }
                });

                const data = response.data;
                const pageInfo = data.items["0"];
                this.headerText = pageInfo.page_title;

                // Update request status after successful response
                this.fetchNewsPageInfoRequest = {
                    status: 'resolved',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

            } catch (error) {

                // Update request status and error details if request fails
                this.fetchNewsPageInfoRequest = {
                    status: 'rejected',
                    code: error.response?.status,
                    error: error,
                    errorMSG: error.message,
                };
            }
        },
        async fetchNewsInfo(page, itemsPerPage=10){
            try {
                // Reset the request status before making a new request
                this.fetchNewsInfoRequest = {
                    status: 'pending',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

                const response = await axios.get(PAGES_URL, {
                    params: {
                        type: "home.NewsPost",
                        fields: "header,text,picture",
                        limit: itemsPerPage,
                        offset: itemsPerPage * (page - 1)
                    }
                });

                const data = response.data;
                const newsItems = data.items;
                newsItems.forEach(item => {
                    this.news.push({
                        header: item.header,
                        content: item.text,
                        pictureUrl: item.picture?.download_url
                    });
                });

                // Update request status after successful response
                this.fetchNewsInfoRequest = {
                    status: 'resolved',
                    code: null,
                    error: null,
                    errorMSG: null,
                };

            } catch (error) {

                const errorStore = useErrorStore()
                errorStore.addError({text: 'Error has occurred while fetching news page data. Try again later.'})

                // Update request status and error details if request fails
                this.fetchNewsInfoRequest = {
                    status: 'rejected',
                    code: error.response?.status,
                    error: error,
                    errorMSG: error.message,
                };
            }

        }
    }
})