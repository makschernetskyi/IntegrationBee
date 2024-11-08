import { useToastStore } from "@/stores/toastStore/toastStore"
import Cookies from "js-cookie"


export async function logoutResolver(){
	Cookies.remove('access')
    Cookies.set('refresh', "null")
	useToastStore().addToast({
		type: "info",
		title: "Successfully logged out",
		message: ""
	})
}