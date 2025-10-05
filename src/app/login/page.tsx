'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const result = await signIn('credentials', {
      redirect: false, // Importante: não redireciona a página automaticamente
      email,
      password,
    });

    if (result?.error) {
      // Se houver erro (senha errada, etc.), mostramos a mensagem
      setError('Credenciais inválidas. Tente novamente.');
    } else {
      // Se o login for bem-sucedido, redireciona para a página principal
      router.push('/');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4 bg-cover bg-center" style={{ backgroundImage: "url('/images/BACKGROUND.png')" }}>
      {/* Cabeçalho com Logo e Título */}
      <div className="flex flex-col items-center mb-8 text-center">
        <div className="flex items-center justify-center">
          <Image
            src="/images/logo.png"
            alt="Logo Ubuntu Tech"
            width={100}
            height={100}
          />
          <h1 className="font-square text-6xl md:text-7xl text-ubuntu-yellow ml-4 tracking-wider">
            UBUNTU TECH
          </h1>
        </div>
        <p className="font-bebas text-ubuntu-brown text-sm mt-2 tracking-wider">
          GERADOR DE PROPOSTAS INTELIGENTE
        </p>
      </div>

      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-ubuntu-brown">
          Acessar a Plataforma
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-ubuntu-brown"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-ubuntu-brown border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="seuemail@exemplo.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-ubuntu-brown"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-3 py-2 mt-1 text-ubuntu-brown border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="********"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Entrar
            </button>
          </div>
        </form>
        <p className="mt-6 text-sm text-center text-ubuntu-brown">
            Não tem uma conta?{' '}
        <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
        Cadastre-se
        </Link>
        </p>
      </div>
    </div>
  );
}