'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LoadingSpinner from '@/components/LoadingSpinner'; // Importamos nossa animação

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [minimumTimeElapsed, setMinimumTimeElapsed] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMinimumTimeElapsed(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // ESTE É O GATILHO:
  // Enquanto o status for 'loading', exibimos a animação.
  if (status === 'loading' || !minimumTimeElapsed) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <LoadingSpinner />
      </div>
    );
  }

  // Se o status for 'authenticated', exibimos o dashboard completo.
  if (status === 'authenticated') {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        {/* Card Principal do Dashboard */}
        <div className="w-full max-w-lg bg-ubuntu-yellow border-4 border-black rounded-lg shadow-lg p-8 flex flex-col items-center space-y-6">
          <h2 className="font-square text-2xl text-black text-center">
            Bem-vindo, {session.user?.name}!
          </h2>
          <Link href="/proposals/new">
            <button className="w-full max-w-xs bg-white border-2 border-black rounded-md py-2 px-4 font-square text-black text-xl hover:bg-gray-200 transition-colors">
              CRIAR PROPOSTA
            </button>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full max-w-xs bg-black border-2 border-black rounded-md py-2 px-4 font-square text-ubuntu-yellow text-xl hover:bg-gray-800 transition-colors"
          >
            SAIR
          </button>
        </div>
        <p className="font-sans text-ubuntu-brown text-xs mt-8">
          SISTEMA INTERNO DA UBUNTU TECH
        </p>
      </main>
    );
  }

  // Se nenhum dos status acima for verdadeiro, não renderiza nada.
  return null;
}