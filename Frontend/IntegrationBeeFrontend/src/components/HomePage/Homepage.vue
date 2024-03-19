<script setup>

    import {onMounted} from 'vue'
    import HomePageSection from "./HomePageSection.vue";

    import {useStore} from "@/store/index.js";

    const store = useStore().homePage;


    onMounted(async ()=>{
        if(store.isFetched){
            return
        }
        await store.fetchHomePageInfo();
    })
    const content = store.$state

</script>
<template>
    <div class="Home">
        <HomePageSection class="Home-IntroSection">
            <div class="Home-IntroSection-Illustration">
                <img :src="content.picture" alt="">
            </div>
            <div class="Home-IntroSection-Description">
                <div class="Home-IntroSection-Description-Title">
                    <h1>{{content.titleSectionHeaderText}}</h1>
    <!--                        <p>Integration bee format event is coming to Vienna!!!</p>-->
                </div>
                <div class="Home-IntroSection-Description-About" v-html="content.titleSectionDescriptionText">
                </div>

                <div class="Home-IntroSection-Description-Invitation">
                    <p>Want to join?</p> <router-link to="/signUp">Sign Up</router-link>
                </div>

            </div>
        </HomePageSection>
        <HomePageSection class="Home-MotivationSection">
            <h2 class="Home-MotivationSection-header">
                {{content.bulletPointsHeaderText}}
            </h2>
            <ul class="Home-MotivationSection-ReasonsList">

                <li v-for="(bulletPoint, index) in content.bulletPoints" class="Home-MotivationSection-ReasonsList-Item" :key="index">
                    <h3 class="Home-MotivationSection-ReasonsList-Item-header">
                        {{bulletPoint.header}}
                    </h3>
                    <p class="Home-MotivationSection-ReasonsList-Item-info">
                        {{bulletPoint.text}}
                    </p>
                </li>

            </ul>
        </HomePageSection>
    </div>
</template>