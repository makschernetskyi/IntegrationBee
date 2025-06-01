import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

interface RequestState {
  status: RequestStatus
  error: string | null
}

export const useIntegrationGymStore = defineStore('integrationGym', () => {
  // State
  const currentIntegral = ref<string>('\\int x^2 dx')
  const userAnswer = ref<string>('')
  const problemId = ref<string>('')
  const hasSubmitted = ref<boolean>(false)
  const submissionResult = ref<{correct: boolean, message: string} | null>(null)
  
  // Request states
  const dailyProblemRequest = ref<RequestState>({
    status: 'idle', // idle = not loaded yet, loading = fetching, success = loaded, error = failed
    error: null
  })
  
  const submitAnswerRequest = ref<RequestState>({
    status: 'idle',
    error: null
  })

  // Computed getters for better UX
  const isProblemLoaded = computed(() => dailyProblemRequest.value.status === 'success')
  const isProblemLoading = computed(() => dailyProblemRequest.value.status === 'loading')
  const isProblemError = computed(() => dailyProblemRequest.value.status === 'error')
  
  const isSubmitting = computed(() => submitAnswerRequest.value.status === 'loading')
  const isSubmitError = computed(() => submitAnswerRequest.value.status === 'error')

  // Actions
  const fetchDailyProblem = async () => {
    dailyProblemRequest.value = { status: 'loading', error: null }
    
    try {
      // Placeholder endpoint - replace with actual backend endpoint when available
      const response = await axios.get('/api/integration-gym/daily-problem')
      
      currentIntegral.value = response.data.integral
      problemId.value = response.data.id
      
      // Reset user state for new problem
      userAnswer.value = ''
      hasSubmitted.value = false
      submissionResult.value = null
      
      dailyProblemRequest.value = { status: 'success', error: null }
      
    } catch (error) {
      console.error('Failed to fetch daily problem:', error)
      
      // Fallback to default problem
      currentIntegral.value = '\\int \\frac{1}{x^2 + 1} dx'
      problemId.value = 'fallback-problem'
      
      dailyProblemRequest.value = { 
        status: 'error', 
        error: 'Failed to fetch daily problem. Using fallback.'
      }
    }
  }

  const submitAnswer = async () => {
    if (!userAnswer.value.trim() || hasSubmitted.value) {
      return
    }

    submitAnswerRequest.value = { status: 'loading', error: null }
    
    try {
      // Placeholder endpoint - replace with actual backend endpoint when available
      const response = await axios.post('/api/integration-gym/submit-answer', {
        problemId: problemId.value,
        answer: userAnswer.value
      })
      
      submissionResult.value = {
        correct: response.data.correct,
        message: response.data.message
      }
      hasSubmitted.value = true
      
      submitAnswerRequest.value = { status: 'success', error: null }
      
    } catch (error) {
      console.error('Failed to submit answer:', error)
      
      submissionResult.value = {
        correct: false,
        message: 'Failed to submit answer. Please try again.'
      }
      
      submitAnswerRequest.value = { 
        status: 'error', 
        error: 'Failed to submit answer. Please try again.'
      }
    }
  }

  const resetProblem = () => {
    userAnswer.value = ''
    hasSubmitted.value = false
    submissionResult.value = null
    submitAnswerRequest.value = { status: 'idle', error: null }
  }

  const resetSubmission = () => {
    submitAnswerRequest.value = { status: 'idle', error: null }
    submissionResult.value = null
  }

  const $reset = () => {
    currentIntegral.value = '\\int x^2 dx'
    userAnswer.value = ''
    problemId.value = ''
    hasSubmitted.value = false
    submissionResult.value = null
    dailyProblemRequest.value = { status: 'idle', error: null }
    submitAnswerRequest.value = { status: 'idle', error: null }
  }

  return {
    // State
    currentIntegral,
    userAnswer,
    problemId,
    hasSubmitted,
    submissionResult,
    
    // Request states
    dailyProblemRequest,
    submitAnswerRequest,
    
    // Computed getters
    isProblemLoaded,
    isProblemLoading,
    isProblemError,
    isSubmitting,
    isSubmitError,
    
    // Actions
    fetchDailyProblem,
    submitAnswer,
    resetProblem,
    resetSubmission,
    $reset
  }
}) 