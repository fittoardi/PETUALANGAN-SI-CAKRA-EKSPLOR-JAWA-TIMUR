import { motion } from 'framer-motion';
import { User } from 'lucide-react';

interface GameCharacterProps {
  position: { x: number; y: number };
}

export default function GameCharacter({ position }: GameCharacterProps) {
  return (
    <motion.div
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="absolute w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg z-10"
    >
      <User size={32} className="text-white" />
    </motion.div>
  );
}
