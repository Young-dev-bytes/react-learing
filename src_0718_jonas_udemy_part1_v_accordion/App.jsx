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
  return (
    <div className="accordion">
      {data?.map((item, i) => {
        return (
          <AccordionItem
            key={i}
            num={i + 1}
            text={item.text}
            title={item.title}
          />
        );
      })}
    </div>
  );
}

function AccordionItem({ num, text, title }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={isOpen ? "item open" : "item"}
      onClick={() => setIsOpen((pre) => !pre)}
    >
      <p className="number">{num < 9 ? `0${num}` : `${num}`}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "-" : "+"}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  );
}

export default App;
