<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink } from 'vue-router';

const showModal = ref(false);

onMounted(() => {
  const consent = localStorage.getItem('cookieConsent');
  if (!consent) {
    showModal.value = true;
  }
});

function acceptCookies() {
  localStorage.setItem('cookieConsent', 'true');
  showModal.value = false;
}
</script>

<template>
  <transition
    enter-active-class="transition duration-500 transform"
    enter-from-class="translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition duration-500 transform"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="translate-y-full opacity-0"
  >
    <div
      v-if="showModal"
      class="fixed bottom-0 left-0 right-0 p-[2rem] bg-pearl-white shadow-lg z-[10000] shadow"
    >
      <div
        class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between"
      >
        <div
          class="text-black mb-4 md:mb-0 md:mr-4 font-body text-body text-center md:text-left"
        >
          We use cookies to enhance your experience. By continuing to visit this
          site, you agree to our use of cookies. For more details, see our
          <RouterLink to="/terms_of_use" class="text-secondary underline">
            Terms of Use
          </RouterLink>
          .
        </div>
        <button
          @click="acceptCookies"
          class="bg-primary text-secondary px-6 py-2 rounded-xl lg:hover:bg-primary-400 transition-colors duration-100 font-body text-body"
        >
          Accept
        </button>
      </div>
    </div>
  </transition>
</template>
