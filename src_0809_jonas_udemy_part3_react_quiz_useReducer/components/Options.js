function Options({ questionContent, dispath, answer }) {
  const hasAnswer = answer !== null;
  const { correctOption, options } = questionContent;

  return (
    <div className="options">
      {options.map((option, index) => (
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
