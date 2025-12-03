<script setup lang="ts">
import { defineProps, computed, defineAsyncComponent } from 'vue'

const props = defineProps<{ country: string }>()
const svgFlagModules = import.meta.glob('@/assets/flags/*.svg') as Record<string, () => Promise<{ default: any }>>
const jpgFlagModules = import.meta.glob('@/assets/flags/*.jpg') as Record<string, () => Promise<{ default: any }>>
const countryCode = props.country.toLowerCase().replace(/\s+/g, '_')
const FlagComponent = computed(() => {
  // Try SVG first
  const expectedSvgFileName = `${countryCode}.svg`
  const svgFlagKey = Object.keys(svgFlagModules).find(key => key.endsWith(expectedSvgFileName))
  if (svgFlagKey) {
    return defineAsyncComponent(svgFlagModules[svgFlagKey])
  }
  
  // Try JPG if SVG not found
  const expectedJpgFileName = `${countryCode}.jpg`
  const jpgFlagKey = Object.keys(jpgFlagModules).find(key => key.endsWith(expectedJpgFileName))
  if (jpgFlagKey) {
    return defineAsyncComponent(jpgFlagModules[jpgFlagKey])
  }
  
  console.error(`Flag for country "${props.country}" not found.`)
  return null
})
</script>

<template>
  <div>
    <component v-if="FlagComponent" :is="FlagComponent" class="block w-full h-full" aria-hidden="true" role="img"/>
    <div v-else>{{ countryCode }}</div>
  </div>
</template>
