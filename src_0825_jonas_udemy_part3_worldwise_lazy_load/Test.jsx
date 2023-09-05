import { useEffect } from "react";

function Test() {
  console.log("test");
  useEffect(() => {
    console.log("test useEffect");
  }, []);
  return (
    <>
      <h1>test</h1>
      <Logo />
      <Search />
      <Input />
    </>
  );
}

function Logo() {
  console.log("logo");

  useEffect(() => {
    console.log("logo useEffect");
  }, []);

  return <h1>logo</h1>;
}

function Search() {
  console.log("search");

  useEffect(() => {
    console.log("search useEffect");
  }, []);
  return <h1>search</h1>;
}

function Input() {
  console.log("input");

  useEffect(() => {
    console.log("input useEffect");
  }, []);

  return <h1>input</h1>;
}

export default Test;
