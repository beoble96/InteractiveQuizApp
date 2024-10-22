import React, { useState } from 'react';
import Link from 'next/link';

export default function NewQuestion() {
  const [formData, setFormData] = useState({
    id: parseInt(Math.random()*100),
    category: "",
    question: '',
    answers: [],
    correctAnswer: ""
  });

  const [newAnswer, setNewAnswer] = useState(''); 
  const [nrAnswer, setNrAnswer]=useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNewAnswerChange = (e) => {
    setNewAnswer(e.target.value);
  };

  const handleAddAnswer = (e) => {
    e.preventDefault();

    if (newAnswer.trim() === '') return; 

    setFormData((prevState) => ({
      ...prevState,
      answers: [...prevState.answers, newAnswer] 
    }));

    setNewAnswer('');
    setNrAnswer(nrAnswer+ 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/addQuestion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
alert(data.message); 
      } else {
        console.error(data.message); // Handle error
      }
    } catch (error) {
      console.error('Error:', error);
    }
  
  };

  return (
    <><h1>Add new question</h1>
    <form onSubmit={handleSubmit} className='formContainer'>
      
      <div className="form-group">
        <label>Category: </label>
        <input
          type="text"
          name="category"
          placeholder='Add category'
          value={formData.category}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Question: </label>
        <textarea
        placeholder='Add question'
          name="question"
          value={formData.question}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        {nrAnswer===3?<label>Answers submitted</label>:<label>Add answer nr {nrAnswer+1}</label>}
        <input
          type="text"
          name="answer"
          value={newAnswer}
          onChange={handleNewAnswerChange}
          placeholder="Add an answer"
        />
        {nrAnswer===3?<button disabled className='btn-disabled'>Already added 3 answers</button>:
        <button onClick={handleAddAnswer}>Add Answer</button>}
      </div>

      <div  className="form-group">
        <label>Correct answer: </label>
        <input
        placeholder='Add correct answer'
          type="text"
          name="correctAnswer"
          value={formData.correctAnswer}
          onChange={handleInputChange}
        />
      </div>

      <ul>
        {formData.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
{(formData.category&&formData.correctAnswer&&formData.question&&nrAnswer===3)?
      <button type="submit">Submit</button>:<button disabled className='btn-disabled'>Submit</button>}
    </form>
    <button onClick={() => window.location.reload()}>Restart</button><br/><br/>
    <div><Link className="button"href="/">Homepage</Link></div></>
  );
}
