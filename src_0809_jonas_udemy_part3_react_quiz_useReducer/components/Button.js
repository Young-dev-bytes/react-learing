function Button({ dispath, answer, index, questionsNums, status }) {
  if (answer === null) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispath(
          status === "end"
            ? { type: "restart" }
            : index + 1 === questionsNums
            ? { type: "finish" }
            : { type: "nextQuestion" }
        )
      }
    >
      {status === "end"
        ? "Restart quiz"
        : index + 1 === questionsNums
        ? "Finish"
        : "Next"}
    </button>
  );
}

export default Button;
