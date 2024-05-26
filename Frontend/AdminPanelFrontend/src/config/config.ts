const BASE_URL = '';

const API_URL = BASE_URL + '/api/v2/';

const URLS: { [key: string]: string } = {
	login: 'login/',
	userData: 'userData/',
	integralsSeriesList: 'integralSeriesList/',
	integralsSeriesDetails: 'integralSeries/',
};

export { URLS, API_URL };
