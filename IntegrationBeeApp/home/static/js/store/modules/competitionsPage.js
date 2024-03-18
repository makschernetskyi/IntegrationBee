


const {defineStore} = Pinia;


const PAGES_URL = "/api/v2/cms/pages/"


export const useCompetitionsPageStore = defineStore('competitionsPage', {
    state: ()=>({
        header: null,
        currentCompetition:{
            id: null,
            header: null,
            description: null,
            date: null,
            location: null,
            locationUrl: null,
            pictureUrl: null
        },
        competitions:[]
    }),
    getters:{
        pastCompetitions(state){
            return state.competitions.filter(competition=>new Date(competition.date) < Date.now()).sort((competition1, competition2)=> competition2.date - competition1.date)
        },
        upcomingCompetitions(state){
            return state.competitions.filter(competition=>new Date(competition.date) >= Date.now()).sort((competition1, competition2)=> competition2.date - competition1.date)
        }
    },
    actions: {
        async fetchCompetitionsPageInfo(){
            try{
                const response = await axios.get(PAGES_URL,{
                    params:{
                        type: "home.CompetitionsPage",
                        fields: "header"
                    }
                })
                const data = response.data
                // if(!data || !data.items){
                //     console.error("no homepage data received")
                //     return
                // }
                const pageInfo = data.items["0"]
                this.header = pageInfo.header

            }catch(e){
                console.error(e)
            }
        },
        async fetchCompetitionsInfo(page, itemsPerPage=10) {
            try {
                const response = await axios.get(PAGES_URL, {
                    params: {
                        type: "home.Competition",
                        fields: "header,short_description,event_date,place,picture",
                        limit: itemsPerPage,
                        offset: itemsPerPage * (page - 1)
                    }
                })
                const data = response.data
                // if(!data || !data.items){
                //     console.error("no homepage data received")
                //     return
                // }
                const competitions = data.items
                console.log(competitions)
                competitions.forEach(item => {
                    this.competitions.push({
                        id: item.id,
                        header: item.header,
                        shortDescription: item.short_description,
                        date: new Date(item.event_date),
                        location: item.place,
                        pictureUrl: item.picture?.download_url
                    })
                })

            } catch (e) {
                console.error(e)
            }

        },
        async fetchCompetitionInfo(competitionId){
            let response;
            try{
                response = await axios.get(PAGES_URL,{
                    params:{
                        type: "home.Competition",
                        id: competitionId.toString(),
                        fields: "header,description,event_date,place,picture,place_maps_url",

                    }
                })
                console.log(response.data)
            }catch (e) {
                console.log(e)
                return
            }

            this.currentCompetition.id = response.data.items[0].id
            this.currentCompetition.header = response.data.items[0].header
            this.currentCompetition.description = response.data.items[0].description
            this.currentCompetition.date = new Date(response.data.items[0].event_date)
            this.currentCompetition.location = response.data.items[0].place
            this.currentCompetition.locationUrl = response.data.items[0].place_maps_url
            this.currentCompetition.pictureUrl = response.data.items[0].picture?.meta.download_url
        }
    }
})