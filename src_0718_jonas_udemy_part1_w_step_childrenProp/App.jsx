import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

const App = () => {
  return (
    <div>
      <Steps />
      <StepMessage step={1}>{messages[1 - 1]}</StepMessage>
      <StepMessage step={2}>{messages[2 - 1]}</StepMessage>
      <StepMessage step={3}>{messages[3 - 1]}</StepMessage>
    </div>
  );
};

const Steps = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePreClick = () => {
    console.log("handlePreClick");
    setStep((pre) => {
      if (pre === 1) {
        return 3;
      }
      return pre - 1;
    });
  };

  const handleNextClick = () => {
    console.log("handleNextClick");
    setStep((pre) => {
      if (pre === 3) {
        return 1;
      }
      return pre + 1;
    });
  };

  const close = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button className="close" onClick={close}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step}` >= 1 ? "active" : " "}>1</div>
            <div className={`${step}` >= 2 ? "active" : " "}>2</div>
            <div className={`${step}` >= 3 ? "active" : " "}>3</div>
          </div>

          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="buttons">
              <Button
                onHandleClick={() => {
                  alert(`learn how to ${messages[step - 1]}`);
                }}
                bgColor="#e7e7e7"
                textColor="#333"
              >
                <span>🐶</span>Learn how
              </Button>
            </div>
          </StepMessage>

          <div className="buttons">
            <Button
              onHandleClick={handlePreClick}
              bgColor="#7950f2"
              textColor="#fff"
            >
              <span>👈</span>previous
            </Button>
            <Button
              onHandleClick={handleNextClick}
              bgColor="#7950f2"
              textColor="#fff"
            >
              next<span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
const Button = ({ children, onHandleClick, bgColor, textColor }) => {
  console.log(children);
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onHandleClick}
    >
      {children}
    </button>
  );
};

const StepMessage = ({ step, children }) => {
  return (
    <div className="message">
      <h3>step:{step}</h3>
      {children}
    </div>
  );
};

export default App;
