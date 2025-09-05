import { NextAuthOptions } from 'next-auth';
import Google from 'next-auth/providers/google';
import Kakao from 'next-auth/providers/kakao';
import Naver from 'next-auth/providers/naver';

declare module 'next-auth' {
  interface Session {
    sub: string;
  }
}

const nextAuthSecret = `${process.env.NEXTAUTH_SECRET}`;
if (!nextAuthSecret) {
  throw new Error('NEXTAUTH_SECRET is not set');
}

const authOptions: NextAuthOptions = {
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    Naver({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log(token)
      if (!token.sub) {
        return session;
      }

      session.sub = token.sub;

      return session;
    },
  },
  secret: nextAuthSecret,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
  },
};

export default authOptions;
