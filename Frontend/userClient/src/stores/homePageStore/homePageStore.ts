import { defineStore } from 'pinia';
import { noAuthApi } from '@/api';
import { useToastStore } from '../toastStore/toastStore';
import { fetchImageUrl } from '@/services/fetchImageUrl';

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
		const response = await noAuthApi.get('/cms/pages/', {
			params: {
                type: "home.HomePage",
				fields: "slogan,sponsors,why_participate,competition,youtube_video_link,what_is_it_content,title_background_image,social_media_links,steps_to_participate"
			}
		});

		if (!response.data || !response.data || !response.data.items["0"]) {
            throw new Error("Invalid response format: missing or invalid data");
        }

		const data = response.data.items["0"];



		this.mainSponsorExists = Boolean(data.sponsors.find((sponsor:any)=>sponsor.value.sponsor_tier == "main"));
		


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
	
		// Process each tier separately
		this.mainSponsor = this.mainSponsorExists
		? (await processSponsors('main'))[0] || null
		: null;
		this.goldSponsors = await processSponsors('gold');
		this.silverSponsors = await processSponsors('silver');
		this.bronzeSponsors = await processSponsors('bronze');



		//this.nextEvent = data.nextEvent;
		this.stepsToParticipate = data.steps_to_participate
		.sort((s1:any,s2:any)=>s1.step_number-s2.step_number)
		.map((step:any)=>({
			title: step.value.step_title,
			description: step.value.step_description
		}));
		this.whyParticipate = data.why_participate
		.sort((r1:any,r2:any)=>r1.reason_number-r2.reason_number)
		.map((reason:any)=>({
			title: reason.value.header,
			description: reason.value.content
		}));
		this.slogan = data.slogan;
		this.whatIsItContent = data.what_is_it_content;
		this.videoUrl = data.youtube_video_link;
		this.titleBackgroundImage = data.title_background_image.meta.download_url;
		this.socialMediaLinks = data.social_media_links.map((link:any)=>({
			platform: link.value.social_media_name,
			url: link.value.social_media_link
		}));

		} catch (error) {
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
