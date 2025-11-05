<script setup lang="ts">
	import { computed } from 'vue';
	import 'vidstack/elements';
	import 'vidstack/styles/defaults.css';
	import 'vidstack/styles/community-skin/video.css';

	const props = defineProps<{
		options: {
			sources?: Array<{
				src: string;
				type?: string;
			}>;
			autoplay?: boolean;
			controls?: boolean;
		};
	}>();

	// Extract video URL from options
	const videoSrc = computed(() => {
		return props.options?.sources?.[0]?.src || '';
	});

	const videoType = computed(() => {
		return props.options?.sources?.[0]?.type || '';
	});

	// Check if it's a YouTube video
	const isYouTube = computed(() => {
		const src = videoSrc.value;
		const type = videoType.value;
		return type === 'video/youtube' || 
		       src.includes('youtube.com') || 
		       src.includes('youtu.be');
	});

	// Extract YouTube video ID and timestamp from URL - handles various formats
	const getYouTubeInfo = (url: string): { videoId: string | null; startTime: number | null } => {
		if (!url) return { videoId: null, startTime: null };
		
		let videoId: string | null = null;
		let startTime: number | null = null;
		
		// Extract timestamp from URL (handles &t=17s, &t=1m17s, &start=17, etc.)
		const timeMatch = url.match(/[&?](?:t|start)=([0-9]+)(?:s|m|h)?/i);
		if (timeMatch) {
			const timeStr = timeMatch[1];
			// Check if it's in format like "1m17s" or just seconds
			const fullTimeMatch = url.match(/[&?]t=((?:[0-9]+h)?(?:[0-9]+m)?(?:[0-9]+s)?)/i);
			if (fullTimeMatch) {
				const timePart = fullTimeMatch[1];
				// Parse hours, minutes, seconds
				const hoursMatch = timePart.match(/(\d+)h/i);
				const minutesMatch = timePart.match(/(\d+)m/i);
				const secondsMatch = timePart.match(/(\d+)s/i);
				const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
				const minutes = minutesMatch ? parseInt(minutesMatch[1]) : 0;
				const seconds = secondsMatch ? parseInt(secondsMatch[1]) : 0;
				startTime = hours * 3600 + minutes * 60 + seconds;
			} else {
				// Just seconds
				startTime = parseInt(timeStr);
			}
		}
		
		// Handle different YouTube URL formats
		// https://www.youtube.com/watch?v=VIDEO_ID&t=17s
		// https://youtu.be/VIDEO_ID?t=17s
		// https://www.youtube.com/embed/VIDEO_ID
		
		// Try youtu.be format first
		const shortMatch = url.match(/(?:youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
		if (shortMatch) {
			videoId = shortMatch[1];
		}
		
		// Try watch?v= format (handles URLs like https://www.youtube.com/watch?v=1c6uazlr3Eo&t=17s)
		if (!videoId) {
			const watchMatch = url.match(/(?:watch\?v=|v=)([a-zA-Z0-9_-]{11})/);
			if (watchMatch) {
				videoId = watchMatch[1];
			}
		}
		
		// Try embed format
		if (!videoId) {
			const embedMatch = url.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
			if (embedMatch) {
				videoId = embedMatch[1];
			}
		}
		
		// If the URL is just the video ID (11 characters)
		if (!videoId && url.length === 11 && /^[a-zA-Z0-9_-]{11}$/.test(url)) {
			videoId = url;
		}
		
		return { videoId, startTime };
	};

	const youtubeInfo = computed(() => {
		if (!isYouTube.value) return { videoId: null, startTime: null };
		return getYouTubeInfo(videoSrc.value);
	});

	const youtubeId = computed(() => youtubeInfo.value.videoId);
	const youtubeStartTime = computed(() => youtubeInfo.value.startTime);

	const youtubeEmbedUrl = computed(() => {
		if (!youtubeId.value) return '';
		// Build embed URL with start time if present
		let embedUrl = `https://www.youtube.com/embed/${youtubeId.value}`;
		if (youtubeStartTime.value !== null && youtubeStartTime.value > 0) {
			embedUrl += `?start=${youtubeStartTime.value}`;
		}
		return embedUrl;
	});

	const videoTitle = computed(() => {
		return 'Integration Bee video';
	});
</script>

<template>
	<!-- YouTube videos: use iframe -->
	<div 
		v-if="isYouTube && youtubeId"
		class="overflow-hidden rounded-[30px] lg:rounded-3xl w-full aspect-video border-pearl-white border-4 box-content"
	>
		<iframe
			:key="youtubeId"
			:src="youtubeEmbedUrl"
			class="w-full h-full"
			title="Integration Bee video"
			frameborder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
			allowfullscreen
		></iframe>
	</div>
	<!-- Regular videos: use Vidstack -->
	<media-player
		v-else-if="videoSrc"
		:title="videoTitle"
		:src="videoSrc"
		class="overflow-hidden rounded-[30px] lg:rounded-3xl w-full aspect-video border-pearl-white border-4 box-content"
		playsinline
		crossorigin
	>
		<media-provider />
		<media-video-layout />
	</media-player>
	<!-- Fallback if no video URL -->
	<div v-else class="overflow-hidden rounded-[30px] lg:rounded-3xl w-full aspect-video border-pearl-white border-4 box-content bg-screenBlack flex items-center justify-center">
		<p class="text-pearl-white">No video available</p>
	</div>
</template>

<style>
/* Vidstack focus visible styles for accessibility - WCAG 2.4.7 */
media-player button:focus-visible,
media-player [role="button"]:focus-visible {
	outline: 3px solid #F2F1F0 !important;
	outline-offset: 2px !important;
	border-radius: 4px !important;
}

media-player input:focus-visible,
media-player select:focus-visible {
	outline: 3px solid #F2F1F0 !important;
	outline-offset: 2px !important;
	border-radius: 4px !important;
}

media-player [role="slider"]:focus-visible {
	outline: 3px solid #F2F1F0 !important;
	outline-offset: 2px !important;
	border-radius: 4px !important;
}
</style>
