const { createApp, ref } = Vue

createApp({
    delimiters: ['[[',']]'],
    setup() {
      const message = ref('Hello vuelify!')
      return {
        message
      }
    }
}).mount('#app')