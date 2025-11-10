import { ReactNode } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

type DialogBoxProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: ReactNode;
  children?: ReactNode;
};

export default function DialogBox({ isOpen, onClose, title, children }: DialogBoxProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 30, opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-2xl w-[90vw] max-w-2xl p-6 mx-auto relative border border-gray-200"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-orange-600">{title}</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 transition"
          aria-label="Close"
        >
          <X size={24} />
        </button>
      </div>
      <div className="max-h-[70vh] overflow-y-auto pr-2">{children}</div>
    </motion.div>
  );
}

