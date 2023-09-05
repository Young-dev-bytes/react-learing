import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { index, questionsNums, points, maxPossiblePoints, answer } = useQuiz();
  return (
    <header className="progress">
      <progress max={questionsNums} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong> / {questionsNums}
      </p>
      <p>
        <strong>{points}</strong>/ {maxPossiblePoints}
      </p>
    </header>
  );
}

export default Progress;
