'use client';

import Link from 'next/link';

export default function NewProposalPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl bg-yellow-400 border-4 border-black rounded-lg shadow-lg p-8">
        <h1 className="font-square text-4xl text-black text-center mb-6">
          Nova Proposta
        </h1>

        <form className="space-y-6">
          <div>
            <label
              htmlFor="client_name"
              className="block text-lg font-square text-black"
            >
              Nome do Cliente
            </label>
            <input
              id="client_name"
              type="text"
              className="mt-1 block w-full bg-white border-2 border-black rounded-md py-2 px-4 font-sans text-black"
              placeholder="Digite o nome do cliente ou da empresa"
            />
          </div>

          <div>
            <label
              htmlFor="client_email"
              className="block text-lg font-square text-black"
            >
              Email do Cliente
            </label>
            <input
              id="client_email"
              type="email"
              className="mt-1 block w-full bg-white border-2 border-black rounded-md py-2 px-4 font-sans text-black"
              placeholder="email@cliente.com"
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <Link href="/" className="font-square text-black hover:underline">
              CANCELAR
            </Link>
            <button
              type="submit"
              className="bg-black border-2 border-black rounded-md py-2 px-8 font-square text-yellow-400 text-xl hover:bg-gray-800 transition-colors"
            >
              SALVAR E CONTINUAR
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}