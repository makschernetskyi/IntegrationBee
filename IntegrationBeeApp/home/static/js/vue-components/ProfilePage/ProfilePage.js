
import {useStore} from "../../store/index.js"

const {useRouter} = VueRouter
const {onBeforeMount} = Vue

const placeholderImage = "/static/assets/IntegrationBeeLogo.svg"


export default {
    setup(){
        const store = useStore().auth
        const router = useRouter()


        return {
            user: store.user,
            placeholderImage
        }
    },
    template: `
        <div class="Profile">
            <h1 class="Profile-SectionHeader">My profile:</h1>
            <section class="Profile-Data">
                <div class="Profile-Data-Picture">
                    <p>profile picture:</p>
                    <img :src="user.picture || placeholderImage" alt="">
                </div>
                <ul class="Profile-Data-UserInfo">
                    <li class="Profile-Data-UserInfo-Field">
                        <p class="Profile-Data-UserInfo-Field-name">Name: </p>
                        <p class="Profile-Data-UserInfo-Field-value">{{user.firstName}}</p>
                    </li>
                    <li class="Profile-Data-UserInfo-Field">
                        <p class="Profile-Data-UserInfo-Field-name">Surname: </p>
                        <p class="Profile-Data-UserInfo-Field-value">{{user.secondName}}</p>
                    </li>
                    <li class="Profile-Data-UserInfo-Field">
                        <p class="Profile-Data-UserInfo-Field-name">Email: </p>
                        <p class="Profile-Data-UserInfo-Field-value">{{user.email}}</p>
                    </li>
                    <li class="Profile-Data-UserInfo-Field">
                        <p class="Profile-Data-UserInfo-Field-name">School: </p>
                        <p class="Profile-Data-UserInfo-Field-value">{{user.school}}</p>
                    </li>
                </ul>
            </section>
            <h2 class="Profile-SectionHeader">My competitions:</h2>
            <section class="Profile-MyCompetitions">
                <ul class="Profile-MyCompetitions-List">
                    <li v-for="competition in user.competitions" class="Profile-MyCompetitions-List-Item">
                        <router-link :to="'/competition/' + competition.page_id">{{competition.public_name}}</router-link>
                    </li>
                </ul>
            </section>
        </div>
    `
}