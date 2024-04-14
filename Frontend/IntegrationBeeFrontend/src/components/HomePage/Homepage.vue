<script setup>

    import {onMounted} from 'vue'
    import HomePageSection from "./HomePageSection.vue";

    import {useStore} from "@/store/index.js";
    import formatRichText from "@/utils/richTextFormatter.js"

    const store = useStore().homePage;


    onMounted(async ()=>{
        if(store.isFetched){
            return
        }
        await store.fetchHomePageInfo();
    })
    //const demoVideoInfo = computed(()=>store.aboutDemoVideoLink)

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
                </div>
                <div class="Home-IntroSection-Description-About" v-html="content.titleSectionDescriptionText">
                </div>

                <div class="Home-IntroSection-Description-Invitation">
                    <p>Want to join?</p> <router-link to="/signUp">Sign Up</router-link>
                </div>

            </div>
            <span class="ScrollLowerHint">
                <svg viewBox="0 -4.5 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs></defs><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="Dribbble-Light-Preview" transform="translate(-180.000000, -6684.000000)" fill="#FFCC00"><g id="icons" transform="translate(56.000000, 160.000000)"><path d="M144,6525.39 L142.594,6524 L133.987,6532.261 L133.069,6531.38 L133.074,6531.385 L125.427,6524.045 L124,6525.414 C126.113,6527.443 132.014,6533.107 133.987,6535 C135.453,6533.594 134.024,6534.965 144,6525.39" id="arrow_down-[#339]"></path></g></g></g></svg>
            </span>
        </HomePageSection>
        <HomePageSection class="Home-AboutSection">
            <div class="Home-AboutSection-Description">
                <h2 class="Home-AboutSection-Description-title">What is Integration Bee?</h2>
                <p class="Home-AboutSection-Description-content" v-html="formatRichText(content.aboutDescription || '')"></p>
            </div>
            <div class="Home-AboutSection-Demo">
                <vue-plyr v-if="content.aboutDemoVideoLink">
                    <div data-plyr-provider="youtube" :data-plyr-embed-id="content.aboutDemoVideoLink"></div>
                </vue-plyr>
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
        <HomePageSection class="Home-SponsorsSection">
            <div class="Home-SponsorsSection-Content">
                <h2 class="Home-SponsorsSection-Content-header">
                    Supported by
                </h2>
                <ul class="Home-SponsorsSection-Content-SponsorsList">

                    <li v-for="(sponsor, index) in content.sponsors" class="Home-SponsorsSection-Content-SponsorsList-Item" :key="index">
                        <img :src="sponsor.picture" alt="sponsor logo">
                    </li>

                </ul>
                <h2 class="Home-SponsorsSection-Content-header">With Appreciation to:</h2>
                <ul class="Home-SponsorsSection-Content-AcknowledgementsList">

                    <li v-for="(acknowledgement, index) in content.acknowledgements" class="Home-SponsorsSection-Content-AcknowledgementsList-Item" :key="index">
                        {{acknowledgement.name}}
                    </li>

                </ul>
            </div>

        </HomePageSection>
    </div>
</template>