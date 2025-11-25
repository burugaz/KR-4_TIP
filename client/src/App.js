import React, { useState } from 'react';
import './App.css';

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Какой язык программирования вы предпочитаете?",
      type: "radio",
      options: ["JavaScript", "Python", "Java", "C++"]
    },
    {
      id: 2,
      question: "Какие технологии вы используете?",
      type: "checkbox",
      options: ["React", "Vue", "Angular", "Node.js"]
    },
    {
      id: 3,
      question: "Оцените ваш опыт в программировании:",
      type: "radio",
      options: ["Начинающий", "Средний", "Продвинутый", "Эксперт"]
    },
    {
      id: 4,
      question: "Что вам нравится в веб-разработке?",
      type: "textarea"
    }
  ];

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const renderQuestion = () => {
    const question = questions[currentQuestion];

    switch (question.type) {
      case 'radio':
        return (
          <div className="options">
            {question.options.map((option, index) => (
              <label key={index} className="option">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  value={option}
                  checked={answers[currentQuestion] === option}
                  onChange={() => handleAnswer(option)}
                />
                {option}
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        const currentAnswers = answers[currentQuestion] || [];
        return (
          <div className="options">
            {question.options.map((option, index) => (
              <label key={index} className="option">
                <input
                  type="checkbox"
                  value={option}
                  checked={currentAnswers.includes(option)}
                  onChange={(e) => {
                    const newAnswers = e.target.checked
                      ? [...currentAnswers, option]
                      : currentAnswers.filter(item => item !== option);
                    handleAnswer(newAnswers);
                  }}
                />
                {option}
              </label>
            ))}
          </div>
        );

      case 'textarea':
        return (
          <textarea
            className="text-answer"
            value={answers[currentQuestion] || ''}
            onChange={(e) => handleAnswer(e.target.value)}
            placeholder="Введите ваш ответ..."
            rows={4}
          />
        );

      default:
        return null;
    }
  };

  const renderResults = () => {
    return (
      <div className="results">
        <h2>Результаты опроса</h2>
        {questions.map((question, index) => (
          <div key={question.id} className="result-item">
            <h3>Вопрос {index + 1}: {question.question}</h3>
            <p className="answer">
              {Array.isArray(answers[index])
                ? answers[index].join(', ')
                : answers[index] || 'Не ответил'
              }
            </p>
          </div>
        ))}
        <button className="restart-btn" onClick={handleRestart}>
          Пройти опрос заново
        </button>
      </div>
    );
  };

  if (showResults) {
    return renderResults();
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="app">
      <div className="quiz-container">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <div className="question-card">
          <h2>Вопрос {currentQuestion + 1} из {questions.length}</h2>
          <p className="question-text">{question.question}</p>

          {renderQuestion()}

          <div className="navigation">
            <button
              className="nav-btn prev-btn"
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              Назад
            </button>

            <button
              className="nav-btn next-btn"
              onClick={handleNext}
              disabled={!answers[currentQuestion] ||
                (Array.isArray(answers[currentQuestion]) &&
                 answers[currentQuestion].length === 0)}
            >
              {currentQuestion === questions.length - 1 ? 'Завершить' : 'Далее'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;