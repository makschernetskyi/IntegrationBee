<script setup lang="ts">
import GamingLayout from "@/layouts/GamingLayout.vue"
import { ref, onMounted, computed } from "vue"
import { storeToRefs } from "pinia"
// @ts-expect-error not meant for ts
import katex from "katex"
import { cleanLatex } from "@/utils/cleanLatex"
import { calculateLatexFontSize } from "@/utils/calculateLatexFontSize"

// Import mathlive
import 'mathlive'

// Import store
import { useIntegrationGymStore } from "@/stores/integrationGymStore/integrationGymStore"

const integrationGymStore = useIntegrationGymStore()
const { 
    currentIntegral, 
    userAnswer, 
    hasSubmitted, 
    submissionResult,
    isProblemLoaded,
    isProblemLoading,
    isProblemError,
    isSubmitting,
    isSubmitError,
    dailyProblemRequest,
    submitAnswerRequest
} = storeToRefs(integrationGymStore)

// LaTeX rendering setup
const defaultFontSize = 80
const latexFontSize = ref(`text-[${defaultFontSize}px]`)

const renderedIntegral = computed(() => {
    const f = cleanLatex(currentIntegral.value)
    latexFontSize.value = `text-[${calculateLatexFontSize(f, defaultFontSize)*10}px]`
    return katex.renderToString(f, { throwOnError: false, displayMode: true })
})

const handleSubmit = async () => {
    await integrationGymStore.submitAnswer()
}

onMounted(async () => {
    console.log('IntegrationGym component mounted with mathlive')
    // Try to fetch daily problem, will fallback to default if endpoint doesn't exist
    await integrationGymStore.fetchDailyProblem()
})
</script>
<template>
        <GamingLayout>
            <div class="min-h-screen pt-[15rem]">
                <div class="flex flex-col gap-8">
                    <div class="flex flex-row gap-4 w-full">
                        <div class="flex-1 h-[5rem] flex items-center justify-left">
                            <svg class="w-full h-full" viewBox="0 0 425 54" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                <path d="M0 0H422.176C423.791 0 424.74 1.81458 423.819 3.14079L388.5 54H0V0Z" fill="#FBC151"/>
                            </svg>
                        </div>
                        <h1 class="text-title font-heading text-pearl-white px-[5rem]">
                            Integration Gym
                        </h1>
                        <div class="flex-1 h-[5rem] flex items-center justify-right">
                            <svg class="w-full h-full" viewBox="0 0 425 54" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                                <path d="M425 0H2.82385C1.2092 0 0.260132 1.81458 1.18109 3.14079L36.5 54H425V0Z" fill="#FBC151"/>
                            </svg>
                        </div>
                    </div>
                    <div class="flex flex-row justify-center font-heading text-subtitle mt-[5rem]">
                        <h2 class="text-pearl-white">
                            Today's integral is:
                        </h2>
                    </div>
                    <div class="flex flex-row justify-center">
                        <!-- LaTeX Problem Display -->
                        <div 
                            class="flex justify-center items-center text-pearl-white w-[50rem] h-[25rem] rounded-xl mx-auto"
                            :class="latexFontSize"
                        >
                            <div v-if="isProblemLoading" class="text-body font-body text-pearl-white">
                                Loading problem...
                            </div>
                            <div v-else-if="isProblemError" class="text-body font-body text-red-400">
                                {{ dailyProblemRequest.error }}
                            </div>
                            <div v-else-if="isProblemLoaded || dailyProblemRequest.status === 'error'" v-html="renderedIntegral"></div>
                            <div v-else class="text-body font-body text-gray-400">
                                No problem loaded yet
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <!-- Math input section -->
                        <div class="w-[50rem] px-4">
                            <div class="rounded-lg p-6">
                                <div class="flex flex-col gap-4">
                                    <label class="text-body font-medium text-pearl-white mb-3">
                                        Enter your answer:
                                    </label>
                                    <math-field 
                                        class="w-full cursor-text border-2 border-gray-300 rounded-lg p-4 text-body focus:border-blue-500 focus:outline-none"
                                        v-model="userAnswer"
                                        :options="{
                                            virtualKeyboardMode: 'manual',
                                            smartFence: true,
                                            smartSuperscript: true
                                        }"
                                        :disabled="hasSubmitted || isSubmitting"
                                    >
                                        {{ userAnswer }}
                                    </math-field>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Submission Result -->
                    <div v-if="submissionResult" class="flex justify-center">
                        <div 
                            :class="{
                                'w-[50rem] px-4 py-2 rounded-lg text-center font-medium': true,
                                'bg-green text-white': submissionResult.correct,
                                'bg-red text-white': !submissionResult.correct
                            }"
                        >
                            {{ submissionResult.message }}
                        </div>
                    </div>

                    <!-- Submit Error -->
                    <div v-if="isSubmitError" class="flex justify-center">
                        <div class="w-[50rem] px-4 py-2 rounded-lg text-center font-medium bg-red text-white">
                            {{ submitAnswerRequest.error }}
                        </div>
                    </div>

                    <div class="flex flex-row justify-center mt-[2rem]">
                        <button
                            @click="handleSubmit"
                            :disabled="isSubmitting || hasSubmitted || !userAnswer.trim() || !isProblemLoaded"
                            :class="{
                                'w-[45rem] overflow-hidden rounded-[20px] font-heading text-title px-[4rem] pt-[0.6rem] pb-[0.4rem] relative transition-all duration-200': true,
                                'bg-gray-100 text-gray-400 cursor-not-allowed': isSubmitting || hasSubmitted || !userAnswer.trim() || !isProblemLoaded,
                                'bg-primary border-primary border-4 text-pearl-white lg:hover:text-screenBlack after:absolute after:w-full after:h-full after:top-0 after:left-0 after:hidden lg:after:flex after:bg-screenBlack lg:hover:after:scale-y-0 after:transition-transform after:duration-200 after:will-change-transform after:origin-top': !isSubmitting && !hasSubmitted && userAnswer.trim() && isProblemLoaded,
                            }"
                            title="submit"
                            aria-label="submit"
                        >
                            <span class="relative z-[2]">
                                {{ isSubmitting ? 'Submitting...' : hasSubmitted ? 'Submitted' : 'Submit' }}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </GamingLayout>
</template>