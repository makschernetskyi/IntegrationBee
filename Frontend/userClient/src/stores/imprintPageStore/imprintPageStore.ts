import { noAuthApi } from "@/api"
import { sanitizeHtml } from "@/utils/htmlSanitizers";
import {defineStore} from "pinia"





export const useImprintPageStore = defineStore("imprintPageStore", {
	state: ()=>({
		text: null as string | null,
		loading: false as boolean,
	}),
	actions: {
		async fetchImprint(){
			this.loading = true;
			try{
				const response =  await noAuthApi.get("/cms/pages", {
					params: {
						type: "home.ImprintPage",
						fields: "imprint"
					}
				})
				this.text = sanitizeHtml(response.data.items["0"].imprint)
			}catch(error: any){

			}finally{
				this.loading = false
			}
		}
	}
})