'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const session = useSession();
  const handleKakaoSignIn = async () => {
    const res = await signIn('kakao');
    console.log(res);
  };
  return (
    <main className="min-h-screen flex items-center justify-center p-6 font-sans">
      <div className="w-80 max-w-full rounded-xl border border-gray-200 bg-white p-6 shadow-md">
        <h1 className="mb-6 text-2xl text-black font-bold">Bernie OAuth</h1>

        <div className="flex flex-col gap-3">
          {/* Google */}
          <button
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-800 hover:bg-gray-50"
            onClick={async () => {
              await signIn('google');
            }}
          >
            Google로 로그인
          </button>

          {/* Kakao */}
          <button
            className="w-full rounded-lg bg-[#FEE500] px-4 py-2 font-semibold text-gray-900 hover:brightness-95"
            onClick={handleKakaoSignIn}
          >
            Kakao로 로그인
          </button>

          {/* Naver */}
          <button
            className="w-full rounded-lg bg-[#03C75A] px-4 py-2 font-semibold text-white hover:brightness-95"
            onClick={async () => {
              await signIn('naver');
            }}
          >
            Naver로 로그인
          </button>
          <button
            className="w-full rounded-lg bg-[black] px-4 py-2 font-semibold text-white hover:brightness-95"
            onClick={async () => {
              await signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
      <div>
        {session.data?.user?.image ? (
          <Image src={session.data?.user?.image} width={200} height={200} alt="profile image" />
        ) : (
          <div>No Image</div>
        )}
        <div>email : {session.data?.user?.email}</div> 
        <div>name : {session.data?.user?.name}</div>
        <div>status : {session.status}</div>
      </div>
    </main>
  );
}
