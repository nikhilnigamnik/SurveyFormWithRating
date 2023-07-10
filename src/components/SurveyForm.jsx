import React, { useState } from "react";

const SurveyForm = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [customerSessionId, setCustomerSessionId] = useState("");

  const generateSessionId = () => {
    return "session_id";
  };

  const questions = [
    "How satisfied are you with our products?",
    "How fair are the prices compared to similar retailers?",
    "How satisfied are you with the value for money of your purchase?",
    "On a scale of 1-10, how would you recommend us to your friends and family?",
    "What could we do to improve our service?",
  ];

  // Update customerSessionId when component mounts
  useState(() => {
    setCustomerSessionId(generateSessionId());
  }, []);

  const handleAnswer = (answer) => {
    const question = questions[currentQuestionIndex];
    setAnswers((prevAnswers) => [...prevAnswers, { question, answer }]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleSkip = () => {
    const question = questions[currentQuestionIndex];
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { question, answer: "skipped" },
    ]);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handleTextAnswer = (event) => {
    const answer = event.target.value;
    const question = questions[currentQuestionIndex];
    setAnswers((prevAnswers) => [...prevAnswers, { question, answer }]);
  };

  const renderCurrentQuestion = () => {
    const question = questions[currentQuestionIndex];
    if (currentQuestionIndex === questions.length) {
      return <div>Thank you for your feedback!</div>;
    }
    return (
      <div>
        <div>
          Question {currentQuestionIndex + 1}/{questions.length}
        </div>
        <div>{question}</div>
        {currentQuestionIndex !== 3 && (
          <div>
            <button onClick={() => handleAnswer(1)}>1</button>
            <button onClick={() => handleAnswer(2)}>2</button>
            <button onClick={() => handleAnswer(3)}>3</button>
            <button onClick={() => handleAnswer(4)}>4</button>
            <button onClick={() => handleAnswer(5)}>5</button>
          </div>
        )}
        {currentQuestionIndex === 3 && (
          <div>
            <button onClick={() => handleAnswer(1)}>1</button>
            <button onClick={() => handleAnswer(2)}>2</button>
            <button onClick={() => handleAnswer(3)}>3</button>
            <button onClick={() => handleAnswer(4)}>4</button>
            <button onClick={() => handleAnswer(5)}>5</button>
            <button onClick={() => handleAnswer(6)}>6</button>
            <button onClick={() => handleAnswer(7)}>7</button>
            <button onClick={() => handleAnswer(8)}>8</button>
            <button onClick={() => handleAnswer(9)}>9</button>
            <button onClick={() => handleAnswer(10)}>10</button>
          </div>
        )}
        {currentQuestionIndex === 4 && (
          <div>
            <textarea rows="4" cols="50" onBlur={handleTextAnswer} />
          </div>
        )}
        {currentQuestionIndex > 0 && (
          <button onClick={handlePrevious}>Previous</button>
        )}
        <button onClick={handleSkip}>Skip</button>
        {currentQuestionIndex < questions.length - 1 && (
          <button onClick={handleNext}>Next</button>
        )}
        {currentQuestionIndex === questions.length - 1 && (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </div>
    );
  };

  const handleSubmit = () => {
    answers.forEach((answer) => {
      console.log(`Question: ${answer.question}, Answer: ${answer.answer}`);
    });
  };

  return (
    <div>
      <h1>Welcome to the Survey</h1>
      <button onClick={() => setCurrentQuestionIndex(0)}>Start</button>
      {renderCurrentQuestion()}
    </div>
  );
};

export default SurveyForm;
