export function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result as string;
            resolve(base64data);
        };
        reader.onerror = () => {
            reject(new Error("Failed to convert Blob to base64"));
        };
        reader.readAsDataURL(blob);
    });
}