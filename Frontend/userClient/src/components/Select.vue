<script setup lang="ts">
import { ref, defineProps, defineEmits, onMounted, onUnmounted } from 'vue'

// Define props
const props = defineProps<{
  modelValue: string;  // The selected option
  options: string[];   // The list of available options
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
      @click="toggleDropdown"
      class="inline-flex items-center justify-between px-6 py-2 bg-white h-full w-full text-gray-700 rounded-[inherit] hover:bg-gray-50 focus:outline-none overflow-hidden"
    >
      <span class="mr-2 w-min-0 text-ellipsis whitespace-nowrap overflow-hidden max-w-full">
        {{ modelValue }}
      </span>
      <!-- Simple arrow icon -->
      <svg
        class="h-4 w-4 text-gray-500"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      v-if="isOpen"
      class="absolute z-30 left-0 mt-2 max-h-[16rem] overflow-hidden overflow-y-auto w-max bg-white rounded-[inherit] shadow-lg ring-opacity-5 focus:outline-none "
    >
      <ul>
        <li
          v-for="option in options"
          :key="option"
          @click="selectOption(option)"
          class="cursor-pointer px-6 py-3 text-gray-700 transition-colors duration-100 hover:bg-gray-100"
        >
          {{ option }}
        </li>
      </ul>
    </div>
  </div>
</template>
