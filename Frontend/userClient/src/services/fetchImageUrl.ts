import { noAuthApi } from "@/api";

export async function fetchImageUrl(imageId: number|string) {
	try {
	  const response = await noAuthApi.get(`/cms/images/${imageId}/`);
	  return response.data.meta.download_url;
	} catch (error) {
	  return null;
	}
}