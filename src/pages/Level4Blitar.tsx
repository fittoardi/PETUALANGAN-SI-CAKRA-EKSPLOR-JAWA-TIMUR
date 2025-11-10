import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScorePanel from '../components/ScorePanel';
import { ArrowRight, Volume2, CheckCircle, XCircle } from 'lucide-react';

const questions = [
  {
    question: 'Tokoh proklamator yang dimakamkan di Blitar adalah?',
    options: ['Soekarno', 'Mohammad Hatta', 'Soeharto', 'Habibie'],
    correct: 0,
    hint: '🎤 Beliau adalah Presiden pertama Indonesia',
  },
  {
    question: 'Makam Bung Karno terletak di?',
    options: ['Taman Makam Pahlawan', 'Makam Keluarga Blitar', 'Astana Giribangun', 'Jeruk Purut'],
    correct: 1,
    hint: '🏛️ Tempat pemakaman keluarga di Blitar',
  },
  {
    question: 'Apa yang menjadi warisan perjuangan dari tokoh Blitar?',
    options: ['Semangat pantang menyerah', 'Kekayaan melimpah', 'Teknologi canggih', 'Bangunan megah'],
    correct: 0,
    hint: '💪 Nilai yang harus diteladani',
  },
];

export default function Level4Blitar() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const correct = index === questions[currentQuestion].correct;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setScore(score + 10);
    } else {
      setScore(Math.max(0, score - 5));
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setShowHint(false);
    } else {
      const currentScore = parseInt(localStorage.getItem('cakra-total-score') || '0');
      localStorage.setItem('cakra-total-score', (currentScore + score).toString());
      navigate('/level5');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-300 via-orange-300 to-red-300">
      <Navbar />
      <ScorePanel score={score} level="Level 4: Blitar" />

      <div className="pt-32 pb-8 px-4 flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8"
        >
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-orange-600">
                Tebak Tokoh Blitar
              </h2>
              <span className="text-lg font-semibold text-gray-600">
                Soal {currentQuestion + 1} / {questions.length}
              </span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
              />
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xl font-semibold text-gray-800">
                {questions[currentQuestion].question}
              </p>
              <button
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors"
              >
                <Volume2 size={20} />
                <span className="font-semibold">Petunjuk</span>
              </button>
            </div>

            {showHint && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-50 border-2 border-blue-300 p-4 rounded-xl mb-4"
              >
                <p className="text-blue-800 font-medium">
                  {questions[currentQuestion].hint}
                </p>
              </motion.div>
            )}

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: selectedAnswer === null ? 1.02 : 1 }}
                  whileTap={{ scale: selectedAnswer === null ? 0.98 : 1 }}
                  onClick={() => handleAnswer(index)}
                  disabled={selectedAnswer !== null}
                  className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                    selectedAnswer === null
                      ? 'bg-gray-100 hover:bg-gray-200 text-gray-800'
                      : selectedAnswer === index
                      ? isCorrect
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : index === questions[currentQuestion].correct
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && selectedAnswer === index && (
                      isCorrect ? (
                        <CheckCircle size={24} />
                      ) : (
                        <XCircle size={24} />
                      )
                    )}
                    {showResult && index === questions[currentQuestion].correct && selectedAnswer !== index && (
                      <CheckCircle size={24} />
                    )}
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {showResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className={`p-4 rounded-xl mb-4 ${
                isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                <p className="font-semibold">
                  {isCorrect ? '✓ Benar! +10 poin' : '✗ Salah! -5 poin'}
                </p>
              </div>

              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
              >
                {currentQuestion < questions.length - 1 ? 'Soal Berikutnya' : 'Lanjut ke Level 5'}
                <ArrowRight size={24} />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
