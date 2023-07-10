import React, { useState } from "react";

const SurveyForm = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [customerSessionId, setCustomerSessionId] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const generateSessionId = () => {
    return "session_id";
  };

  const questions = [
    "How satisfied are you with our products?",
    "How fair are the prices compared to similar retailers?",
    "How satisfied are you with the value for money of your purchase?",
    "How would you recommend us to your friends and family?",
    "What could we do to improve our service?",
  ];

  useState(() => {
    setCustomerSessionId(generateSessionId());
  }, []);

  const handleAnswer = (rating) => {
    const question = questions[currentQuestionIndex];
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { question, answer: parseInt(rating, 10) }, // Parse rating as an integer
    ]);
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

  const handleSubmit = async () => {
    answers.forEach((answer) => {
      console.log(`Question: ${answer.question}, Rating: ${answer.answer}`);
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId: customerSessionId,
        answers: answers,
      }),
    };

    try {
      const response = await fetch(
        "http://localhost:4000/api/survey/answers",
        requestOptions
      );
      if (response.ok) {
        console.log("Survey answers saved successfully");
        setSubmitSuccess(true);
      } else {
        console.log("Error saving survey answers");
      }
    } catch (error) {
      console.log("Error saving survey answers: " + error.message);
    }
  };

  const renderCurrentQuestion = () => {
    if (submitSuccess) {
      return (
        <div>
          <h3>Thank you for your feedback!</h3>
          <p>Survey answers saved successfully.</p>
        </div>
      );
    }

    const question = questions[currentQuestionIndex];
    if (currentQuestionIndex === questions.length) {
      return <div>Thank you for your feedback!</div>;
    }
    return (
      <div className="mt-6">
        <div>
          Question {currentQuestionIndex + 1}/{questions.length}
        </div>
        <div>{question}</div>
        {currentQuestionIndex !== 3 && (
          <div className="flex justify-between mt-6">
            <button
              className="bg-mainclr rounded-full p-1"
              onClick={() => handleAnswer(1)}
            >
              1
            </button>
            <button onClick={() => handleAnswer(2)}>2</button>
            <button onClick={() => handleAnswer(3)}>3</button>
            <button onClick={() => handleAnswer(4)}>4</button>
            <button onClick={() => handleAnswer(5)}>5</button>
          </div>
        )}
        {currentQuestionIndex === 3 && (
          <div className="flex justify-between mt-6">
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
            <textarea
              className="w-full mt-6 border p-4 resize-none h-20 overflow-auto "
              onBlur={handleTextAnswer}
            />
          </div>
        )}
        <div className="mt-6">
          {currentQuestionIndex > 0 && (
            <button
              className="bg-mainclr shadow text-white px-4 py-1 rounded-md"
              onClick={handlePrevious}
            >
              Previous
            </button>
          )}
          <button
            className="bg-mainclr mx-6 shadow text-white px-4 py-1 rounded-md"
            onClick={handleSkip}
          >
            Skip
          </button>
          {currentQuestionIndex < questions.length - 1 && (
            <button
              className="bg-mainclr shadow text-white px-4 py-1 rounded-md"
              onClick={handleNext}
            >
              Next
            </button>
          )}
          {currentQuestionIndex === questions.length - 1 && (
            <button
              className="bg-mainclr  shadow text-white px-4 py-1 rounded-md"
              onClick={handleSubmit}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1 className="font-bold text-5xl">Welcome to the Survey</h1>
      {renderCurrentQuestion()}
    </div>
  );
};

export default SurveyForm;
