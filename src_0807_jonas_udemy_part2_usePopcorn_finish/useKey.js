import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    const callBack = (e) => {
      if (e.code === key) {
        action();
        console.log("closing");
      }
    };
    document.addEventListener("keydown", callBack);
    return () => {
      console.log("removeEventListener");
      document.removeEventListener("keydown", callBack);
    };
  }, [key, action]);
}

// export function useKey(func, inputEl) {
//   useEffect(() => {
//     const callBack = (e) => {
//       console.log("e.code", e.code);
//       if (document.activeElement === inputEl.current) return;
//       if (e.code === "Enter") {
//         inputEl.current.focus();
//         func("");
//       }

//       if (e.code === "Escape") {
//         func();
//         console.log("closing");
//       }
//     };
//     document.addEventListener("keydown", callBack);
//     return () => document.removeEventListener("keydown", callBack);
//   }, [func, inputEl]);
// }
