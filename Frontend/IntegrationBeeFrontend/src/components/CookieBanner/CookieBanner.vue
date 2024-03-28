<script setup>

  defineEmits(['cookieBanner:close'])



</script>
<template>
  <div class="CookieBanner">
      <div class="CookieBanner-Content">
          <h6 class="CookieBanner-Content-header">We use cookies</h6>
          <p class="CookieBanner-Content-text">
              We use only cookies that are vital for the website to work properly.
              No data is send to a third party.
          </p>
      </div>
      <button class="CookieBanner-AcceptBtn" @click="$emit('cookieBanner:close')">OK</button>
  </div>
</template>