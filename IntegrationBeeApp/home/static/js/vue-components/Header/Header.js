import ActionButtons from "../ActionButtons/ActionButtons.js";


const {ref, onMounted, onUnmounted} = Vue


const logo = "https://raw.githubusercontent.com/makschernetskyi/IntegrationBee/0a3d09ab877c0d5c61987f34f6f4d123e59b2a10/Media/Integration_bee_logo_vec.svg"

export default {
    components: {
        ActionButtons
    },
    setup(){


        const windowSize = ref(window.innerWidth)

        const handleResize = () => {
          windowSize.value = window.innerWidth;
        };

        onMounted( () => window.addEventListener("resize", handleResize))
        onUnmounted( () => window.removeEventListener("resize", handleResize))

        return {logo, windowSize}

    },
    template: `
        <header class="Header">
            <div class="Header-Logo" v-if="windowSize >= 1000">
                <img :src="logo" alt="logo">
            </div>
            <ActionButtons/>
        </header>
    `
}