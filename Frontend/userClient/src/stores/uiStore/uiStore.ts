import { defineStore } from "pinia";




export const useUiStore = defineStore('ui', {
	state:()=>({
		isMobileMenuVisible: false,
		shouldMobileMenuBeVisible: false,
		isRulesVisible: false
	}),
	actions: ()=>{
	}
})