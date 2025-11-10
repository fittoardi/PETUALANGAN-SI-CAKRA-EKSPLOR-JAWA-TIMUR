import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ScorePanel from '../components/ScorePanel';
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react';

const questions = [
	{
		question: 'Apa julukan kota Surabaya?',
		options: ['Kota Pahlawan', 'Kota Kembang', 'Kota Apel', 'Kota Santri'],
		correct: 0,
	},
	{
		question: 'Makanan khas Surabaya yang terkenal adalah?',
		options: ['Rawon', 'Gudeg', 'Rendang', 'Soto Betawi'],
		correct: 0,
	},
	{
		question: 'Monumen apa yang menjadi simbol kepahlawanan Surabaya?',
		options: [
			'Monas',
			'Tugu Pahlawan',
			'Patung Pancoran',
			'Monumen Perjuangan',
		],
		correct: 1,
	},
];

export default function Level1Surabaya() {
	const navigate = useNavigate();
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
	const [showResult, setShowResult] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

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
		} else {
			if (score >= 20) {
				const currentScore = parseInt(
					localStorage.getItem('cakra-total-score') || '0'
				);
				localStorage.setItem(
					'cakra-total-score',
					(currentScore + score).toString()
				);
				navigate('/level2');
			} else {
				alert('Skor kurang! Coba lagi untuk mendapat minimal 20 poin.');
				window.location.reload();
			}
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-300 via-green-300 to-yellow-300">
			<Navbar />
			<ScorePanel score={score} level="Level 1: Surabaya" />

			<div className="pt-32 pb-8 px-4 flex items-center justify-center min-h-screen">
				<motion.div
					initial={{ scale: 0.9, opacity: 0 }}
					animate={{ scale: 1, opacity: 1 }}
					className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8"
				>
					<div className="mb-6">
						<div className="flex justify-between items-center mb-4">
							<h2 className="text-2xl font-bold text-orange-600">
								Kuis Budaya Surabaya
							</h2>
							<span className="text-lg font-semibold text-gray-600">
								Soal {currentQuestion + 1} / {questions.length}
							</span>
						</div>
						<div className="h-2 bg-gray-200 rounded-full">
							<motion.div
								initial={{ width: 0 }}
								animate={{
									width: `${
										((currentQuestion + 1) / questions.length) * 100
									}%`,
								}}
								className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
							/>
						</div>
					</div>

					<div className="mb-8">
						<p className="text-xl font-semibold text-gray-800 mb-6">
							{questions[currentQuestion].question}
						</p>

						<div className="space-y-3">
							{questions[currentQuestion].options.map((option, index) => (
								<motion.button
									key={index}
									whileHover={{
										scale: selectedAnswer === null ? 1.02 : 1,
									}}
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
										{showResult &&
											index === questions[currentQuestion].correct &&
											selectedAnswer !== index && (
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
							<div
								className={`p-4 rounded-xl mb-4 ${
									isCorrect
										? 'bg-green-100 text-green-800'
										: 'bg-red-100 text-red-800'
								}`}
							>
								<p className="font-semibold">
									{isCorrect ? '✓ Benar! +10 poin' : '✗ Salah! -5 poin'}
								</p>
							</div>

							<button
								onClick={handleNext}
								className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
							>
								{currentQuestion < questions.length - 1
									? 'Soal Berikutnya'
									: 'Selesai'}
								<ArrowRight size={24} />
							</button>
						</motion.div>
					)}
				</motion.div>
			</div>
		</div>
	);
}
