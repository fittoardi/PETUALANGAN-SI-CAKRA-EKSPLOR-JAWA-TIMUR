import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Story() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl bg-white rounded-3xl shadow-2xl p-8 md:p-12"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
          className="flex justify-center mb-6"
        >
          <Sparkles size={64} className="text-yellow-500" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-center text-orange-600 mb-8">
          Cerita Pembuka
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-6 text-lg text-gray-700"
        >
          <p className="leading-relaxed">
            Pada suatu hari yang cerah di Jawa Timur, terjadi peristiwa misterius.{' '}
            <span className="font-bold text-orange-600">Lima Keping Budaya</span> yang menjaga
            warisan Nusantara tersebar ke seluruh penjuru daerah.
          </p>

          <p className="leading-relaxed">
            Keping-keping tersebut menyimpan nilai budaya dari lima kota di Jawa Timur:{' '}
            <span className="font-semibold">Surabaya</span>,{' '}
            <span className="font-semibold">Malang</span>,{' '}
            <span className="font-semibold">Banyuwangi</span>,{' '}
            <span className="font-semibold">Blitar</span>, dan{' '}
            <span className="font-semibold">Madura</span>.
          </p>

          <div className="bg-gradient-to-r from-orange-100 to-red-100 p-6 rounded-2xl border-2 border-orange-300">
            <p className="leading-relaxed font-medium text-orange-800">
              <span className="text-2xl">🦸‍♂️</span> Cakra, seorang pemuda pemberani, dipilih untuk
              menjelajahi kelima kota tersebut. Ia harus mengumpulkan semua Keping Budaya dan
              menjaga warisan Nusantara agar tidak hilang!
            </p>
          </div>

          <p className="leading-relaxed text-center font-bold text-xl text-purple-600">
            "Mari kita bantu Cakra dalam petualangannya!"
          </p>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/level1')}
          className="mt-8 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-8 rounded-full font-bold text-xl shadow-lg flex items-center justify-center gap-3 hover:shadow-2xl transition-shadow"
        >
          Mulai Petualangan
          <ArrowRight size={24} />
        </motion.button>
      </motion.div>
    </div>
  );
}
