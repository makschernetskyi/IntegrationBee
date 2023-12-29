import Header from "./vue-components/Header/Header.js"

const { createApp, ref } = Vue

const App = {
    components:{
        Header
    },
    data() {
      return {
          testPiece: "lalalala"
      }
    },
    setup() {
      const message = ref('Hello vuelify!')
      return {
          message
      }
    },
    template: `
        <Header/>
        <main>main</main>
    `
}


createApp(App).mount('#app')