import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Stack from "@mui/material/Stack";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import "./index.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ReactStoreIndicator from "react-score-indicator";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "@mui/material";

export default function Quiz() {
  const id = localStorage.getItem("id");
  const offerId = localStorage.getItem("offerId");

  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  // const [istrue, setIsTrue] = useState(false);
  const [newScore, setNewScore] = useState({
    offer: offerId,
    user: id,
  });
  const Ref = useRef(null);

  const [timer, setTimer] = useState("00:00:00");
  const [isCurrentQuestion, setIsCurrentQuestion] = useState(false);

  const getTimeRemaining = (e) => {
    const total = Date.parse(e) - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      handleNextPage();
    }
  };

  const clearTimer = (e) => {
    setTimer("00:00:10");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + 10);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
    console.log("userffet");
  }, [currentQuestionIndex]);

  const onClickReset = () => {
    clearTimer(getDeadTime());
  };
  const handleNextPage = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const addScore = async (e) => {
    const final = currentQuestionIndex === quiz.length - 1;
    console.log(final);
    if (final) {
      try {
        if(score >15){
        const response = await axios.post(
          "http://localhost:8080/api/scoreRouter/addscore",
          { ...newScore, result: score }
        );
        console.log("yess", response.data);
        toast.success("Adding successfully!");
        localStorage.removeItem("score");

        return true;
      }
      else{
        toast.error("Adding failed!");
        return false;
      }
        
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          toast.error("Adding failed!");
        }
        return false;
      }
    }
    // }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `https://quizapi.io/api/v1/questions?apiKey=Aw9rwqe0uBihndUdtI5DtGpPuNqeDURVQeaLqLKN&difficulty=Hard&limit=20`
      );
      setQuiz(response.data);
      console.log("==>", response.data.length);
      console.log("response", response.data);
    }
    fetchData();
  }, []);
  // console.log("======>", quiz);

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
    console.log("correct answer", correctAnswer);
    console.log("selected answer", selectedAnswer);

    if (selectedAnswer === correctAnswer) {
      setScore(score + 1);
      console.log("score is ", score + 1);
    } else {
      console.log("score is ", score);
    }
    const final = currentQuestionIndex === quiz.length - 1;
    console.log(final);
    if (final) {
      setScore(score);
    }
  };

  const [updatedData, setUpdatedData] = useState({});
  
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/offerRouter/getoffebyid/${offerId}`)
      .then((response) => {
        setUpdatedData(response.data.offer);
        console.log("offer",response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleUpdate = async () => {
    const addSuccessfully = await addScore();
  if (addSuccessfully) {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/offerRouter/updateofferwithid/${offerId}`,
        {
          ...updatedData,
          user: [...updatedData.user, id],
        }
      );
      console.log("lala", response.data);

      setUpdatedData(response.data);
      // localStorage.setItem("offerId", updatedOffer._id);
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Already Deposit")
    }
    return false;
    }
  };


  return (
    <>
      <div className="q_container">
        <ToastContainer />

        {quiz.length > 0 && currentQuestionIndex < quiz.length ? (
          <div className="quiz_container">
            <div className="timer_container">
              <div class="timer-group">
                <div class="timer minute">
                  <div class="hand">
                    <span></span>
                  </div>
                  <div class="hand">
                    <span></span>
                  </div>
                </div>
                <div class="face">
                  <p id="lazy">{timer}</p>
                </div>
              </div>
            </div>
            <label>Question : </label>
            <div className="question">
              {quiz[currentQuestionIndex].question}
            </div>
            <div className="answers">
              {Object.keys(quiz[currentQuestionIndex].answers)
                .filter(
                  (key) => quiz[currentQuestionIndex].answers[key] !== null
                )
                .map((key, index) => (
                  <div className="answers_container" key={key}>
                    <div className="radio_group">
                      <>
                        <label>
                          <input
                            className="radio"
                            type="radio"
                            name="option"
                            value={key}
                          />
                          {quiz[currentQuestionIndex].answers[key]}
                        </label>
                      </>
                    </div>
                  </div>
                ))}
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
                      onClickReset();
                      handleUpdate();
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
                  {score > 15 &&<h2 className="cong_msg">Congratulation you passed the quiz successfully</h2>}
                  {score <= 15 &&<h2 className="inf_msg">Sorry you did not passed the quiz</h2>}
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
