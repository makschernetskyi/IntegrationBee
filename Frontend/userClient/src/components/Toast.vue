<!-- src/components/Toast.vue -->

<script setup lang="ts">
import { useToastStore } from '@/stores/toastStore/toastStore';

const toastStore = useToastStore();

function removeToast(id: number) {
  toastStore.removeToast(id);
}

function toastClasses(type: string) {
  switch (type) {
    case 'success':
      return 'bg-green text-white';
    case 'error':
      return 'bg-red text-white';
    case 'info':
      return 'bg-blue text-white';
    case 'warning':
      return 'bg-yellow text-black';
    default:
      return 'bg-gray text-white';
  }
}
</script>

<template>
  <div class="fixed top-5 right-5 z-[2000] space-y-4">
    <transition-group
      name="toast"
      tag="div"
      class="space-y-4"
      enter-active-class="transition transform ease-out duration-300"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition transform ease-in duration-300"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        :class="[
          'max-w-[90vw] w-[50rem] py-4 px-8 rounded-xl shadow-lg flex items-start',
          toastClasses(toast.type),
        ]"
      >
        <div class="flex-1">
          <p class="font-heading text-body-lg">{{ toast.title }}</p>
          <p class="font-body text-body">{{ toast.message }}</p>
        </div>
        <button
          @click="removeToast(toast.id)"
          class="ml-4 focus:outline-none"
        >
          <!-- SVG icon for close -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>
