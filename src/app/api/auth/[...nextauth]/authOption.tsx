
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import Login from '../../../auth/login/page';
import { signIn } from 'next-auth/react';

export const authOptions: NextAuthOptions = {
  // pages:{
  //   signIn:'/auth/login',
  // },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
  ],
};