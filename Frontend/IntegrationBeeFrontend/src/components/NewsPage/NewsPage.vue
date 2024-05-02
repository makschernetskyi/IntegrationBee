
<script setup>
    import NewsItem from "./NewsItem.vue"
    import {useStore} from "@/store/index.js";

    import {onMounted, onBeforeUnmount} from 'vue'

    const ITEMS_PER_PAGE = 10;


    const store = useStore().newsPage

    const searchParams = new URLSearchParams(window.location.hash.split('/').pop());
    let pageNumber = 1
    if(searchParams.has("page")){
        pageNumber = searchParams.get("page")
    }


    onMounted(async ()=>{
        await Promise.all([store.fetchNewsPageInfo(), store.fetchNewsInfo(pageNumber,ITEMS_PER_PAGE)])
    })

    onBeforeUnmount(()=>{
        store.$reset()
    })


    const content = store.$state;
</script>
<template>
    <div class="NewsPage">
        <h1 class="NewsPage-header">{{content.headerText}}</h1>
        <div class="NewsPage-Feed">
            <NewsItem v-for="news in store.newsLatestToFirst" :content="news.content" :header="news.header"/>
        </div>
    </div>
</template>