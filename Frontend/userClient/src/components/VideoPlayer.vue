<template>
	<div class="overflow-hidden">
		<video ref="videoPlayer" class="video-js w-full h-full"></video>
	</div>
</template>
  
<script setup lang="ts">
	import { ref, onMounted, onBeforeUnmount, toRefs, watch } from 'vue';
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

	const {options} = toRefs(props)
	
	// Refs and player initialization
	const videoPlayer = ref<HTMLVideoElement | null>(null);
	const player = ref<any>(null);
	
	// Lifecycle hooks
	onMounted(() => {
		if (videoPlayer.value) {
			
			player.value = videojs(videoPlayer.value, options.value, function() {
				this.log('onPlayerReady', this);
			});
		}
	});

	watch(options, (newOptions)=>{
		console.log(newOptions)
		if (player.value) {
          player.value.src(newOptions.sources[0]);
        }
	})
	
	onBeforeUnmount(() => {
		if (player.value) {
			player.value.dispose();
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
  