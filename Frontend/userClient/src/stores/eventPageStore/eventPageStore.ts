// src/stores/eventStore.ts

import { defineStore } from 'pinia';
import axios from 'axios';
import { useToastStore } from '@/stores/toastStore/toastStore';
import { noAuthApi } from '@/api';
import { formatDateToLocal } from '@/utils/formatDateToLocal';
import { fetchImageUrl } from '@/services/fetchImageUrl';

// Interfaces

interface MainSponsor {
  sponsorName: string;
  description: string;
  logoSrc: string;
}

interface Sponsor {
  id: number;
  logoSrc: string;
  sponsorName: string;
  logoSize: number;
}

interface Section {
  title: string;
  text: string;
}

export interface ParticipatePanelData {
  zoom: number;
  coordinates: [number, number];
  isRegistrationOpen: boolean;
  participantsCount: number;
  date: string,
  location: string,
  locationMapsUrl: string,
  reasonRegistrationClosed?: string;
}

interface Match {
  id: number;
  participant1: string;
  participant2: string;
  winner?: string;
}

export interface TournamentBracket {
  eightFinals: [Match, Match, Match, Match, Match, Match, Match, Match];
  quarterfinals: [Match, Match, Match, Match];
  semifinals: [Match, Match];
  finals: [Match];
}

interface RegisterResponse {
  success: boolean;
  message: string;
}

// Store Definition

export const useEventPageStore = defineStore('eventPageStore', {
  state: () => ({
    competitionId: null as number|null,
    competitionName: '',
    edition: '',
    description: '',
    eventPictureSrc: '',
    mainSponsorExists: false as boolean,
    mainSponsor: {
      sponsorName: '',
      description: '',
      logoSrc: '',
    } as MainSponsor,
    goldSponsors: [] as Sponsor[],
    silverSponsors: [] as Sponsor[],
    bronzeSponsors: [] as Sponsor[],
    sections: [] as Section[],
    participatePanel: {
      zoom: 12,
      coordinates: [0, 0],
      isRegistrationOpen: false,
      participantsCount: 0,
      location: '',
      locationMapsUrl: '',
      date: ''
    } as ParticipatePanelData,
    tournamentBracket: {
      eightFinals: [
        { id: 1, participant1: '', participant2: '' },
        { id: 2, participant1: '', participant2: '' },
        { id: 3, participant1: '', participant2: '' },
        { id: 4, participant1: '', participant2: '' },
        { id: 5, participant1: '', participant2: '' },
        { id: 6, participant1: '', participant2: '' },
        { id: 7, participant1: '', participant2: '' },
        { id: 8, participant1: '', participant2: '' },
      ],
      quarterfinals: [
        { id: 9, participant1: '', participant2: '' },
        { id: 10, participant1: '', participant2: '' },
        { id: 11, participant1: '', participant2: '' },
        { id: 12, participant1: '', participant2: '' },
      ],
      semifinals: [
        { id: 13, participant1: '', participant2: '' },
        { id: 14, participant1: '', participant2: '' },
      ],
      finals: [
        { id: 15, participant1: '', participant2: '' },
      ],
    } as TournamentBracket,
    loading: false,
  }),

  actions: {
    async fetchEventData(id:string) {
      this.loading = true;
      const toastStore = useToastStore();
      try {
        const response = await noAuthApi.get(`/cms/pages/${id}/`); // Update with your API endpoint
        const data = response.data
        console.log(data);

        // Populate state with fetched data
        this.competitionName = data.title;
        this.edition = data.edition;
        this.description = data.description;
        this.eventPictureSrc = data.picture.meta.download_url;
        

        const processSponsors = async (tier:string) => {
          const sponsors = data.sponsors
            .filter((sponsor:any) => sponsor.value.sponsor_tier === tier)
            .map(async (sponsor:any) => ({
            sponsorName: sponsor.value.sponsor_name,
            logoSrc: await fetchImageUrl(sponsor.value.sponsor_logo),
            logoSize: sponsor.value.sponsor_logo_size,
            ...(tier === 'main' ? {description: sponsor.value.sponsor_description} : {}),
            }));
          return Promise.all(sponsors);
        };
        
        this.mainSponsorExists = Boolean(data.sponsors.find((sponsor:any)=>sponsor.value.sponsor_tier == "main"));
      

        this.mainSponsor = this.mainSponsorExists
        ? (await processSponsors('main'))[0] || null
        : null;
        this.goldSponsors = await processSponsors('gold');
        this.silverSponsors = await processSponsors('silver');
        this.bronzeSponsors = await processSponsors('bronze');


        this.sections = data.sections.map((section:any)=>({
          title: section.title,
          text: section.body,
        }));
        this.participatePanel = {
          zoom: 12, //hardcoded for now
          coordinates: [data.latitude, data.longitude],
          isRegistrationOpen: false, //TODO change to Backend Field
          reasonRegistrationClosed: '', //TODO change to Backend Field
          participantsCount: 0, //TODO change to Backend Field,
          date: formatDateToLocal(data.competition.event_date), //update to from_to,
          location: data.place,
          locationMapsUrl: `https://www.google.com/maps/dir//${data.latitude},${data.longitude}`
        }
        if(data.competition.rounds){
          this.tournamentBracket.eightFinals = data.competition.rounds
          .find((round:any)=>round.name === "1/8 Finals")
          .matches
          .sort((m1:any, m2:any)=>m1.sort_order - m2.sort_order)
          .map((match:any)=>({
            id: match.id,
            participant1: match.player1,
            participant2: match.player2,
            winner: match.winner
          }))
          this.tournamentBracket.quarterfinals = data.competition.rounds
          .find((round:any)=>round.name === "Quarterfinals")
          .matches
          .sort((m1:any, m2:any)=>m1.sort_order - m2.sort_order)
          .map((match:any)=>({
            id: match.id,
            participant1: match.player1,
            participant2: match.player2,
            winner: match.winner
          }))
          this.tournamentBracket.semifinals = data.competition.rounds
          .find((round:any)=>round.name === "Semifinals")
          .matches
          .sort((m1:any, m2:any)=>m1.sort_order - m2.sort_order)
          .map((match:any)=>({
            id: match.id,
            participant1: match.player1,
            participant2: match.player2,
            winner: match.winner
          }))
          this.tournamentBracket.finals = data.competition.rounds
          .find((round:any)=>round.name === "Finals")
          .matches
          .sort((m1:any, m2:any)=>m1.sort_order - m2.sort_order)
          .map((match:any)=>({
            id: match.id,
            participant1: match.player1,
            participant2: match.player2,
            winner: match.winner
          }))
        }
        
        //this.tournamentBracket = data.tournamentBracket;
      } catch (error) {
        toastStore.addToast({
          type: 'error',
          title: "Error has occured",
          message: "could not fetch infos about this event"
        })
      } finally {
        this.loading = false;
      }
    },

    async registerParticipant(formData: Record<string, any>) {
      const toastStore = useToastStore();
      if (!this.participatePanel.isRegistrationOpen) {
        toastStore.addToast({
			type: 'error',
			title: "Registration is not open yet",
			message: "Try later"
		})
        return;
      }
      try {
        const response = await axios.post('/api/event/register', formData); // Update with your API endpoint
        const data = response.data as RegisterResponse;
        if (data.success) {
          this.participatePanel.participantsCount += 1;
          toastStore.addToast({
			type: 'success',
			title: "Registration was successful",
			message: "check your email regularly for updates"
		})
        } else {
			toastStore.addToast({
				type: 'error',
				title: "Registration failed",
				message: "Could not sign up for the event, try again later."
			})
        }
      } catch (error) {
        toastStore.addToast({
			type: 'error',
			title: "Registration failed",
			message: "Could not sign up for the event, try again later."
		})
      }
    },

    updateMatch(
      round: keyof TournamentBracket,
      matchId: number,
      updatedMatch: Partial<Match>
    ) {
      const matches = this.tournamentBracket[round];
      const matchIndex = matches.findIndex(match => match.id === matchId);
      if (matchIndex !== -1) {
        this.tournamentBracket[round][matchIndex] = {
          ...this.tournamentBracket[round][matchIndex],
          ...updatedMatch,
        };
      } else {
        
      }
    },
  },
});
