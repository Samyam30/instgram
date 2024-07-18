import fetch from "node-fetch";


export const fetchAndConvertToBase64 = async (imageUrl: string) => {
  try {
    const response = await fetch(imageUrl);
    const buffer = await response.buffer();
    const base64data = buffer.toString('base64');
    const mimeType = response.headers.get('content-type');
    return `data:${mimeType};base64,${base64data}`;
  } catch (error) {
    console.error('Error fetching or converting image:', error);
    throw error;
  }
};
