import { useEffect, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import Button from "./components/Button";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SEC_PER_QUES = 30;
const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  timeRemaining: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFaild":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        timeRemaining: state.questions.length * SEC_PER_QUES,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "end",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "countdown":
      const timeRemaining = state.timeRemaining;
      const isTimeUp = timeRemaining === 0;
      return {
        ...state,
        timeRemaining: timeRemaining - 1,
        status: isTimeUp ? "end" : state.status,
        highscore: isTimeUp
          ? state.points > state.highscore
            ? state.points
            : state.highscore
          : state.highscore,
      };

    default:
      throw new Error("actions unknown");
  }
};

export default function App() {
  const [state, dispath] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, highscore, timeRemaining } =
    state;

  console.log("state-before", state);

  const questionsNums = questions.length;
  const maxPossiblePoints = questions.reduce((pre, cur) => pre + cur.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispath({ type: "dataReceived", payload: data });
      })
      .catch((err) => {
        console.log(err);
        dispath({ type: "dataFaild" });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsNums={questionsNums} dispath={dispath} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              questionsNums={questionsNums}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              questionContent={questions[index]}
              dispath={dispath}
              answer={answer}
            />
            <Footer>
              <Timer dispath={dispath} timeRemaining={timeRemaining} />
              <Button
                dispath={dispath}
                answer={answer}
                index={index}
                questionsNums={questionsNums}
              />
            </Footer>
          </>
        )}
        {status === "end" && (
          <>
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={highscore}
              status={status}
            />
            <Button status={status} dispath={dispath} />
          </>
        )}
      </Main>
    </div>
  );
}
