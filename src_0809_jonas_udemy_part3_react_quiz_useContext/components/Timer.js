import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

function Timer() {
  const { dispath, timeRemaining } = useQuiz();
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  useEffect(() => {
    console.log("timer useEffect");
    const internalId = setInterval(() => {
      dispath({ type: "countdown" });
    }, 1000);

    return () => clearInterval(internalId);
  }, [dispath]);
  return (
    <div className="timer">
      {minutes < 10 ? "0" : ""}
      {minutes} : {seconds < 10 ? "0" : ""}
      {seconds}
    </div>
  );
}

export default Timer;
