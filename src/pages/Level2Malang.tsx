import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScorePanel from '../components/ScorePanel';
import { ArrowRight } from 'lucide-react';

const GRID_SIZE = 3;
const PIECES = Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => i);

export default function Level2Malang() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [pieces, setPieces] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const shuffled = [...PIECES].sort(() => Math.random() - 0.5);
    setPieces(shuffled);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !completed) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !completed) {
      alert('Waktu habis! Coba lagi.');
      window.location.reload();
    }
  }, [timeLeft, completed]);

  useEffect(() => {
    const isComplete = pieces.every((piece, index) => piece === index);
    if (isComplete && pieces.length > 0 && !completed) {
      setCompleted(true);
      setScore(20);
    }
  }, [pieces, completed]);

  const handlePieceClick = (index: number) => {
    if (completed) return;

    const emptyIndex = pieces.indexOf(GRID_SIZE * GRID_SIZE - 1);
    const emptyRow = Math.floor(emptyIndex / GRID_SIZE);
    const emptyCol = emptyIndex % GRID_SIZE;
    const clickedRow = Math.floor(index / GRID_SIZE);
    const clickedCol = index % GRID_SIZE;

    const isAdjacent =
      (Math.abs(emptyRow - clickedRow) === 1 && emptyCol === clickedCol) ||
      (Math.abs(emptyCol - clickedCol) === 1 && emptyRow === clickedRow);

    if (isAdjacent) {
      const newPieces = [...pieces];
      [newPieces[emptyIndex], newPieces[index]] = [newPieces[index], newPieces[emptyIndex]];
      setPieces(newPieces);
    }
  };

  const handleNext = () => {
    const currentScore = parseInt(localStorage.getItem('cakra-total-score') || '0');
    localStorage.setItem('cakra-total-score', (currentScore + score).toString());
    navigate('/level3');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-300 to-orange-300">
      <Navbar />
      <ScorePanel score={score} timeLeft={timeLeft} level="Level 2: Malang" />

      <div className="pt-32 pb-8 px-4 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-center text-purple-600 mb-4">
            Puzzle Tugu Malang
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Susun puzzle dengan mengklik kotak yang berdekatan dengan kotak kosong
          </p>

          <div className="flex justify-center mb-8">
            <div
              className="grid gap-2 bg-gray-200 p-4 rounded-2xl"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
                width: 'min(100%, 400px)',
                aspectRatio: '1',
              }}
            >
              {pieces.map((piece, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: piece !== GRID_SIZE * GRID_SIZE - 1 ? 1.05 : 1 }}
                  whileTap={{ scale: piece !== GRID_SIZE * GRID_SIZE - 1 ? 0.95 : 1 }}
                  onClick={() => handlePieceClick(index)}
                  className={`rounded-xl font-bold text-2xl transition-all ${
                    piece === GRID_SIZE * GRID_SIZE - 1
                      ? 'bg-gray-300 cursor-default'
                      : 'bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  {piece !== GRID_SIZE * GRID_SIZE - 1 && piece + 1}
                </motion.button>
              ))}
            </div>
          </div>

          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center">
                <p className="font-bold text-xl">🎉 Selamat! Puzzle berhasil disusun!</p>
                <p className="text-lg">+20 poin</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
              >
                Lanjut ke Level 3
                <ArrowRight size={24} />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
