<template>
	<div class="overflow-hidden">
	  <video ref="videoPlayer" class="video-js w-full h-full"></video>
	</div>
  </template>
  
<script setup lang="ts">
	import { ref, onMounted, onBeforeUnmount } from 'vue';
	import videojs from 'video.js';
	import "video.js/dist/video-js.css"
	import 'videojs-youtube';
	
	// Props definition
	const props = defineProps({
		options: {
			type: Object,
			default: () => ({})
		}
	});
	
	// Refs and player initialization
	const videoPlayer = ref<HTMLVideoElement | null>(null);
	let player:any = null;
	
	// Lifecycle hooks
	onMounted(() => {
		if (videoPlayer.value) {
			//@ts-expect-error - copied from documentation
			player = videojs(videoPlayer.value, props.options, function() {
				this.log('onPlayerReady', this);
			});
		}
	});
	
	onBeforeUnmount(() => {
		if (player) {
			player.dispose();
		}
	});
</script>
<style lang="pcss">
.vjs-big-play-button {
  background-color: #FBC151 !important; /* Change background color */
  color: #242424 !important; /* Change the icon color */
  border: none !important;
}

.vjs-big-play-button:hover {
  background-color: #F2F1F0 !important;
  color: #001D37 !important;
}

</style>
  