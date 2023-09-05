import { useQuiz } from "../contexts/QuizContext";

function Options() {
  const { questions, index, dispath, answer } = useQuiz();
  console.log("===", questions);
  const { correctOption, options } = questions[index];

  const hasAnswer = answer !== null;

  console.log("options", options);

  return (
    <div className="options">
      {options?.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            hasAnswer ? (correctOption === index ? "correct" : "wrong") : ""
          }`}
          key={option}
          disabled={hasAnswer}
          onClick={() => dispath({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
