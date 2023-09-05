import { useEffect, useState } from "react";

export default function MyComponent() {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    console.log("every renders");
  });

  useEffect(() => {
    console.log("Effect 1 is called.");
    return () => {
      console.log("Clean up for Effect 1 is called.");
    };
  });

  useEffect(() => {
    console.log("Effect 2 is called.");
    return () => {
      console.log("Clean up for Effect 2 is called.");
    };
  });

  return (
    <div>
      {isShow && (
        <>
          <p onClick={() => setIsShow((pre) => !pre)}>My Component</p>
        </>
      )}
    </div>
  );
}
