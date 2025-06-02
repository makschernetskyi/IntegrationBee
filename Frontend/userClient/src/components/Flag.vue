<script setup lang="ts">
import { defineProps, computed, defineAsyncComponent } from 'vue'

const props = defineProps<{ country: string }>()
const flagModules = import.meta.glob('@/assets/flags/*.svg') as Record<string, () => Promise<{ default: any }>>
const countryCode = props.country.toLowerCase().replace(/\s+/g, '_')
const FlagComponent = computed(() => {
  const expectedFileName = `${countryCode}.svg`
  const flagKey = Object.keys(flagModules).find(key => key.endsWith(expectedFileName))
  if (!flagKey) {
    console.error(`Flag for country "${props.country}" not found.`)
    return null
  }
  return defineAsyncComponent(flagModules[flagKey])
})
</script>

<template>
  <div>
    <component v-if="FlagComponent" :is="FlagComponent" class="block w-full h-full"/>
    <div v-else>{{ countryCode }}</div>
  </div>
</template>
