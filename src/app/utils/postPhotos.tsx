// src/utils/fetchImageData.ts
import { list } from '@vercel/blob';
import PostPhotos from '../../components/dashboard/post/postPhotos';

export const postPhotos = async () => {
  const response = await list();
  const lastBlobUrl = response.blobs[response.blobs.length - 1].url;
  console.log("Blob URL:", lastBlobUrl);

  return lastBlobUrl;
};
