<script setup>
    import {onBeforeMount} from "vue";
    import TeamMembersCarousel from "./teamMembersCarousel.vue";
    import {useStore} from "@/store/index.js";

    const contactsStore = useStore().contactsPage;

    onBeforeMount(()=>{
        if(!contactsStore.getContactsPageInfoRequest.status)
            contactsStore.getContactsPageInfo()
    })


</script>
<template>
  <div class="Contacts">
      <section class="Contacts-Section Contacts-AboutUs">
          <h2 class="Contacts-Section-header Contacts-AboutUs-header">About us:</h2>
          <p class="Contacts-AboutUs-text">{{ contactsStore.aboutUs }}</p>
      </section>
      <section class="Contacts-Section Contacts-Contacts">
          <h2 class="Contacts-Section-header Contacts-Contacts-header">Contact:</h2>
          <p v-for="contact in contactsStore.contacts?.split('\n')" class="Contacts-Contacts-contact">{{ contact }}</p>
      </section>
      <section class="Contacts-Section Contacts-Socials">
          <h2 class="Contacts-Section-header Contacts-Socials-header">Socials:</h2>
          <p v-for="social in contactsStore.socials?.split('\n')" class="Contacts-Socials-social">{{ social }}</p>
      </section>
      <section class="Contacts-Section Contacts-Team">
          <h2 class="Contacts-Section-header Contacts-Team-header">Our Team:</h2>
          <team-members-carousel :team-members="contactsStore.teamMembers"></team-members-carousel>
      </section>
  </div>
</template>