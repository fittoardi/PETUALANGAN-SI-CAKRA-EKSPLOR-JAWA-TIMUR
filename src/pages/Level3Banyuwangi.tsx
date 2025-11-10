import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScorePanel from '../components/ScorePanel';
import GameCharacter from '../components/GameCharacter';
import { ArrowRight, Gem, Cloud } from 'lucide-react';

const GAME_WIDTH = 600;
const GAME_HEIGHT = 400;
const MOVE_SPEED = 20;
const NUM_GEMS = 5;
const NUM_OBSTACLES = 3;

export default function Level3Banyuwangi() {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 50 });
  const [gems, setGems] = useState<{ x: number; y: number; collected: boolean }[]>([]);
  const [obstacles, setObstacles] = useState<{ x: number; y: number }[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const newGems = Array.from({ length: NUM_GEMS }, () => ({
      x: Math.random() * (GAME_WIDTH - 100) + 50,
      y: Math.random() * (GAME_HEIGHT - 100) + 50,
      collected: false,
    }));
    setGems(newGems);

    const newObstacles = Array.from({ length: NUM_OBSTACLES }, () => ({
      x: Math.random() * (GAME_WIDTH - 100) + 50,
      y: Math.random() * (GAME_HEIGHT - 100) + 50,
    }));
    setObstacles(newObstacles);
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !completed && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !completed) {
      setGameOver(true);
    }
  }, [timeLeft, completed, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (completed || gameOver) return;

      let newX = playerPos.x;
      let newY = playerPos.y;

      switch (e.key) {
        case 'ArrowLeft':
          newX = Math.max(0, playerPos.x - MOVE_SPEED);
          break;
        case 'ArrowRight':
          newX = Math.min(GAME_WIDTH - 64, playerPos.x + MOVE_SPEED);
          break;
        case 'ArrowUp':
          newY = Math.max(0, playerPos.y - MOVE_SPEED);
          break;
        case 'ArrowDown':
          newY = Math.min(GAME_HEIGHT - 64, playerPos.y + MOVE_SPEED);
          break;
        default:
          return;
      }

      setPlayerPos({ x: newX, y: newY });
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [playerPos, completed, gameOver]);

  useEffect(() => {
    gems.forEach((gem, index) => {
      if (!gem.collected) {
        const distance = Math.sqrt(
          Math.pow(playerPos.x - gem.x, 2) + Math.pow(playerPos.y - gem.y, 2)
        );
        if (distance < 40) {
          const newGems = [...gems];
          newGems[index].collected = true;
          setGems(newGems);
          setScore(score + 10);
        }
      }
    });

    obstacles.forEach((obstacle) => {
      const distance = Math.sqrt(
        Math.pow(playerPos.x - obstacle.x, 2) + Math.pow(playerPos.y - obstacle.y, 2)
      );
      if (distance < 50) {
        setGameOver(true);
      }
    });
  }, [playerPos, gems, obstacles, score]);

  useEffect(() => {
    if (gems.every((gem) => gem.collected) && gems.length > 0) {
      setCompleted(true);
    }
  }, [gems]);

  const handleNext = () => {
    const currentScore = parseInt(localStorage.getItem('cakra-total-score') || '0');
    localStorage.setItem('cakra-total-score', (currentScore + score).toString());
    navigate('/level4');
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-300 via-teal-300 to-blue-300">
      <Navbar />
      <ScorePanel score={score} timeLeft={timeLeft} level="Level 3: Banyuwangi" />

      <div className="pt-32 pb-8 px-4 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-center text-green-600 mb-4">
            Kumpulkan Keping Budaya
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Gunakan tombol panah ← ↑ ↓ → untuk menggerakkan Cakra. Hindari awan hitam!
          </p>

          <div className="flex justify-center mb-6">
            <div
              className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl border-4 border-green-400 overflow-hidden"
              style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
            >
              <GameCharacter position={playerPos} />

              {gems.map((gem, index) => (
                !gem.collected && (
                  <motion.div
                    key={index}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ left: gem.x, top: gem.y }}
                    className="absolute"
                  >
                    <Gem size={32} className="text-yellow-500" />
                  </motion.div>
                )
              ))}

              {obstacles.map((obstacle, index) => (
                <motion.div
                  key={index}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  style={{ left: obstacle.x, top: obstacle.y }}
                  className="absolute"
                >
                  <Cloud size={48} className="text-gray-700" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mb-4">
            <p className="text-lg font-semibold text-gray-700">
              Keping terkumpul: {gems.filter(g => g.collected).length} / {NUM_GEMS}
            </p>
          </div>

          {completed && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="bg-green-100 text-green-800 p-4 rounded-xl text-center">
                <p className="font-bold text-xl">🎉 Semua keping berhasil dikumpulkan!</p>
                <p className="text-lg">Total: +{score} poin</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
              >
                Lanjut ke Level 4
                <ArrowRight size={24} />
              </button>
            </motion.div>
          )}

          {gameOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="bg-red-100 text-red-800 p-4 rounded-xl text-center">
                <p className="font-bold text-xl">💥 Game Over!</p>
                <p>Kamu tertabrak rintangan atau waktu habis!</p>
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
