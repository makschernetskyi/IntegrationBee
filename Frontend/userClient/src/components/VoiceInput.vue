<script setup lang="ts">
//types for lingua recorder in src/lingua-recorder.d.ts
import {LinguaRecorder, AudioRecord} from 'lingua-recorder'
import { toRefs, ref } from 'vue';

const props = defineProps({
	label: {type: String},
	modelValue: {type: Blob},
})
const {label, modelValue} = toRefs(props)

const emit = defineEmits(['update:modelValue'])

const recorder = new LinguaRecorder()

const isRecording = ref(false)
const isRecorded = ref(false)
const isPlaying = ref(false)

const record = ref<any>(null)
const recordAudio = ref<any>(null)
const playingAudioProgress = ref<number>(0)
const recordDuration = ref<number>(0);

recorder.on('stopped', (audioRecord: AudioRecord)=>{
	record.value = audioRecord
	//@ts-ignore
	recordAudio.value = new Audio(URL.createObjectURL(audioRecord.getBlob()))
	recordAudio.value.addEventListener('ended', pauseRecording)
	recordAudio.value.addEventListener('timeupdate', displayAudioProgress);
	recordAudio.value.addEventListener('loadedmetadata', () => {
		recordDuration.value = recordAudio.value.duration;
	})
	//@ts-ignore
	emit('update:modelValue', audioRecord.getBlob())
})

function displayAudioProgress() {
  if (recordAudio.value && recordAudio.value.duration > 0) {
    playingAudioProgress.value = (recordAudio.value.currentTime / recordAudio.value.duration) * 100;
  }
}

const startRecording = ()=>{
	recorder.start()
	isRecording.value = true
}
const stopRecording = ()=>{
	recorder.stop()
	isRecording.value = false
	isRecorded.value = true
}
const playRecording = () =>{
	isPlaying.value = true
	if(recordAudio.value){
		recordAudio.value.play()
	}
}
function pauseRecording(){
	isPlaying.value = false
	if(recordAudio.value){
		recordAudio.value.pause()
	}
}
const restartRecording = ()=>{
	recorder.cancel()
	isRecording.value = false
	isRecorded.value = false
	isPlaying.value = false
	recordAudio.value = null;
	record.value = null;
	playingAudioProgress.value = 0;
	recordDuration.value = 0;
	emit('update:modelValue', null)
}

</script>
<template>
	<div class="w-full h-[8rem] flex items-end">
		<div class="h-[50%] w-full bg-white-100 rounded-[10px] flex justify-between items-center px-[2rem] relative text-screenBlack">
			<p :class="
				{
					'absolute left-[2rem] text-body font-heading text-screenBlack h-[100%] flex items-center will-change-transform transition-transform duration-100': true,
					'-translate-y-[100%]': isRecorded || isRecording
				}">
				{{ label }}
			</p>
			<div class="flex-1 h-full flex items-center p-2">
				<div v-if="isRecording" class="text-body">
					<p>recording...</p>
				</div>
				<div v-if="isRecorded && recordDuration" class="flex w-full flex-col items-start justify-center">
					<p class="text-text-sm">
						{{ Math.ceil(playingAudioProgress*recordDuration/100) + '/' + Math.ceil(recordDuration) + 's'}}
					</p>
					<div class="w-full h-[3px] bg-gray-200 flex justify-start">
						<div class="h-full w-full bg-primary origin-left transition-transform will-change-transform duration-75" 
							:style="{
								transform: `scaleX(${playingAudioProgress/100})`
							}"
						/>
					</div>
				</div>

			</div>
			<div class="h-full flex">
				<!--record button-->
				<div v-if="!isRecording && !isRecorded" class="h-full aspect-square p-1">
					<button
						title="record"
						@click="startRecording" 
						class="h-full aspect-square flex rounded-full bg-gray-50 fill-screenBlack lg:hover:fill-primary">
						<svg viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" class="w-full h-full fill-inherit">
							<path fill-rule="evenodd" clip-rule="evenodd" d="M15.2412 23.1224L19.5364 10.2668L27.2188 10.2668L31.514 23.1224L27.3586 31.1932L19.3967 31.1932L15.2412 23.1224ZM18.624 9L28.1312 9L32.8848 23.2275L31.0825 26.728H31.9633L33.8786 23.0715L35.0008 23.6594L29.5062 34.1489L29.3284 34.4884H28.9451H24.0843V36.2176H27.9464V37.4844H18.9553V36.2176H22.8174V34.4884H17.4566H17.0566L16.8847 34.1273L11.8896 23.6378L13.0334 23.0931L14.7643 26.728H15.6728L13.8704 23.2275L18.624 9ZM16.325 27.9949H15.3676L17.8565 33.2216H28.5619L31.2997 27.9949H30.4436V27.9688L28.1312 32.46L18.624 32.46L16.325 27.9949Z"/>
						</svg>
					</button>
				</div>
				<!--stop button-->
				<div v-if="isRecording && !isRecorded" class="h-full aspect-square p-1">
					<button
						title="end recording"
						@click="stopRecording" 
						class="h-full aspect-square flex rounded-full bg-gray-50 stroke-screenBlack lg:hover:stroke-primary">
						<svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full stroke-inherit">
							<rect x="14.635" y="13.635" width="18.73" height="19.73" rx="1.365" stroke-width="1.27"/>
						</svg>
					</button>
				</div>
				<!--play button-->
				<div v-if="!isRecording && isRecorded && !isPlaying" class="h-full aspect-square p-1">
					<button
						title="play"
						@click="playRecording" 
						class="h-full aspect-square flex rounded-full bg-gray-50 stroke-screenBlack lg:hover:stroke-primary">
						<svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full stroke-inherit">
							<path d="M17.3069 12.416L35.3069 22.8083C35.5502 22.9487 35.5502 23.3 35.3069 23.4405L17.3069 33.8328C17.0635 33.9732 16.7594 33.7976 16.7594 33.5167L16.7594 12.7321C16.7594 12.4511 17.0635 12.2755 17.3069 12.416Z" stroke-width="1.27"/>
						</svg>

					</button>
				</div>
				<!--pause playing-->
				<div v-if="!isRecording && isRecorded && isPlaying" class="h-full aspect-square p-1">
					<button
						title="pause"
						@click="pauseRecording" 
						class="h-full aspect-square flex rounded-full bg-gray-50 stroke-screenBlack lg:hover:stroke-primary">
						<svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full stroke-inherit">
							<rect x="25.635" y="12.635" width="4.73" height="21.73" rx="1.365" stroke-width="1.27"/>
							<rect x="16.635" y="12.635" width="4.73" height="21.73" rx="1.365" stroke-width="1.27"/>
						</svg>
					</button>
				</div>
				<!--restart recording-->
				<div v-if="!isRecording && isRecorded" class="h-full aspect-square p-1">
					<button
						title="record again"
						@click="restartRecording" 
						class="h-full aspect-square flex rounded-full bg-gray-50 stroke-screenBlack lg:hover:stroke-primary">
						<svg width="47" height="47" viewBox="0 0 47 47" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full stroke-inherit">
							<path d="M34 26.1228L31.671 32.274C31.4115 32.9593 30.798 33.4479 30.072 33.5473L20.5851 34.8465C19.8897 34.9417 19.1952 34.6654 18.7553 34.1185L12.7199 26.6144C12.2741 26.0601 12.1562 25.3108 12.4104 24.6464L15.9143 15.4856C16.1667 14.8257 16.7485 14.348 17.4448 14.2287L27.0095 12.5914C27.6919 12.4746 28.3862 12.719 28.845 13.2376L33.5 18.5M33.5 18.5L31.6429 12M33.5 18.5L27.7143 16.4386" stroke-width="1.27"/>
						</svg>

					</button>
				</div>
			</div>
		</div>
	</div>
</template>