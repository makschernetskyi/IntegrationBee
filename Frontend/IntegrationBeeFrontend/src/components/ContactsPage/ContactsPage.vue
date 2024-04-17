<script setup>
import {computed, onBeforeMount} from "vue";
    import TeamMembersCarousel from "./teamMembersCarousel.vue";
    import {useStore} from "@/store/index.js";
    import {validEmailPattern} from "@/utils/regexPatterns.js";
import richTextFormatter from "@/utils/richTextFormatter.js";
import {formatLinksInText} from "@/utils/formatLinksInText.js";

    const contactsStore = useStore().contactsPage;

    onBeforeMount(()=>{
        if(!contactsStore.getContactsPageInfoRequest.status)
            contactsStore.getContactsPageInfo()
    })

    const contactsList = computed(()=>contactsStore.contacts?.split('\n').map(contact=>contact.trim()))


</script>
<template>
  <div class="Contacts">
      <section class="Contacts-Section Contacts-AboutUs">
          <h2 class="Contacts-Section-header Contacts-AboutUs-header">About us:</h2>
          <p class="Contacts-AboutUs-text">{{ contactsStore.aboutUs }}</p>
      </section>
      <section class="Contacts-Section Contacts-Contacts">
          <h2 class="Contacts-Section-header Contacts-Contacts-header">Contact:</h2>
          <template v-for="contact in contactsList">
              <p v-if="typeof contact === 'string' && contact.length" class="Contacts-Contacts-contact" v-html="formatLinksInText(richTextFormatter(contact))"></p>
              <br v-if="typeof contact === 'string' && !contact.length"/>
          </template>
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