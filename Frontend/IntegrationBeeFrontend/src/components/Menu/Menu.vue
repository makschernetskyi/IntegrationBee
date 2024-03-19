<script setup>
  import {ref} from 'vue';
  const showContent = ref("false")



</script>

<template>
  <div class="SideNavigation-Menu">
      <router-link to="/"  class="SideNavigation-Menu-Item" :class="{ 'SideNavigation-Menu-Item--active': $route.matched.some(({ name }) => name === 'home')}">Home</router-link>
      <router-link to="/news"  class="SideNavigation-Menu-Item" :class="{ 'SideNavigation-Menu-Item--active': $route.matched.some(({ name }) => name === 'news')}">News</router-link>
      <router-link to="/competitions"  class="SideNavigation-Menu-Item" :class="{ 'SideNavigation-Menu-Item--active': $route.matched.some(({ name }) => name === 'competitions')}"> Competitions</router-link>
      <router-link to="/contact"  class="SideNavigation-Menu-Item" :class="{ 'SideNavigation-Menu-Item--active': $route.matched.some(({ name }) => name === 'contact')}">Contact</router-link>
  </div>
</template>