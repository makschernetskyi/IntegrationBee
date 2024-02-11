import HomePageSection from "./HomePageSection.js";


export default {
    components: {
        HomePageSection
    },
    template: `
        <div class="Home">
            <HomePageSection class="Home-IntroSection">
                <div class="Home-IntroSection-Illustration">
                    <img src="static/assets/homepic_crop.jpg" alt="">
                </div>
                <div class="Home-IntroSection-Description">
                    <div class="Home-IntroSection-Description-Title">
                        <h1>Integration Bee now in Vienna!</h1>
<!--                        <p>Integration bee format event is coming to Vienna!!!</p>-->
                    </div>
                    <div class="Home-IntroSection-Description-About">
                        <p>Test your calculus skills and discover the world
                        of competetive mathematics!
                        </p>
                    </div>
                    
                    <div class="Home-IntroSection-Description-Invitation">
                        <p>Want to join?</p> <router-link to="/signUp">Sign Up</router-link>
                    </div>
                    
                </div>
            </HomePageSection>
            <HomePageSection class="Home-MotivationSection">
                <h2 class="Home-MotivationSection-header">
                    Why to Participate?
                </h2>
                <ul class="Home-MotivationSection-ReasonsList">
                    <li class="Home-MotivationSection-ReasonsList-Item">
                        <h3 class="Home-MotivationSection-ReasonsList-Item-header">
                        Compete!
                        </h3>
                        <p class="Home-MotivationSection-ReasonsList-Item-info">
                        Integration bee is a format where you can compete with other
                        people in solving integrals!
                        </p>
                    </li>
                    <li class="Home-MotivationSection-ReasonsList-Item">
                        <h3 class="Home-MotivationSection-ReasonsList-Item-header">
                        Make friends!
                        </h3>
                        <p class="Home-MotivationSection-ReasonsList-Item-info">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur distinctio eius eos exercitationem itaque labore mollitia odio odit quas quis!
                        </p>
                    </li>
                    <li class="Home-MotivationSection-ReasonsList-Item">
                        <h3 class="Home-MotivationSection-ReasonsList-Item-header">
                        Win Prizes!
                        </h3>
                        <p class="Home-MotivationSection-ReasonsList-Item-info">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum incidunt perferendis sit ullam. Doloribus, et!
                        </p>
                    </li>
                </ul>
            </HomePageSection>
        </div>
`
}