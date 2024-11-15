<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  modelValue: boolean;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void;
}>();

const checked = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    checked.value = newVal;
  }
);

const emitChange = () => {
  emits('update:modelValue', checked.value);
};
</script>

<template>
  <label class="inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      v-model="checked"
      @change="emitChange"
      class="hidden"
    />
    <span
      class="relative w-8 h-8 border-2 rounded-full transition-all duration-300 flex items-center justify-center overflow-visible"
      :class="[
        checked ? 'bg-primary border-primary' : 'bg-white border-gray-300',
      ]"
    >
      <svg
        class="w-9 h-9 text-screenBlack absolute top-[-4px] left-[-3px] origin-center scale-[1.3]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M5 13l4 4L19 7"
          :class="checked ? 'draw-checkmark' : 'undraw-checkmark'"
        />
      </svg>
    </span>
  </label>
</template>

<style scoped>
.draw-checkmark {
  stroke-dasharray: 22;
  stroke-dashoffset: 22;
  animation: draw 0.5s forwards;
}

@keyframes draw {
  to {
    stroke-dashoffset: 0;
  }
}

.undraw-checkmark {
  stroke-dasharray: 22;
  stroke-dashoffset: 0;
  animation: undraw 0.5s forwards;
}

@keyframes undraw {
  to {
    stroke-dashoffset: 22;
  }
}
</style>
