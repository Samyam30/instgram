'use client';

import { type PutBlobResult } from '@vercel/blob';
import { upload } from '@vercel/blob/client';
import { useRouter } from 'next/navigation';
import Show from '@/components/dashboard/blobTest/show'
import { useState, useRef } from 'react';

export default function AvatarUploadPage() {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [image, setImage] = useState<string | ArrayBuffer | null>('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!inputFileRef.current?.files) {
      throw new Error('No file selected');
    }

    const file = inputFileRef.current.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const data = new FileReader();
    data.onload = async () => {
      setImage(data.result);
      const newBlob = await upload(file.name, file, {
        access: 'public',
        handleUploadUrl: '/api/blobTest',
      });

      setBlob(newBlob);
    };

    data.readAsDataURL(file);
    console.log("test console");
  };

  return (
    <>
      <h1>Upload Your Avatar</h1>
      <form onSubmit={handleSubmit}>
        <input name="file" ref={inputFileRef} type="file" required />
        <button type="submit">Upload</button>
      </form>
      {blob && (
        <div>
          Blob url: <a href={blob.url}>{blob.url}</a>
        </div>
      )}
      {image && (
        <div>
          Image Preview: <img src={image as string} alt="Avatar" />
        </div>
      )}
      <Show iamge={image}/>
    </>
  );
}
