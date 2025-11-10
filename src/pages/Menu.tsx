import { motion } from 'framer-motion';
import { Play, BookOpen, LogOut, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DialogBox from '../components/DialogBox';

export default function Menu() {
  const navigate = useNavigate();
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-red-400 to-pink-400 flex flex-col items-center justify-center px-4 text-center">
      {/* Judul & Header */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-8 flex flex-col items-center"
        >
          <MapPin size={80} className="text-white mb-4" />
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-2">
            Petualangan Si Cakra
          </h1>
          <p className="text-2xl md:text-3xl text-white drop-shadow-lg">
            Eksplor Jawa Timur
          </p>
        </motion.div>

        {/* Tombol */}
        <div className="flex flex-col items-center space-y-4 w-full">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/story')}
            className="w-64 md:w-80 bg-white text-orange-600 py-4 px-8 rounded-full font-bold text-xl shadow-lg flex items-center justify-center gap-3 hover:shadow-2xl transition-shadow"
          >
            <Play size={24} />
            Mulai Petualangan
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowInstructions(true)}
            className="w-64 md:w-80 bg-white text-blue-600 py-4 px-8 rounded-full font-bold text-xl shadow-lg flex items-center justify-center gap-3 hover:shadow-2xl transition-shadow"
          >
            <BookOpen size={24} />
            Petunjuk
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.close()}
            className="w-64 md:w-80 bg-white text-red-600 py-4 px-8 rounded-full font-bold text-xl shadow-lg flex items-center justify-center gap-3 hover:shadow-2xl transition-shadow"
          >
            <LogOut size={24} />
            Keluar
          </motion.button>
        </div>

        {/* Kota-kota */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex justify-center gap-4 flex-wrap"
        >
          {['Surabaya', 'Malang', 'Banyuwangi', 'Blitar', 'Madura'].map((city, i) => (
            <motion.div
              key={city}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full text-white font-semibold"
            >
              {city}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Modal Petunjuk */}
      {showInstructions && (
        <div className="fixed inset-0 flex items-start justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50 overflow-y-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="mt-20 mb-10"
          >
            <DialogBox
              isOpen={showInstructions}
              onClose={() => setShowInstructions(false)}
              title="Petunjuk Permainan"
            >
              <div className="space-y-4 text-left">
                <p className="text-gray-700">
                  Bantu Cakra mengumpulkan 5 Keping Budaya dari berbagai kota di Jawa Timur!
                </p>
                <div className="space-y-2">
                  {[
                    {
                      no: 1,
                      color: 'bg-orange-500',
                      kota: 'Surabaya',
                      desc: 'Jawab 3 kuis tentang budaya dan kuliner',
                    },
                    {
                      no: 2,
                      color: 'bg-blue-500',
                      kota: 'Malang',
                      desc: 'Susun puzzle Tugu Malang dalam 60 detik',
                    },
                    {
                      no: 3,
                      color: 'bg-green-500',
                      kota: 'Banyuwangi',
                      desc: 'Gerakkan Cakra dan kumpulkan keping budaya',
                    },
                    {
                      no: 4,
                      color: 'bg-purple-500',
                      kota: 'Blitar',
                      desc: 'Tebak suara dan gambar tokoh perjuangan',
                    },
                    {
                      no: 5,
                      color: 'bg-red-500',
                      kota: 'Madura',
                      desc: 'Klik cepat sate dan batik dalam 30 detik',
                    },
                  ].map((item) => (
                    <div key={item.no} className="flex items-start gap-3">
                      <span
                        className={`${item.color} text-white w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0`}
                      >
                        {item.no}
                      </span>
                      <div>
                        <p className="font-bold">{item.kota}</p>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-300 shadow-inner">
                  <p className="font-bold text-yellow-800">Tips:</p>
                  <ul className="text-sm text-yellow-700 list-disc list-inside">
                    <li>Setiap jawaban benar menambah skor</li>
                    <li>Selesaikan cepat untuk bonus waktu</li>
                    <li>Hindari rintangan di level 3</li>
                  </ul>
                </div>
              </div>
            </DialogBox>
          </motion.div>
        </div>
      )}
    </div>
  );
}
