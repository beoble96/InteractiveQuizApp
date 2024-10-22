"use client"
import React, { useState } from 'react';
import {science} from "./dataScience";
import { useLocation } from 'react-router-dom';
import Link from 'next/link';
export default function Corect(){
 
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });

  const { questions } = science;
  const { question, answers, correctAnswer } = questions[activeQuestion];

  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
    
    } else {
      setSelectedAnswer(false);
    
    }
  };

 
  const nextQuestion = () => {
    setSelectedAnswerIndex(null);
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
         
            correctAnswers: prev.correctAnswers + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  };

  return (
    <div className='container'>
      <h1>Quiz Page</h1>
      
      <div>
        {!showResult ? (
          <div className='quiz-container'><div>
          <h2>
            Question: {activeQuestion + 1}
            <span>/{questions.length}</span>
          </h2>
        </div>
            <h3>{questions[activeQuestion].question}</h3>
            {answers.map((answer, idx) => (
              <li
                key={idx}
                onClick={() => onAnswerSelected(answer, idx)}
                className={
                  selectedAnswerIndex === idx ? 'li-selected' : 'li-hover'
                }
              >
                <span>{answer}</span>
              </li>
            ))}
            {checked ? (
              <button onClick={nextQuestion} className='btn'>
                {activeQuestion === question.length - 1 ? 'Finish' : 'Next'}
              </button>
            ) : (
              <button onClick={nextQuestion} disabled className='btn-disabled'>
                {' '}
                {activeQuestion === question.length - 1 ? 'Finish' : 'Next'}
              </button>
            )}
          </div>
        ) : (
          <div className='quiz-container'>
            <h3>Results:</h3>
            
            <p>
              Correct Answers: <span>{result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers: <span>{result.wrongAnswers}</span>
            </p>
            <button onClick={() => window.location.reload()}>Restart</button>
            
            
          </div>
          
        )}<div>
        <Link id="button"href="/">Homepage</Link>
        </div>
      </div>
    </div>
  );
};

