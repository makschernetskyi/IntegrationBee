export function formatDateToLocal(dateString: string) {
	const date = new Date(dateString);
  
	// Format day and year
	const day = date.getDate();
	const year = date.getFullYear();
  
	// Use English month name
	const month = date.toLocaleString('en-US', { month: 'short' });
  
	// Format time as hours and minutes in local time
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
  
	// Construct the final format
	return `${day}. ${month} ${year} ${hours}:${minutes}`;
  }