import { useQuiz } from "../contexts/QuizContext";

function StartScreen() {
  const { questionsNums, dispath } = useQuiz();
  const handleClickStart = () => {
    dispath({ type: "start", timeRemaing: 10 });
  };
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questionsNums} question to test your React mastery</h3>
      <button className="btn btn-ui" onClick={handleClickStart}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
