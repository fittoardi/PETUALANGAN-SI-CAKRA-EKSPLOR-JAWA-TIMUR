import { Trophy, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScorePanelProps {
  score: number;
  timeLeft?: number;
  level: string;
}

export default function ScorePanel({ score, timeLeft, level }: ScorePanelProps) {
  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-16 left-0 right-0 bg-white shadow-md z-40"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-full">
            <Trophy className="text-yellow-600" size={20} />
            <span className="font-bold text-yellow-800">Skor: {score}</span>
          </div>
          {timeLeft !== undefined && (
            <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-full">
              <Clock className="text-blue-600" size={20} />
              <span className="font-bold text-blue-800">Waktu: {timeLeft}s</span>
            </div>
          )}
        </div>
        <div className="bg-orange-100 px-4 py-2 rounded-full">
          <span className="font-bold text-orange-800">{level}</span>
        </div>
      </div>
    </motion.div>
  );
}
