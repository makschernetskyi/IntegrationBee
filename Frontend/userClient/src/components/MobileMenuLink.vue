<script setup lang="ts">
import { toRefs } from 'vue';
import { RouterLink } from 'vue-router';


const props = defineProps({
    to: {type: String, required: true},
    isShown: {type: Boolean},
    disabled: {type: Boolean}
})

const emit = defineEmits(['closeMenu'])

const {to,isShown, disabled} = toRefs(props)

</script>
<template>

    <transition
        enter-from-class="[transform:rotateY(90deg)]"
        enter-active-class="transition-all duration-200"
        enter-to-class="[transform:rotateY(0deg)]"
        leave-from-class="[transform:rotateY(0deg)]"
        leave-active-class="transition-all duration-200"
        leave-to-class="[transform:rotateY(90deg)]"
    >
        <li v-if="isShown" :class="`origin-left ${disabled ? 'pointer-events-none' : ''}`">
            <RouterLink :to="to" @click="emit('closeMenu')" class="cursor-pointer text-subtitle">
                <slot></slot>
            </RouterLink>
        </li>
    </transition>

</template>