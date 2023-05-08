import React, { useState, useEffect } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import "./index.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ReactStoreIndicator from "react-score-indicator";
import { toast, ToastContainer } from "react-toastify";

export default function Quiz() {
  const id = localStorage.getItem("id");
  const offerId = localStorage.getItem("offerId");
  // const resultat = localStorage.getItem("score");

  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [newScore, setNewScore] = useState({
    offer: offerId,
    user: id,
    // result: resultat,
  });

  const addScore = async (e) => {
    const final = currentQuestionIndex===quiz.length-1;
    console.log(final);
    if (final){
      try {
        
        const response = await axios.post("http://localhost:8080/api/scoreRouter/addscore", {...newScore, result : score});
        console.log("yess",response.data);
        toast.success("Adding successfully!");
        localStorage.removeItem("score");
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          toast.error("Adding failed!");
        }
      }
    }
  // }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://quizapi.io/api/v1/questions?apiKey=RagtV5CzaEV00JLC6aII3iivhHatMPsWgg6wAXDl&limit=20`
      );
      setQuiz(response.data);
      console.log("==>", response.data.length);
      console.log("response", response.data);
    }
    fetchData();
  }, []);
  console.log("======>", quiz);

  const handleNextQuestion = () => {
    if (document.querySelector('input[name="option"]:checked')) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };
  const calculateTotalScore = () => {
    const selectedAnswer = document.querySelector(
      'input[name="option"]:checked'
    ).value;
    const correctAnswer = quiz[currentQuestionIndex].correct_answer;
    console.log("correct answer",correctAnswer);
    console.log("selected answer",selectedAnswer);


    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
      console.log("score is ", score + 1);
      
    } else {
      console.log("score is ", score);
    }
    const final = currentQuestionIndex===quiz.length-1;
    console.log(final);
    if (final){setScore(score);}

  };



  return (
    <>
      <div className="q_container">
        <ToastContainer/>
        {quiz.length > 0 && currentQuestionIndex < quiz.length ? (
          <div className="quiz_container">
            <div className="question">
              <label>question : </label>
              {quiz[currentQuestionIndex].question}
            </div>
            <div className="answers">
              {Object.keys(quiz[currentQuestionIndex].answers).length > 0 ? (
                Object.keys(quiz[currentQuestionIndex].answers).map(
                  (key, index) => (
                    <div className="answers_container" key={key}>
                      <div className="radio_group">
                        {quiz[currentQuestionIndex].answers[key] !== null && (
                          <>
                            <label>
                              <input type="radio" name="option" value={key} />
                              {quiz[currentQuestionIndex].answers[key]}
                            </label>
                          </>
                        )}
                      </div>
                    </div>
                  )
                )
              ) : (
                <div>No answers available.</div>
              )}
            </div>
            <div className="pagination_container">
              <Stack spacing={2}>
                {currentQuestionIndex <= quiz.length && (
                  <Button
                    className="next_button"
                    type="submit"
                    onClick={() => {
                      handleNextQuestion();
                      calculateTotalScore();
                      addScore();
                    }}
                    color="primary"
                    variant="contained"
                    endIcon={<SendIcon />}
                  >
                    Next
                  </Button>
                )}
              </Stack>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            {quiz.length ? (
              <div>
                {" "}
                <div className="score">
                  {
                    <ReactStoreIndicator
                      value={score}
                      maxValue={quiz.length}
                      stepColors={[
                        "#271a1a",
                        "#ed8d00",
                        "#f1bc00",
                        "#84c42b",
                        "#53b83a",
                        "#3da940",
                        "#3da940",
                        "#3da940",
                      ]}
                      style={{ color: "#aaa" }}
                    />
                  }
                  <h2>this is your score</h2>
                </div>
              </div>
            ) : (
              <Box sx={{ display: "flex" }}>
                <CircularProgress />
              </Box>
            )}
          </div>
        )}
      </div>
    </>
  );
}
