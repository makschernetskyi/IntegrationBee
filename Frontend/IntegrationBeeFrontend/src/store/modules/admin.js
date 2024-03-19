import {defineStore} from 'pinia'



export const useAdminStore = defineStore('admin', {
    state: ()=>({
        addNewCompetitionForm: {
            name: '',
            maxParticipants: 0,
        }
    }),
    getters:{
    },
    actions: {
        setAddNewCompetitionFormNameValue(name){
            this.addNewCompetitionForm.name = name
        },
        setAddNewCompetitionFormMaxParticipantsValue(maxParticipants){
            if(!isNaN(parseInt(maxParticipants)))
                this.addNewCompetitionForm.maxParticipants = parseInt(maxParticipants)
        }
    }
})