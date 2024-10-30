<script setup>
    import ActionButtons from "@/components/ActionButtons/ActionButtons.vue";
    import ActionsButtonsMobile from "@/components/ActionButtonsMobile/ActionsButtonsMobile.vue";

    import {ref, onMounted, onUnmounted, toRef} from 'vue';


    const logo = "https://raw.githubusercontent.com/makschernetskyi/IntegrationBee/0a3d09ab877c0d5c61987f34f6f4d123e59b2a10/Media/Integration_bee_logo_vec.svg"


    const props = defineProps({
      isMenuVisible: Boolean,
    })


    const windowSize = ref(window.innerWidth)
    const isMenuVisible = toRef(props.isMenuVisible)

    const handleResize = () => {
      windowSize.value = window.innerWidth;
    };

    onMounted( () => window.addEventListener("resize", ()=>{
        handleResize()
    }))
    onUnmounted( () => window.removeEventListener("resize", ()=>{
        handleResize()
    }))
</script>
<template>
    <header class="Header">
        <div class="Header-Logo" v-if="windowSize >= 1000">
            <img :src="logo" alt="logo">
        </div>
        <ActionButtons v-if="windowSize >= 1000"/>
        <!-- mobile version -->
        <button v-if="windowSize < 1000" @click="()=>{$emit('menuVisibilityBtnClick')}" class="Header-OpenMenuButton" title="menu" aria-label="menu">
            <svg v-if="!isMenuVisible" xmlns="http://www.w3.org/2000/svg" height="16" width="14" viewBox="0 0 448 512">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
            <svg v-if="isMenuVisible" xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
        </button>
        <ActionsButtonsMobile v-if="windowSize < 1000"/>
    </header>
</template>