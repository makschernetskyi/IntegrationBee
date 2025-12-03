<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, onUnmounted } from 'vue'
import Flag from '@/components/Flag.vue'

// Define props
const props = defineProps<{
  modelValue: string;  // The selected option
  options: string[];   // The list of available options
  withFlags?: boolean; // If true, render country flags next to options
}>()

// Define emits to support v-model usage
const emits = defineEmits(['update:modelValue'])

// Track dropdown open/closed state
const isOpen = ref(false)

// Ref for the component's root element
const dropdownRef = ref<HTMLElement | null>(null)

// Toggle the dropdown open/closed
function toggleDropdown() {
  isOpen.value = !isOpen.value
}

// Handle selecting an option
function selectOption(option: string) {
  emits('update:modelValue', option)
  isOpen.value = false
}

// Close dropdown when clicking outside the component
function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative inline-block text-left">
    <!-- Trigger button -->
    <button
      type="button"
      @click="toggleDropdown"
      class="inline-flex items-center justify-between h-full w-full text-screenBlack bg-transparent rounded-[inherit] focus:outline-none overflow-hidden gap-2"
    >
      <span class="flex items-center gap-2 min-w-0">
        <Flag
          v-if="props.withFlags && modelValue"
          :country="modelValue"
          class="w-[2rem] h-[1.4rem] rounded-sm shadow-sm shrink-0"
          aria-hidden="true"
        />
        <span class="w-min-0 text-ellipsis whitespace-nowrap overflow-hidden max-w-full">
          {{ modelValue || 'Select your country' }}
        </span>
      </span>
      <!-- Simple arrow icon -->
      <svg
        class="h-4 w-4 text-screenBlack shrink-0"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        role="img"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="isOpen"
      class="absolute z-30 left-0 mt-2 max-h-[20rem] overflow-hidden overflow-y-auto w-max min-w-full bg-white rounded-xl shadow-lg border border-screenBlack focus:outline-none "
    >
      <ul>
        <li
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
          class="cursor-pointer px-4 py-2 text-screenBlack transition-colors duration-100 hover:bg-gray-100 flex items-center gap-3 whitespace-nowrap"
        >
          <Flag
            v-if="props.withFlags"
            :country="option"
            class="w-[2rem] h-[1.4rem] rounded-sm shadow-sm shrink-0"
            aria-hidden="true"
          />
          <span>{{ option }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
