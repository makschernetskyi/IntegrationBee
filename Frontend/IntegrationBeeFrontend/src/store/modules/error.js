import {defineStore} from "pinia";


export const useErrorStore = defineStore('error', {
    state: ()=>({
        errors:[]
    }),
    actions:{
        addError(error){
            this.errors.push(error)
        },
        removeError(){
            if(this.errors.length)
                this.errors.shift()
        }
    }
})