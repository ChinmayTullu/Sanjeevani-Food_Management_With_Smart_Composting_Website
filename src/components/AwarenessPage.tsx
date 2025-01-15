"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, ChevronRight, Sprout, Leaf } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  choices: string[];
  correctAnswer: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What is composting?",
    choices: [
      "Burning food waste to create ash",
      "Breaking down organic matter into nutrient-rich soil",
      "Mixing food waste with chemicals",
      "Throwing food waste in landfills",
    ],
    correctAnswer: 1,
    explanation:
      "Composting is a natural process of breaking down organic matter into nutrient-rich soil that can be used to enrich gardens and farms.",
  },
  {
    id: 2,
    question: "Which of these materials should NOT go into a compost bin?",
    choices: [
      "Coffee grounds",
      "Meat and dairy products",
      "Fruit peels",
      "Vegetable scraps",
    ],
    correctAnswer: 1,
    explanation:
      "Meat and dairy products should not be composted in home systems as they can attract pests and may not break down properly.",
  },
  {
    id: 3,
    question: "What is the ideal carbon-to-nitrogen ratio for composting?",
    choices: ["10:1", "30:1", "50:1", "70:1"],
    correctAnswer: 1,
    explanation:
      "The ideal carbon-to-nitrogen ratio for composting is 30:1. This balance ensures efficient decomposition.",
  },
  {
    id: 4,
    question: "How often should you turn a compost pile?",
    choices: ["Once a day", "Once a week", "Once a month", "Never"],
    correctAnswer: 1,
    explanation:
      "Turning a compost pile once a week helps aerate it and speed up the decomposition process.",
  },
  {
    id: 5,
    question: "What is food sharing?",
    choices: [
      "Selling food at a discount",
      "Distributing surplus food to reduce waste",
      "Cooking meals for the community",
      "Throwing away unused food",
    ],
    correctAnswer: 1,
    explanation:
      "Food sharing involves distributing surplus food to reduce waste and help those in need.",
  },
];

const AwarenessPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const handleAnswerSelection = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
    setShowExplanation(true);
    if (choiceIndex === quizQuestions[currentQuestionIndex].correctAnswer) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setSelectedChoice(null);
      setShowExplanation(false);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedChoice(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-brown-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 opacity-10">
          <Sprout className="w-32 h-32 text-green-600" />
        </div>
        <div className="absolute top-0 right-0 opacity-10">
          <Leaf className="w-32 h-32 text-brown-600" />
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-800 via-brown-700 to-green-600 bg-clip-text text-transparent">
            Eco-Awareness Quiz
          </h1>
          <p className="text-lg text-brown-600">
            Test your knowledge about composting & food sharing
          </p>
        </div>

        {currentQuestionIndex < quizQuestions.length-1 ? (
          <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg bg-opacity-90 border border-green-100">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm text-green-800 mb-2">
                <span className="font-medium">
                  Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </span>
                <span className="font-medium">
                  Score: {correctAnswers}/{currentQuestionIndex + 1}
                </span>
              </div>
              <div className="w-full h-3 bg-green-100 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`,
                  }}
                  transition={{ duration: 0.5 }}
                  className="h-full bg-gradient-to-r from-green-600 to-green-400 rounded-full"
                />
              </div>
            </div>

            {/* Question */}
            <h2 className="text-2xl font-bold text-brown-800 mb-8">
              {currentQuestion.question}
            </h2>

            {/* Choices */}
            <div className="space-y-4">
              {currentQuestion.choices.map((choice, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className={`w-full p-6 rounded-xl text-left transition duration-200 ${
                    selectedChoice === null
                      ? "hover:bg-green-50 border-2 border-green-100"
                      : selectedChoice === index
                      ? index === currentQuestion.correctAnswer
                        ? "bg-green-100 border-2 border-green-500"
                        : "bg-red-50 border-2 border-red-300"
                      : "opacity-70 border-2 border-transparent"
                  }`}
                  onClick={() => handleAnswerSelection(index)}
                  disabled={showExplanation}
                >
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full mr-4 flex items-center justify-center ${
                        selectedChoice === index
                          ? index === currentQuestion.correctAnswer
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-green-100"
                      }`}
                    >
                      {selectedChoice === index ? (
                        index === currentQuestion.correctAnswer ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <XCircle className="w-5 h-5" />
                        )
                      ) : (
                        <span className="text-green-800 font-medium">
                          {String.fromCharCode(65 + index)}
                        </span>
                      )}
                    </div>
                    <span className="text-lg font-medium text-brown-700">
                      {choice}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 rounded-xl bg-gradient-to-br from-green-50 to-brown-50"
              >
                <div className="flex items-start">
                  {selectedChoice === currentQuestion.correctAnswer ? (
                    <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-500 mr-3 mt-1" />
                  )}
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      {selectedChoice === currentQuestion.correctAnswer
                        ? "Excellent!"
                        : "Not quite right"}
                    </h3>
                    <p className="text-brown-700">{currentQuestion.explanation}</p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Next Question Button */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-8 flex justify-center"
              >
                <button
                  onClick={handleNextQuestion}
                  className="group flex items-center px-8 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1"
                >
                  <span className="font-medium mr-2">Next Question</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}
          </div>
        ) : (
          <div className="text-center p-8 bg-white rounded-2xl shadow-xl">
            <h2 className="text-3xl font-bold text-green-700 mb-4">
              Quiz Completed! 🎉
            </h2>
            <p className="text-lg text-brown-600">
              Thank you for participating in our eco-awareness quiz!
            </p>
            <p className="mt-4 text-lg">
              Your Score:{" "}
              <span className="font-bold text-green-600">
                {correctAnswers}/{quizQuestions.length}
              </span>
            </p>
            <button
              onClick={handleRestartQuiz}
              className="mt-6 px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AwarenessPage;
