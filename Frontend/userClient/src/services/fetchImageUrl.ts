import { noAuthApi } from "@/api";

export async function fetchImageUrl(imageId: number|string) {
	try {
	  const response = await noAuthApi.get(`http://localhost:8000/api/v2/cms/images/${imageId}/`);
	  return response.data.meta.download_url;
	} catch (error) {
	  console.error(`Failed to fetch image for ID ${imageId}`, error);
	  return null;
	}
}