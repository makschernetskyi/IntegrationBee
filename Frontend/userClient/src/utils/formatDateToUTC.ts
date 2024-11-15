export function formatDateToUTC(dateString: string) {
	const date = new Date(dateString);

	// Format day and year in UTC
	const day = date.getUTCDate();
	const year = date.getUTCFullYear();

	// Use English month name in UTC
	const month = date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' });

	// Format time as hours and minutes in UTC
	const hours = String(date.getUTCHours()).padStart(2, '0');
	const minutes = String(date.getUTCMinutes()).padStart(2, '0');

	// Construct the final format
	return `${day}. ${month} ${year} ${hours}:${minutes}`;
  }