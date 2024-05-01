import axios from "axios";
import {useErrorStore} from "@/store/modules/error.js";
import {noAuthApi} from "@/api/index.js";

const PAGES_URL = "/cms/pages/"

export async function fetchCompetitionsInfo(page, itemsPerPage=10) {
    try {
        // Reset the request status before making a new request
        this.fetchCompetitionsInfoRequest = {
            status: 'pending',
            code: null,
            error: null,
            errorMSG: null,
        };

        const response = await noAuthApi.get(PAGES_URL, {
            params: {
                type: "home.Competition",
                fields: "header,short_description,event_date,place,picture",
                limit: itemsPerPage,
                offset: itemsPerPage * (page - 1)
            }
        });

        const data = response.data;
        if (!data || !data.items) {
            this.fetchCompetitionsInfoRequest = {
                status: 'rejected',
                code: null,
                error: "No competition data received",
                errorMSG: "No competition data received",
            };
            return;
        }

        const competitions = data.items;
        competitions.forEach(item => {
            this.competitions.push({
                id: item.id,
                header: item.header,
                shortDescription: item.short_description,
                date: new Date(item.event_date),
                location: item.place,
                pictureUrl: item.picture?.meta.download_url
            });
        });

        // Update request status after successful response
        this.fetchCompetitionsInfoRequest = {
            status: 'resolved',
            code: null,
            error: null,
            errorMSG: null,
        };

    } catch (error) {

        const errorStore = useErrorStore()
        errorStore.addError({text: "Error has occurred while fetching competitions page. Try again later."})

        // Update request status and error details if request fails
        this.fetchCompetitionsInfoRequest = {
            status: 'rejected',
            code: error.response?.status,
            error: error,
            errorMSG: error.message,
        };
    }

}