import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScorePanel from '../components/ScorePanel';
import { ArrowRight } from 'lucide-react';

interface Item {
  id: number;
  type: 'sate' | 'batik' | 'wrong';
  x: number;
  y: number;
}

export default function Level5Madura() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [items, setItems] = useState<Item[]>([]);
  const [completed, setCompleted] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !completed && !failed) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      if (score >= 50) {
        setCompleted(true);
      } else {
        setFailed(true);
      }
    }
  }, [timeLeft, completed, failed, score]);

  useEffect(() => {
    if (completed || failed) return;

    const spawnInterval = setInterval(() => {
      const types: ('sate' | 'batik' | 'wrong')[] = ['sate', 'batik', 'wrong', 'wrong'];
      const randomType = types[Math.floor(Math.random() * types.length)];

      const newItem: Item = {
        id: Date.now() + Math.random(),
        type: randomType,
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 10,
      };

      setItems((prev) => [...prev, newItem]);

      setTimeout(() => {
        setItems((prev) => prev.filter((item) => item.id !== newItem.id));
      }, 2000);
    }, 800);

    return () => clearInterval(spawnInterval);
  }, [completed, failed]);

  const handleItemClick = (item: Item) => {
    if (item.type === 'sate' || item.type === 'batik') {
      setScore(score + 10);
    } else {
      setScore(Math.max(0, score - 5));
    }
    setItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const handleNext = () => {
    const currentScore = parseInt(localStorage.getItem('cakra-total-score') || '0');
    localStorage.setItem('cakra-total-score', (currentScore + score).toString());
    navigate('/ending');
  };

  const handleRetry = () => {
    window.location.reload();
  };

  const getEmoji = (type: string) => {
    switch (type) {
      case 'sate':
        return '�串';
      case 'batik':
        return '👕';
      case 'wrong':
        return '❌';
      default:
        return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-300 via-pink-300 to-purple-300">
      <Navbar />
      <ScorePanel score={score} timeLeft={timeLeft} level="Level 5: Madura" />

      <div className="pt-32 pb-8 px-4 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-center text-red-600 mb-4">
            Klik Cepat Sate & Batik
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Klik sate 🍢 dan batik 👕 untuk dapat poin. Hindari simbol ❌!
          </p>

          <div className="relative bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl border-4 border-red-400 mb-6"
            style={{ height: '400px' }}>
            <AnimatePresence>
              {items.map((item) => (
                <motion.button
                  key={item.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  whileHover={{ scale: 1.2 }}
                  onClick={() => handleItemClick(item)}
                  className={`absolute text-6xl cursor-pointer transition-transform ${
                    item.type === 'wrong' ? 'hover:scale-90' : ''
                  }`}
                  style={{
                    left: `${item.x}%`,
                    top: `${item.y}%`,
                  }}
                >
                  {getEmoji(item.type)}
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          <div className="text-center mb-4">
            <p className="text-lg font-semibold text-gray-700">
              Target: 50 poin untuk lanjut!
            </p>
          </div>

          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center">
                <p className="font-bold text-xl">🎉 Luar biasa! Target tercapai!</p>
                <p className="text-lg">Total: {score} poin</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
              >
                Selesaikan Petualangan
                <ArrowRight size={24} />
              </button>
            </motion.div>
          )}

          {failed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="bg-red-100 text-red-800 p-4 rounded-xl text-center">
                <p className="font-bold text-xl">⏰ Waktu habis!</p>
                <p>Skor kamu: {score} poin (butuh 50 poin)</p>
              </div>

              <button
                onClick={handleRetry}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-shadow"
              >
                Coba Lagi
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
