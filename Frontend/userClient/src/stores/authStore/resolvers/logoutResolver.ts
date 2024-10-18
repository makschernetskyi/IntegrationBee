import Cookies from "js-cookie"


export async function logoutResolver(){
	Cookies.remove('access')
    Cookies.set('refresh', "null")
}