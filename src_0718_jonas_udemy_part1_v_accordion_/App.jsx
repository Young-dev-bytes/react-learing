import { useState } from "react";

const App = () => {
  const faqs = [
    {
      title: "Where are these chairs assembled?",
      text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.",
    },
    {
      title: "How long do I have to return my chair?",
      text: "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.",
    },
    {
      title: "Do you ship to countries outside the EU?",
      text: "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!",
    },
  ];

  return (
    <div>
      <Accordion data={faqs} />
    </div>
  );
};

function Accordion({ data }) {
  const [currOpen, setCurrOpen] = useState(null);
  return (
    <div className="accordion">
      {data?.map((item, i) => {
        return (
          <AccordionItem
            key={i}
            num={i + 1}
            title={item.title}
            currOpen={currOpen}
            setCurrOpen={setCurrOpen}
            onHandleCurrOpen={() => setCurrOpen(i + 1)}
          >
            {item.text}
          </AccordionItem>
        );
      })}
    </div>
  );
}

function AccordionItem({ num, children, title, currOpen, setCurrOpen }) {
  const isOpen = currOpen === num;
  const onHandleCurrOpen = () => {
    // setCurrOpen((pre) => {
    //   return pre === num ? null : num;
    // });
    setCurrOpen(isOpen ? null : num);
  };
  return (
    <div className={isOpen ? "item open" : "item"} onClick={onHandleCurrOpen}>
      <p className="number">{num < 9 ? `0${num}` : `${num}`}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  );
}

export default App;
