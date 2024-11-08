export function fileToBase64(file: File) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);  // Read file as Data URL
		reader.onload = () => resolve(reader.result);  // Full Data URL including prefix
		reader.onerror = (error) => reject(error);
	});
}