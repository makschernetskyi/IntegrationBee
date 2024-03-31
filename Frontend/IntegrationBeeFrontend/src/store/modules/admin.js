import axios from 'axios'
import Cookies from "js-cookie";
import {defineStore} from 'pinia'
import cloneDeep from 'lodash.clonedeep'

import {useErrorStore} from "./error.js";

const ALL_USERS_URL = "/api/v2/allUsers/"

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
        async fetchAllUsers() {
            try {
            // Reset the request status before making a new request
            this.fetchAllUsersRequest = {
                status: 'pending',
                code: null,
                error: null,
                errorMSG: null,
            };

            const accessToken = Cookies.get('access');
            const response = await axios.get(ALL_USERS_URL, {
                headers: {
                    Authorization: 'Bearer ' + accessToken
                }
            });

            // Update allUsers state after successful response
            this.allUsers = response.data;

            // Update request status after successful response
            this.fetchAllUsersRequest = {
                status: 'resolved',
                code: null,
                error: null,
                errorMSG: null,
            };

            } catch (error) {

                const errorStore = useErrorStore();
                errorStore.addError({text: 'Error occurred while fetching users, could not fetch users'})

                // Update request status and error details if request fails
                this.fetchAllUsersRequest = {
                    status: 'rejected',
                    code: error.response?.status || null,
                    error: error,
                    errorMSG: error.message,
                };
            }
        },
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