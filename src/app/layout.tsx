import AuthProvider from '@/components/AuthProvider' // <-- Importe aqui
import './globals.css'
import localFont from 'next/font/local';
import { Bebas_Neue } from 'next/font/google';

// Configuração da fonte local
const squareFont = localFont({
  src: '../../public/fonts/Square.ttf', // Caminho para o seu arquivo de fonte
  display: 'swap',
  variable: '--font-square', // Nome da variável CSS que vamos criar
});

// Configuração da fonte Bebas Neue
const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas', // Nome da variável CSS que vamos criar
});

export const metadata = {
  title: 'Gerador de Propostas Ubuntu Tech',
  description: 'Gere propostas de forma rápida e eficiente',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br" className={`${squareFont.variable} ${bebasNeue.variable}`}>
      <body className="bg-ubuntu-yellow-light">
        {/* O AuthProvider fica aqui, por volta de tudo */}
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}