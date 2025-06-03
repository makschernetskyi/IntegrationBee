<script setup lang="ts">
import GamingLayout from "@/layouts/GamingLayout.vue"
import { ref, onMounted, computed, watch } from "vue"
import { storeToRefs } from "pinia"
// @ts-expect-error not meant for ts
import katex from "katex"
import { cleanLatex } from "@/utils/cleanLatex"
import { calculateLatexFontSize } from "@/utils/calculateLatexFontSize"
import { useRouter } from 'vue-router'

// Import mathlive
import 'mathlive'

// Import stores
import { useIntegrationGymStore } from "@/stores/integrationGymStore/integrationGymStore"
import { useAuthStore } from "@/stores/authStore/authStore"
import { useUiStore } from "@/stores/uiStore/uiStore"

const router = useRouter()
const integrationGymStore = useIntegrationGymStore()
const authStore = useAuthStore()
const uiStore = useUiStore()

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

const { isAuthenticated } = storeToRefs(authStore)
const { isRulesVisible } = storeToRefs(uiStore)

// Modal states
const showLoginRequiredModal = ref(false)
const showRulesModal = ref(false)
const isInitialized = ref(false)

// Animation overlay state
const showResultOverlay = ref(false)

// LaTeX rendering setup
const defaultFontSize = 80
const latexFontSize = ref(`${defaultFontSize/15}rem`)

const renderedIntegral = computed(() => {
    if(currentIntegral.value.integral){
        const f = cleanLatex(currentIntegral.value.integral)
        latexFontSize.value = `${calculateLatexFontSize(f, defaultFontSize)/15}rem`
        return katex.renderToString(f, { throwOnError: false, displayMode: true })
    }
    return ''
})

// Watch for submission result to trigger animation
watch(submissionResult, (newResult) => {
    if (newResult) {
        showResultOverlay.value = true
        // Hide the overlay after animation completes (4 seconds)
        setTimeout(() => {
            showResultOverlay.value = false
        }, 4000)
    }
})

// Modal management functions
const closeLoginRequiredModal = () => {
    showLoginRequiredModal.value = false
    document.getElementsByTagName('body')[0].style.overflowY = 'unset'
}

const goToLogin = () => {
    closeLoginRequiredModal()
    router.push('/sign_in')
}

const goBack = () => {
    closeLoginRequiredModal()
    router.push('/')
}

const closeRulesModal = () => {
    showRulesModal.value = false
    uiStore.isRulesVisible = false
    document.getElementsByTagName('body')[0].style.overflowY = 'unset'
}

const markRulesAsRead = () => {
    localStorage.setItem('integrationGymRulesRead', 'true')
    closeRulesModal()
}

const showRulesModalFunction = () => {
    showRulesModal.value = true
    document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
}

// Watch for rules button click from gaming header
watch(isRulesVisible, (newValue) => {
    if (newValue && isAuthenticated.value && isInitialized.value) {
        showRulesModalFunction()
    }
})

const handleSubmit = async () => {
    console.log("answer was:", userAnswer.value)
    await integrationGymStore.submitAnswer()
}

// Handle MathLive input changes
const handleMathFieldInput = (event: any) => {
    userAnswer.value = event.target.value
}

const initializeGame = async () => {
    // Check authentication
    if (!isAuthenticated.value) {
        showLoginRequiredModal.value = true
        document.getElementsByTagName('body')[0].style.overflowY = 'hidden'
        return
    }

    // Check if user has seen rules
    const hasSeenRules = localStorage.getItem('integrationGymRulesRead')
    if (!hasSeenRules) {
        showRulesModalFunction()
        await integrationGymStore.fetchDailyProblem()
        return
    }

    // Load the problem
    await integrationGymStore.fetchDailyProblem()
}

onMounted(async () => {
    isInitialized.value = true
    await initializeGame()
})


watch(userAnswer, (newAnswer) => {
    console.log(newAnswer)
})
</script>

<template>
    <GamingLayout>
        <div class="min-h-screen pt-[15rem]">
            <!-- Result Animation Overlay -->
            <div v-if="showResultOverlay && submissionResult" 
                 class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex justify-center items-center z-[503]">
                <div class="relative w-full h-full flex flex-col justify-center items-center overflow-hidden">
                    <!-- Main Result Text -->
                    <div class="result-animation flex justify-center items-center">
                        <h1 :class="{
                            'font-heading text-[8rem] font-bold tracking-wider': true,
                            'text-green-400': submissionResult.correct,
                            'text-red-400': !submissionResult.correct
                        }">
                            {{ submissionResult.correct ? 'Correct' : 'Incorrect' }}
                        </h1>
                    </div>
                    
                    <!-- Subscript Message -->
                    <div class="subscript-animation mt-8 flex justify-center items-center">
                        <p class="text-white text-body font-medium text-center max-w-[60rem] px-4">
                            {{ submissionResult.correct 
                                ? 'Your solution is correct, good job!' 
                                : "Unfortunately that wasn't the correct answer, don't give up and try again!" 
                            }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Login Required Modal -->
            <div v-if="showLoginRequiredModal" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[502]" @click="closeLoginRequiredModal">
                <div class="bg-white rounded-3xl p-8 max-w-[50rem] w-full mx-4 text-screenBlack font-body" @click.stop>
                    <div class="flex flex-col gap-8 text-center">
                        <div class="flex justify-center">
                            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 class="font-heading text-subtitle text-screenBlack mb-2">Login Required</h3>
                            <p class="text-body text-gray-600">You need to be logged in to play Integration Gym. Please log in to continue.</p>
                        </div>
                        <div class="flex gap-4">
                            <button
                                draggable="false"
                                @click="goBack"
                                class="flex-1 bg-gray-200 text-screenBlack py-3 px-6 rounded-xl font-heading text-body lg:hover:bg-gray-300 transition-colors duration-100"
                            >
                                Go Back
                            </button>
                            <button
                                draggable="false"
                                @click="goToLogin"
                                class="flex-1 bg-primary text-screenBlack py-3 px-6 rounded-xl font-heading text-body lg:hover:bg-primary-600 transition-colors duration-100"
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Rules Modal -->
            <div v-if="showRulesModal" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-[502]" @click="closeRulesModal">
                <div class="bg-white rounded-3xl p-8 max-w-[60rem] w-full mx-4 text-screenBlack font-body max-h-[80vh] flex flex-col" @click.stop>
                    <div class="flex flex-col gap-6">
                        <div class="flex justify-center">
                            <div class="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="#FBC151" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <div class="text-center">
                            <h3 class="font-heading text-subtitle text-screenBlack mb-4">Integration Gym Rules</h3>
                        </div>
                        <div class="overflow-y-auto flex-1 max-h-[40vh] pr-2">
                            <div class="space-y-4 text-body text-gray-700">
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <h4 class="font-heading text-body font-semibold mb-2 text-screenBlack">🎯 Objective</h4>
                                    <p>Solve the daily integration problem by entering your answer using the math input field.</p>
                                </div>
                                
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <h4 class="font-heading text-body font-semibold mb-2 text-screenBlack">📝 How to Play</h4>
                                    <ul class="list-disc list-inside space-y-1">
                                        <li>A new integration problem is available each day</li>
                                        <li>Use the math input field to enter your solution</li>
                                        <li>Click "Submit" to check your answer</li>
                                        <li>You can only solve one integrals per day</li>
                                        <li>Keep only real valued functions or real numbers as the answer</li>
                                    </ul>
                                </div>
                                
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <h4 class="font-heading text-body font-semibold mb-2 text-screenBlack">✍️ Math Input Tips</h4>
                                    <ul class="list-disc list-inside space-y-1">
                                        <li>The input field supports virtual keyboard for symbols</li>
                                        <li>The input supports standard LaTeX notation</li>
                                        <li>Use parentheses to group terms: (x+1)^2</li>
                                        <li>Constants like C should be included: + C</li>
                                    </ul>
                                </div>
                                
                                <div class="bg-gray-50 p-4 rounded-lg">
                                    <h4 class="font-heading text-body font-semibold mb-2 text-screenBlack">⚡ Scoring</h4>
                                    <ul class="list-disc list-inside space-y-1">
                                        <li>Correct answers contribute to your overall score</li>
                                        <li>Track your progress over time</li>
                                        <li>Compare with other players on the leaderboard</li>
                                    </ul>
                                </div>
                                
                                <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-primary">
                                    <h4 class="font-heading text-body font-semibold mb-2 text-screenBlack">💡 Pro Tips</h4>
                                    <ul class="list-disc list-inside space-y-1">
                                        <li>Double-check your answer before submitting</li>
                                        <li>Remember to include the constant of integration</li>
                                        <li>Simplify your answer when possible</li>
                                        <li>Practice regularly to improve your skills</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="flex justify-center pt-4">
                            <button
                                draggable="false"
                                @click="markRulesAsRead"
                                class="bg-primary text-screenBlack py-3 px-8 rounded-xl font-heading text-body lg:hover:bg-primary-600 transition-colors duration-100"
                            >
                                I've Read the Rules
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Game Content -->
            <div v-if="isAuthenticated && !showLoginRequiredModal && !showRulesModal" class="flex flex-col gap-8">
                <div class="flex flex-row gap-4 w-full">
                    <div class="flex-1 h-[5rem] flex items-center justify-left">
                        <svg class="w-full h-full" viewBox="0 0 425 54" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M0 0H422.176C423.791 0 424.74 1.81458 423.819 3.14079L388.5 54H0V0Z" fill="#FBC151"/>
                        </svg>
                    </div>
                    <h1 class="text-title font-heading text-pearl-white px-[5rem] text-center">
                        Integration Gym
                    </h1>
                    <div class="flex-1 h-[5rem] flex items-center justify-right">
                        <svg class="w-full h-full" viewBox="0 0 425 54" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                            <path d="M425 0H2.82385C1.2092 0 0.260132 1.81458 1.18109 3.14079L36.5 54H425V0Z" fill="#FBC151"/>
                        </svg>
                    </div>
                </div>
                <div class="flex flex-row justify-center font-heading text-subtitle mt-[5rem]">
                    <h2 class="text-pearl-white text-center">
                        Today's integral is:
                    </h2>
                </div>
                <div class="flex flex-row justify-center">
                    <!-- LaTeX Problem Display -->
                    <div 
                        class="flex justify-center items-center w-[50rem] h-[25rem] scale-[0.5] lg:scale-100"
                        :style="{ fontSize: latexFontSize }"
                    >
                        <div v-if="isProblemLoading" class="text-body font-body text-pearl-white">
                            Loading problem...
                        </div>
                        <div v-else-if="isProblemError" class="text-body font-body text-red-400">
                            {{ dailyProblemRequest.error }}
                        </div>
                        <div class="text-pearl-white" v-else-if="isProblemLoaded || dailyProblemRequest.status === 'error'" v-html="renderedIntegral">

                        </div>
                        <div v-else class="text-body font-body text-pearl-white">
                            No problem loaded yet
                        </div>
                    </div>
                </div>
                <div class="flex justify-center px-[2rem]">
                    <!-- Already Solved Display -->
                    <div v-if="currentIntegral.user_solved" class="w-full lg:w-[50rem] px-4">
                        <div class="bg-white rounded-[15px] p-8 text-center">
                            <div class="flex flex-col items-center gap-[2rem]">
                                <!-- Green Checkmark -->
                                <div class="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 6L9 17L4 12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>
                                </div>
                                
                                <!-- Congratulatory Message -->
                                <div class="text-center flex flex-col gap-[1rem] items-center">
                                    <h3 class="font-heading text-subtitle text-green-600 mb-2">Well Done!</h3>
                                    <p class="text-body text-screenBlack font-medium mb-2">
                                        You have already solved today's integral!
                                    </p>
                                    <p class="text-body text-gray-600">
                                        Come back tomorrow for a new challenge.
                                    </p>
                                    <p class="text-body text-gray-600 mt-4">
                                        You used {{ currentIntegral.user_attempts || 1 }} {{ (currentIntegral.user_attempts || 1) === 1 ? 'try' : 'tries' }} to solve it.
                                    </p>
                                </div>
                                
                                <!-- Return Home Button -->
                                <button
                                    @click="router.push('/')"
                                    class="bg-primary text-screenBlack py-3 px-8 rounded-xl font-heading text-subtitle lg:hover:bg-primary-600 transition-colors duration-100"
                                >
                                    Return Home
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Math input section (only show if not solved) -->
                    <div v-else class="w-full lg:w-[50rem] px-4">
                        <div class="rounded-lg p-6">
                            <div class="flex flex-col gap-4">
                                <label class="text-body font-medium text-pearl-white mb-3">
                                    Enter your answer:
                                </label>
                                <math-field 
                                    class="w-full cursor-text border-2 border-gray-300 rounded-lg p-4 text-body focus:border-blue-500 focus:outline-none"
                                    :value="userAnswer"
                                    @input="handleMathFieldInput"
                                    :options="{
                                        virtualKeyboardMode: 'manual',
                                        smartFence: true,
                                        smartSuperscript: true
                                    }"
                                    :disabled="hasSubmitted || isSubmitting"
                                >
                                </math-field>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Submission Result -->
                <div v-if="submissionResult" class="flex justify-center px-[2rem]">
                    <div 
                        :class="{
                            'w-full lg:w-[50rem] px-4 py-2 rounded-lg text-center font-medium text-body': true,
                            'bg-green text-white': submissionResult.correct,
                            'bg-red text-white': !submissionResult.correct
                        }"
                    >
                        {{ submissionResult.message }}
                    </div>
                </div>

                <!-- Submit Error -->
                <div v-if="isSubmitError" class="flex justify-center px-[2rem]">
                    <div class="w-full lg:w-[50rem] px-4 py-2 rounded-lg text-center text-body font-medium bg-red text-white">
                        {{ submitAnswerRequest.error }}
                    </div>
                </div>

                <div class="flex flex-row justify-center mt-[2rem] px-[2rem]">
                    <button
                        @click="handleSubmit"
                        :disabled="isSubmitting || hasSubmitted || !userAnswer.trim() || !isProblemLoaded"
                        :class="{
                            'w-full lg:w-[45rem] overflow-hidden rounded-[20px] font-heading text-title px-[4rem] pt-[0.6rem] pb-[0.4rem] relative transition-all duration-200': true,
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

<style scoped>
/* Result text animation - slides from left to right with fade */
.result-animation {
    animation: slideTextAcross 4s ease-in-out forwards;
}

/* Subscript animation - slightly delayed and faster */
.subscript-animation {
    animation: slideTextAcross 3.5s ease-in-out 0.3s forwards;
    opacity: 0;
}

@keyframes slideTextAcross {
    0% {
        opacity: 0;
        transform: translateX(-100vw);
    }
    
    15% {
        opacity: 1;
        transform: translateX(-20vw);
    }
    
    
    85% {
        opacity: 1;
        transform: translateX(20vw);
    }
    
    100% {
        opacity: 0;
        transform: translateX(100vw);
    }
}

/* Add some glow effect for the result text */
.result-animation h1 {
/* */
}
</style>