import {defineStore} from 'pinia'
import {fetchAllUsers} from "@/store/resolvers/fetchAllUsers.js";



export const useAdminStore = defineStore('admin', {
    state: ()=>({
        addNewCompetitionForm: {
            name: '',
            maxParticipants: 0,
        },
        searchbar: '',
        filters: [],
        allUsers: [],
        fetchAllUsersRequest:{
            status: null,
            code: null,
            error: null,
            errorMSG: null,
        }
    }),
    getters:{
        visibleUsers(state){
            return state.allUsers.filter(user=> state.filters.length ? state.filters.every(filter => user.competitions.includes(filter)) : true).filter(user=> `${user.first_name} ${user.last_name} ${user.school}`.toLocaleLowerCase().includes(state.searchbar.toLowerCase()))
        }
    },
    actions: {
        setAddNewCompetitionFormNameValue(name){
            this.addNewCompetitionForm.name = name
        },
        setAddNewCompetitionFormMaxParticipantsValue(maxParticipants){
            if(!isNaN(parseInt(maxParticipants)))
                this.addNewCompetitionForm.maxParticipants = parseInt(maxParticipants)
        },
        fetchAllUsers,
        addFilter(id){
            if(!this.filters.includes(id)){
                this.filters.push(id);
            }
        },
        removeFilter(id){
            this.filters = this.filters.filter(item => item!==id);
        }
    }
})