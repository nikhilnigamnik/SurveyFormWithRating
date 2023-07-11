import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SurveyForm = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [customerSessionId, setCustomerSessionId] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const navigate = useNavigate();

  const generateSessionId = () => "session_id";

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
      { question, answer: parseInt(rating, 10) },
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
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      if (nextIndex < questions.length) {
        return nextIndex;
      } else {
        return prevIndex;
      }
    });
  };
  

  const handleTextAnswer = (event) => {
    const answer = event.target.value;
    const question = questions[currentQuestionIndex];
    setAnswers((prevAnswers) => [...prevAnswers, { question, answer }]);
  };

  const handleSubmit = async () => {
    answers.map((answer) => {
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
        "https://surveybackend-icee.onrender.com/api/survey/answers",
        requestOptions
      );
      if (response.ok) {
        console.log("Survey answers saved successfully");
        setSubmitSuccess(true);
        // if user submit their survey it should go to success page
        navigate("/success");
       
      } else {
        console.log("Error saving survey answers");
      }
    } catch (error) {
      console.log("Error saving survey answers: " + error.message);
    }
  };

  const renderCurrentQuestion = () => {
  
    const question = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
      <div className="mt-6">
        <div>
          Question {currentQuestionIndex + 1}/{questions.length}
        </div>
        <div>{question}</div>

        {/* for all question with 1 to 5 rating */}
        {currentQuestionIndex !== 3 && (
          <div className="flex justify-between mt-6">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                className="bg-blue-100 transition-all duration-300 hover:bg-mainclr hover:text-white rounded-full w-10 h-10"
                onClick={() => handleAnswer(rating)}
              >
                {rating}
              </button>
            ))}
          </div>
        )}

        {/* for fourth question with 1 to 10 rating */}

        {currentQuestionIndex === 3 && (
          <div className="flex justify-between mt-6">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
              <button
                className="bg-blue-100 transition-all duration-300 hover:bg-mainclr hover:text-white rounded-full w-10 h-10"
                key={rating}
                onClick={() => handleAnswer(rating)}
              >
                {rating}
              </button>
            ))}
          </div>
        )}

        {/* navigation button */}

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
          {isLastQuestion && (
            <button
              className="bg-mainclr shadow text-white px-4 py-1 rounded-md"
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
    <div className="bg-white py-20 px-16 bdr">
      <h1 className="font-bold text-5xl">Welcome to the Survey</h1>
      {renderCurrentQuestion()}
    </div>
  );
};

export default SurveyForm;
