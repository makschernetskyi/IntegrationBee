<script setup>

    const props = defineProps(['content', 'header'])
    const {content, header} = props

</script>
<template>
    <article class="NewsPage-Feed-Item">
        <h2>{{header}}</h2>
        <p v-html="content"></p>
    </article>
</template>