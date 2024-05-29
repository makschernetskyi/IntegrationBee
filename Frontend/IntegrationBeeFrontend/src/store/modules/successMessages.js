import {defineStore} from "pinia";


export const useSuccessMessagesStore = defineStore('successMessages', {
    state: ()=>({
        messages:[]
    }),
    actions:{
        addMessage(error){
            this.messages.push(error)
        },
        removeMessage(){
            if(this.messages.length)
                this.messages.shift()
        }
    }
})