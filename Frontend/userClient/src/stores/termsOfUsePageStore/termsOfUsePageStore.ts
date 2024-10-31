import { noAuthApi } from "@/api"
import { sanitizeHtml } from "@/utils/htmlSanitizers";
import {defineStore} from "pinia"





export const useTermsOfUsePageStore = defineStore("termsOfUsePageStore", {
	state: ()=>({
		text: null as string | null,
		loading: false as boolean,
	}),
	actions: {
		async fetchTermsOfUse(){
			this.loading = true;
			try{
				const response =  await noAuthApi.get("/cms/pages", {
					params: {
						type: "home.TermsOfUsePage",
						fields: "terms_of_use"
					}
				})
				this.text = sanitizeHtml(response.data.items["0"].terms_of_use)
			}catch(error: any){

			}finally{
				this.loading = false
			}
		}
	}
})