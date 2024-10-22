import React, { useState } from 'react';
import Link from 'next/link';

export default function Questions({ allquestions,currentUrl }) {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [questionAnswered, setQuestionAnswered] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [answeredCorrect, setAnsweredCorrect] = useState(false);
  const [result, setResult] = useState({
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const category= currentUrl.split("/").reverse()[0];
  const questions=allquestions.filter(question=>question.category===category)

  const { question, answers, correctAnswer } = questions[activeQuestion];
 
 
 

  

  const onAnswerSelected = (answer, id) => {
    setChecked(true);
    setSelectedAnswerIndex(id);
    setQuestionAnswered(true);
    if (answer === correctAnswer) {
      setAnsweredCorrect(true);
    } else {
      setAnsweredCorrect(false);
    }
  };

  const nextQuestion = () => {
    setQuestionAnswered(false);
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      answeredCorrect
        ? { ...prev, correctAnswers: prev.correctAnswers + 1 }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResult(true);
    }
    setChecked(false);
  };

  return (
    <div className='container'>
      <h1>Quiz {category}</h1>
      <div>
        {!showResult ? (
          <div className='quiz-container'>
            <div>
              <h2>
                Question: {activeQuestion + 1}
                <span>/{questions.length}</span>
              </h2>
            </div>
            <h3>{question}</h3>
            {answers.map((answer, id) => (
              <li
                key={id}
                onClick={() => !questionAnswered && onAnswerSelected(answer, id)}
                className={
                  selectedAnswerIndex === id
                    ? answeredCorrect
                      ? 'li-correct'
                      : 'li-wrong'
                    : 'li-hover'
                }
              >
                <span>{answer}</span>
              </li>
            ))}
            {questionAnswered ? (
              answeredCorrect ? (
                <div>Bravo! You've got the correct answer!</div>
              ) : (
                <div>The correct answer is {correctAnswer}</div>
              )
            ) : (
              ''
            )}
            {checked && (
              <button onClick={nextQuestion} className='btn'>
                {activeQuestion === questions.length - 1 ? 'Finish' : 'Next'}
              </button>
            )}
          </div>
        ) : (
          <div className='quiz-container'>
            <h3>Results:</h3>
            <p>Number of questions: {questions.length}</p>
            <p>Correct Answers: <span>{result.correctAnswers}</span></p>
            <p>Wrong Answers: <span>{result.wrongAnswers}</span></p>
            <button onClick={() => window.location.reload()}>Restart</button>
          </div>
        )}
        <div>
          <Link className="button" href="/">Homepage</Link>
        </div>
      </div>
    </div>
  );
}