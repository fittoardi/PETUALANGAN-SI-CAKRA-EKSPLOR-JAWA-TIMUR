import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Sparkles, RotateCcw, Home } from 'lucide-react';

export default function Ending() {
  const navigate = useNavigate();
  const [totalScore, setTotalScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const score = parseInt(localStorage.getItem('cakra-total-score') || '0');
    setTotalScore(score);

    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handlePlayAgain = () => {
    localStorage.removeItem('cakra-total-score');
    localStorage.removeItem('cakra-completed-levels');
    navigate('/');
  };

  const confettiPieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 3 + Math.random() * 2,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300 flex items-center justify-center p-4 relative overflow-hidden">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {confettiPieces.map((piece) => (
            <motion.div
              key={piece.id}
              initial={{ y: -20, x: `${piece.x}vw`, rotate: 0, opacity: 1 }}
              animate={{
                y: '100vh',
                rotate: 360,
                opacity: 0,
              }}
              transition={{
                duration: piece.duration,
                delay: piece.delay,
                ease: 'linear',
              }}
              className="absolute w-4 h-4 bg-gradient-to-br from-yellow-400 to-red-400 rounded-full"
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
        className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-12 text-center relative z-10"
      >
        <motion.div
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="flex justify-center mb-6"
        >
          <Trophy size={120} className="text-yellow-500" />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl font-bold text-orange-600 mb-4"
        >
          🎉 Selamat, Cakra! 🎉
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-2xl text-gray-700 mb-8"
        >
          Kamu telah mengumpulkan semua Keping Budaya Jawa Timur!
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: 'spring' }}
          className="bg-gradient-to-r from-yellow-100 to-orange-100 p-8 rounded-2xl mb-8 border-4 border-yellow-400"
        >
          <p className="text-4xl font-bold text-orange-600 mb-2">Total Skor</p>
          <motion.p
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1, type: 'spring', stiffness: 200 }}
            className="text-6xl font-black text-yellow-600"
          >
            {totalScore}
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="space-y-4 mb-8"
        >
          <div className="flex items-center justify-center gap-4">
            <Sparkles className="text-blue-500" size={24} />
            <p className="text-lg text-gray-700">✓ Surabaya - Kuis Budaya</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Sparkles className="text-purple-500" size={24} />
            <p className="text-lg text-gray-700">✓ Malang - Puzzle Tugu</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Sparkles className="text-green-500" size={24} />
            <p className="text-lg text-gray-700">✓ Banyuwangi - Kumpulkan Keping</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Sparkles className="text-orange-500" size={24} />
            <p className="text-lg text-gray-700">✓ Blitar - Tebak Tokoh</p>
          </div>
          <div className="flex items-center justify-center gap-4">
            <Sparkles className="text-red-500" size={24} />
            <p className="text-lg text-gray-700">✓ Madura - Klik Cepat</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="space-y-4"
        >
          <button
            onClick={handlePlayAgain}
            className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-full font-bold text-xl shadow-lg flex items-center justify-center gap-3 hover:shadow-2xl transition-shadow"
          >
            <RotateCcw size={24} />
            Main Lagi
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full bg-white text-orange-600 py-4 px-8 rounded-full font-bold text-xl shadow-lg flex items-center justify-center gap-3 hover:shadow-2xl transition-shadow border-2 border-orange-500"
          >
            <Home size={24} />
            Ke Menu Utama
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 text-gray-600 italic"
        >
          "Warisan budaya Jawa Timur akan terus terjaga berkat keberanian dan pengetahuanmu!"
        </motion.p>
      </motion.div>
    </div>
  );
}
