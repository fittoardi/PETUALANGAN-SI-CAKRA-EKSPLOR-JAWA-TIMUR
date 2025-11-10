import { Home, Volume2, VolumeX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const [isMuted, setIsMuted] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <Home size={24} />
          <span className="font-bold text-lg">Menu Utama</span>
        </button>
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="hover:scale-105 transition-transform"
        >
          {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      </div>
    </nav>
  );
}
