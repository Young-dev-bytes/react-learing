import { createContext, useContext, useEffect, useReducer } from "react";

const QuizContext = createContext();

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

function QuizProvider({ children }) {
  const [state, dispath] = useReducer(reducer, initialState);
  const { questions, status, index, answer, points, highscore, timeRemaining } =
    state;

  const questionsNums = questions.length;
  const maxPossiblePoints = questions.reduce((pre, cur) => pre + cur.points, 0);

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => {
        dispath({ type: "dataReceived", payload: data });
      })
      .catch((err) => {
        dispath({ type: "dataFaild" });
      });
  }, []);
  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        timeRemaining,
        dispath,
        questionsNums,
        maxPossiblePoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

const useQuiz = () => {
  const text = useContext(QuizContext);
  if (text === undefined)
    throw new Error("useContext is used outside the QuizProvider");
  return text;
};

export { QuizProvider, useQuiz };
