
import {useStore} from "../../store/index.js"

const {useRouter} = VueRouter
const {onBeforeMount} = Vue


export default {
    setup(){
        const store = useStore().auth
        const router = useRouter()


        return {
            user: store.user
        }
    },
    template: `
        <div>
            Profile Page
            Profile of {{user.firstName}}
        </div>
    `
}