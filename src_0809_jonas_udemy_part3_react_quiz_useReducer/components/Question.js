import Options from "./Options";

function Question({ questionContent, dispath, answer }) {
  return (
    <div>
      <h4>{questionContent.question}</h4>

      <Options
        dispath={dispath}
        answer={answer}
        questionContent={questionContent}
        key={questionContent.question}
      />
    </div>
  );
}

export default Question;
