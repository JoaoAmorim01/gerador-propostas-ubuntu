// src/components/LoadingSpinner.tsx
import Image from 'next/image';

export default function LoadingSpinner() {
  return (
    <div className="relative w-40 h-40 flex items-center justify-center">
      {/* Imagem da Borda que vai girar */}
      <div className="absolute w-full h-full animate-spin-slow">
        <Image
          src="/images/ubuntu-borda.png"
          alt="Carregando..."
          fill
          className="object-contain"
        />
      </div>

      {/* Imagem da Árvore que ficará parada */}
      <div className="absolute w-full h-full">
        <Image
          src="/images/ubuntu-disco.png"
          alt="Ubuntu Tech"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}