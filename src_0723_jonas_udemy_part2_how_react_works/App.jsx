import { useState } from "react";

//src_0723_jonas_udemy_part2_how_react_works
const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

console.log(<DifferentContent test={23} />);
console.log(DifferentContent());

export default function App() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}

function Tabbed({ content }) {
  const [selectedTab, setSelectedTab] = useState(1);
  return (
    <div>
      <Tab
        currentBtnNum={1}
        selectedTab={selectedTab}
        setSelectedTab={() => setSelectedTab(1)}
      />

      <Tab
        currentBtnNum={2}
        selectedTab={selectedTab}
        setSelectedTab={() => setSelectedTab(2)}
      />

      <Tab
        currentBtnNum={3}
        selectedTab={selectedTab}
        setSelectedTab={() => setSelectedTab(3)}
      />

      <Tab
        currentBtnNum={4}
        selectedTab={selectedTab}
        setSelectedTab={() => setSelectedTab(4)}
      />

      {selectedTab <= 3 ? (
        <TabContent contentItem={content[selectedTab - 1]} />
      ) : (
        <DifferentContent />
      )}
    </div>
  );
}

function Tab({ setSelectedTab, currentBtnNum, selectedTab }) {
  return (
    <button
      className={currentBtnNum === selectedTab ? "tab active" : "tab"}
      onClick={setSelectedTab}
    >
      Tab {currentBtnNum}
    </button>
  );
}

function TabContent({ contentItem }) {
  const [isShowDetail, setIsShowDetail] = useState(true);
  const [likes, setLikes] = useState(0);

  function handleInc() {
    setLikes(likes + 1);
  }

  return (
    <div className="tab-content">
      <h4>{contentItem?.summary}</h4>
      {isShowDetail && <p>{contentItem?.details}</p>}

      <div className="tab-actions">
        <button onClick={() => setIsShowDetail((pre) => !pre)}>
          {isShowDetail ? "Hide" : "Show"} details
        </button>

        <div className="hearts-counter">
          <span>{likes} ❤️</span>
          <button onClick={handleInc}>+</button>
          <button>+++</button>
        </div>
      </div>

      <div className="tab-undo">
        <button>Undo</button>
        <button>Undo in 2s</button>
      </div>
    </div>
  );
}

function DifferentContent() {
  return (
    <div className="tab-content">
      <h4>I'm a DIFFERENT tab, so I reset state 💣💥</h4>
    </div>
  );
}
