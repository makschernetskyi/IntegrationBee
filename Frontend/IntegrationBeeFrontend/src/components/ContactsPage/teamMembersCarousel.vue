<script setup>
import {ref, toRefs, onMounted, onBeforeUnmount, onUnmounted} from "vue";

    const placeholderImage = "/static/assets/IntegrationBeeLogo.svg"

    const props = defineProps({
        teamMembers: {type: Array, required: false}
    })

    const {teamMembers} = toRefs(props)


    const marginLeft = ref(0)

    const carousel = ref(null)
    const carouselContent = ref(null)

    const getRootFontSize = () => parseFloat(getComputedStyle(document.documentElement).fontSize);





    const scrollLeft = () =>{
        if(marginLeft.value)
            marginLeft.value-=10
    }

    const scrollRight = () =>{
        if(carousel.value.getBoundingClientRect().right < carouselContent.value.getBoundingClientRect().right)
            marginLeft.value+=10
    }

</script>
<template>
  <div class="TeamMembersCarousel">
      <button @click="scrollLeft" class="TeamMembersCarousel-leftBtn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/></svg>
      </button>
      <button @click="scrollRight" class="TeamMembersCarousel-rightBtn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"/></svg>
      </button>
      <div class="TeamMembersCarousel-Carousel" ref="carousel">
          <ul class="TeamMembersCarousel-Carousel-Content" :style="{marginLeft:`-${marginLeft}rem`}" ref="carouselContent">
              <li v-for="member in teamMembers" class="TeamMembersCarousel-Carousel-Content-Item">
                  <div class="TeamMembersCarousel-Carousel-Content-Item-picture">
                      <img :src="member.picture || placeholderImage" alt="profile picture">
                  </div>
                  <p class="TeamMembersCarousel-Carousel-Content-Item-name">{{ member.name }}</p>
                  <p class="TeamMembersCarousel-Carousel-Content-Item-role">{{ member.role }}</p>
                  <p class="TeamMembersCarousel-Carousel-Content-Item-contacts">{{ member.contacts }}</p>
              </li>

          </ul>
      </div>
  </div>
</template>