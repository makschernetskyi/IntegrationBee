import { defineStore } from "pinia";




export const useUiStore = defineStore('ui', {
	state:()=>({
		isMobileMenuVisible: false,
		shouldMobileMenuBeVisible: false
	}),
	actions: ()=>{
	}
})