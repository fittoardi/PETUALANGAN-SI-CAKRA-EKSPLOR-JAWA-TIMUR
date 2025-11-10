import { motion } from 'framer-motion';
import { useDrag } from '../hooks/useDrag';

interface PuzzlePieceProps {
  id: number;
  currentPosition: { x: number; y: number };
  targetPosition: { x: number; y: number };
  onDrop: (id: number, position: { x: number; y: number }) => void;
  isPlaced: boolean;
}

export default function PuzzlePiece({
  id,
  currentPosition,
  targetPosition,
  onDrop,
  isPlaced,
}: PuzzlePieceProps) {
  const { position, handleMouseDown } = useDrag(
    currentPosition,
    (pos) => onDrop(id, pos),
    isPlaced
  );

  const colors = ['bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 'bg-purple-400', 'bg-pink-400'];

  return (
    <motion.div
      style={{
        left: position.x,
        top: position.y,
      }}
      className={`absolute w-24 h-24 ${colors[id % colors.length]} rounded-lg cursor-move shadow-lg flex items-center justify-center font-bold text-white text-2xl ${
        isPlaced ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onMouseDown={handleMouseDown}
      whileHover={!isPlaced ? { scale: 1.1 } : {}}
      whileTap={!isPlaced ? { scale: 0.95 } : {}}
    >
      {id + 1}
    </motion.div>
  );
}
