import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  let body: HandleUploadBody;

  try {
    body = await request.json();
  } catch (error) {
    console.error('Failed to parse JSON body:', error);
    return NextResponse.json({ error: 'Invalid request payload' }, { status: 400 });
  }

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname) => {
        // Generate a client token for the browser to upload the file
        // ⚠️ Authenticate and authorize users before generating the token.
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif'],
          tokenPayload: JSON.stringify({
            // Optional data to include in the token payload
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        console.log('Blob upload completed:', blob, tokenPayload);

        try {
          // Example logic after upload completion
          // const { userId } = JSON.parse(tokenPayload);
          // await db.update({ avatar: blob.url, userId });
        } catch (error) {
          console.error('Could not update user:', error);
          throw new Error('Could not update user');
        }
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Error handling upload:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 400 });
  }
}
