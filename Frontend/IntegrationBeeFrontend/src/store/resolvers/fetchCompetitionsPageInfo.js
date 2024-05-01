import axios from "axios";
import {noAuthApi} from "@/api/index.js";


const PAGES_URL = "/cms/pages/"

export async function fetchCompetitionsPageInfo(){
    try {
        // Reset the request status before making a new request
        this.fetchCompetitionsPageInfoRequest = {
            status: 'pending',
            code: null,
            error: null,
            errorMSG: null,
        };

        const response = await noAuthApi.get(PAGES_URL, {
            type: "home.CompetitionsPage",
            fields: "header"
        })


        const data = response.data;
        if (!data || !data.items || Object.keys(data.items).length === 0) {
            console.error("No competitions page data received");
            // Update request status indicating an error
            this.fetchCompetitionsPageInfoRequest = {
                status: 'rejected',
                code: null,
                error: "No competitions page data received",
                errorMSG: "No competitions page data received",
            };
            return;
        }

        const pageInfo = data.items["0"];
        this.header = pageInfo.header;

        // Update request status after successful response
        this.fetchCompetitionsPageInfoRequest = {
            status: 'resolved',
            code: null,
            error: null,
            errorMSG: null,
        };

    } catch (error) {

        // Update request status and error details if request fails
        this.fetchCompetitionsPageInfoRequest = {
            status: 'rejected',
            code: error.response?.status || null,
            error: error,
            errorMSG: error.message,
        };
    }
}