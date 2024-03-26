<template>
  <div class="AuthInput" v-bind="$attrs">
    <label :for="`AuthInput-label--${name}${uniqueId}`" class="AuthInput-label">{{title}}:</label>
    <input :id="`AuthInput-label--${name}${uniqueId}`" :type="type" :name="name" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" class="AuthInput-input" autocomplete="on" :placeholder="placeholder">
    <p v-if="isError" class="AuthInput-error">{{ errorMsg }}</p>
  </div>
</template>
<script setup>
  import {toRefs, onMounted} from "vue";
  import componentUuid from "@/utils/componentUuid.js";
  // const props = defineProps(['value, title, placeholder, type, name, isError, errorMsg, uniqueKey'])
  const props = defineProps({
      title:{ type: String, required:true },
      modelValue: { type: String, required:true },
      placeholder: { type: String, required:true },
      type: { type: String, required:true },
      name: { type: String, required:true },
      isError: { type: Boolean, required:true },
      errorMsg: { type: String, required:true },
  })
  const {modelValue, title, placeholder, type, name, isError, errorMsg} = toRefs(props)
  const uniqueId = componentUuid();


</script>
