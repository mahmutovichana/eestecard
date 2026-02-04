'use client';

import Image from 'next/image';
import { Home, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UserNav() {
  const router = useRouter();

  const handleHome = () => {
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={handleHome}
          className="flex items-center gap-3 hover:opacity-75 transition"
        >
          <div className="w-10 h-10 bg-eestec-red rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">E</span>
          </div>
          <div>
            <p className="text-sm font-bold text-eestec-red">EESTEC</p>
            <p className="text-xs text-gray-500">LC Sarajevo</p>
          </div>
        </button>

        <button
          onClick={handleHome}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
        >
          <Home className="w-5 h-5" />
          Home
        </button>
      </div>
    </header>
  );
}
