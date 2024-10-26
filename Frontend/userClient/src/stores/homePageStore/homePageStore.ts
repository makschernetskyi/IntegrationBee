// src/stores/homePageStore.ts

import { defineStore } from 'pinia';
import { noAuthApi } from '@/api';
import { useToastStore } from '../toastStore/toastStore';

interface Sponsor {
	logoSrc: string;
	sponsorName: string;
	logoSize: string;
}
interface MainSponsor {
	sponsorName: string,
	logoSrc: string,
	description: string,
}

interface Event {
	id: number;
	title: string;
	edition: string;
	description: string;
	imageSrc: string;
	link: string;
}

interface Step {
	title: string;
	description: string;
}

interface Reason {
	title: string;
	description: string;
}

interface SocialMediaLink {
	platform: 'instagram' | 'facebook' | 'telegram' | 'youtube';
	url: string;
}

export const useHomePageStore = defineStore('homePageStore', {
	state: () => ({
		mainSponsorExists: false as boolean,
		mainSponsor: null as MainSponsor | null,
		goldSponsors: [] as Sponsor[],
		silverSponsors: [] as Sponsor[],
		bronzeSponsors: [] as Sponsor[],
		nextEvent: null as Event | null,
		stepsToParticipate: [] as Step[],
		whyParticipate: [] as Reason[],
		slogan: '' as string,
		whatIsItContent: '' as string,
		videoUrl: '' as string,
		titleBackgroundImage: '' as string,
		socialMediaLinks: [] as SocialMediaLink[],
		loading: false as boolean,
	}),
	actions: {
	async fetchHomePageData() {
		this.loading = true;
		try {
		const response = await noAuthApi.get('/homepage'); // Replace with your actual API endpoint
		console.log('tried Response')
		const data = response.data;

		// Update state with data from API
		this.mainSponsorExists = data.mainSponsorExists;
		this.mainSponsor = data.mainSponsor;
		this.goldSponsors = data.goldSponsors;
		this.silverSponsors = data.silverSponsors;
		this.bronzeSponsors = data.bronzeSponsors;
		this.nextEvent = data.nextEvent;
		this.stepsToParticipate = data.stepsToParticipate;
		this.whyParticipate = data.whyParticipate;
		this.slogan = data.slogan;
		this.whatIsItContent = data.whatIsItContent;
		this.videoUrl = data.videoUrl;
		this.titleBackgroundImage = data.titleBackgroundImage;
		this.socialMediaLinks = data.socialMediaLinks;

		} catch (error) {
		console.log('failed Response')
		const toastStore = useToastStore();
		toastStore.addToast({
			title: "Error has occured",
			type: 'error',
			message: 'Could not fetch home page, try again later'
		})
		} finally {
			this.loading = false;
		}
	},
  },
});
