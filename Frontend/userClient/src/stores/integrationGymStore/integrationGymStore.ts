import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import {api} from '@/api'
import { useToastStore } from '../toastStore/toastStore'

type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

interface RequestState {
  status: RequestStatus
  error: string | null
}

export const useIntegrationGymStore = defineStore('integrationGym', {
  // State
  state: () => ({
    currentIntegral:{
      id: null as null|string,
      integral: null as null|string,
      author: null as null|string,
      user_solved: null as null|boolean,
      user_attempts: null as null|number,
    },
    userAnswer:'' as string,
    hasSubmitted: false as boolean,
    submissionResult: null as {correct: boolean, message: string} | null,
    
    // Request states
    dailyProblemRequest:{
      status: 'idle', // idle = not loaded yet, loading = fetching, success = loaded, error = failed
      error: null
    } as RequestState,
    
    submitAnswerRequest: {
      status: 'idle',
      error: null
    } as RequestState,

    // Computed getters for better UX
  }),
  getters: {
    isProblemLoaded: (state) => state.dailyProblemRequest.status === 'success',
    isProblemLoading: (state) => state.dailyProblemRequest.status === 'loading',
    isProblemError: (state) => state.dailyProblemRequest.status === 'error',
    isSubmitting: (state) => state.submitAnswerRequest.status === 'loading',
    isSubmitError: (state) => state.submitAnswerRequest.status === 'error',
  },

  actions: {

  // Actions
    async fetchDailyProblem(resetSubmissionState = true){
      this.dailyProblemRequest = { status: 'loading', error: null }
      
      try {
        // Placeholder endpoint - replace with actual backend endpoint when available
        const response = await api.get('/daily-integral/')

        console.log(response.data)
        
        this.currentIntegral = {
          id: response.data.id,
          integral: response.data.integral,
          author: response.data.original_author,
          user_solved: response.data.user_solved,
          user_attempts: response.data.user_attempts,
        }
        
        // Reset user state for new problem only if specified
        if (resetSubmissionState) {
          this.userAnswer = ''
          this.hasSubmitted = false
          this.submissionResult = null
        }
        
        this.dailyProblemRequest = { status: 'success', error: null }
        
      } catch (error) {
        console.error('Failed to fetch daily problem:', error)
        
        this.currentIntegral = {
          id: null,
          integral: null,
          author: null,
          user_solved: null,
          user_attempts: null,
        }
        
        // Reset user state for new problem only if specified
        if (resetSubmissionState) {
          this.userAnswer = ''
          this.hasSubmitted = false
          this.submissionResult = null
        }
        
        this.dailyProblemRequest = { status: 'success', error: null }
        
        useToastStore().addToast({
          type: 'warning',
          title: 'Demo Mode',
          message: 'Using demo problem. Backend not available.'
        })
      }
    },

    async submitAnswer (){
      if (!this.userAnswer.trim() || this.hasSubmitted) {
        return
      }

      this.submitAnswerRequest = { status: 'loading', error: null }
      
      try {
        // Placeholder endpoint - replace with actual backend endpoint when available
        const response = await api.post(`/daily-integral/check/${this.currentIntegral.id}/`, {
          user_answer: this.userAnswer
        })
        
        this.submissionResult = {
          correct: response.data.correct,
          message: response.data.message
        }
        this.hasSubmitted = true
        
        this.submitAnswerRequest = { status: 'success', error: null }
        
        // Update user stats without resetting submission state
        await this.fetchDailyProblem(false)
        
      } catch (error) {
        console.error('Failed to submit answer:', error)
        
        
        
        this.submissionResult = {
          correct: false,
          message: 'failed to submit answer'
        }
        this.hasSubmitted = true
        
        this.submitAnswerRequest = { status: 'success', error: null }
      }
    },

    resetProblem(){
      this.userAnswer = ''
      this.hasSubmitted = false
      this.submissionResult = null
      this.submitAnswerRequest = { status: 'idle', error: null }
    },

    resetSubmission(){
      this.submitAnswerRequest = { status: 'idle', error: null }
      this.submissionResult = null
    }
  }
}) 