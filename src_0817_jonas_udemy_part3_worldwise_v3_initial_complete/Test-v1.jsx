import { useEffect, useState } from "react";

function Test() {
  console.log("test");
  useEffect(() => {
    console.log("test useEffect");
  }, []);
  return (
    <>
      <ProviderT>
        <Logo />
        <Search />
      </ProviderT>
    </>
  );
}

function ProviderT({ children }) {
  console.log("ProviderT");
  const [provider, setProvider] = useState();
  const [isLoading, setIsLoading] = useState(false);
  console.log("ProviderT", provider, isLoading);
  useEffect(() => {
    console.log("ProviderT effect");
  }, []);

  useEffect(() => {
    async function a3() {
      console.log("async ProviderT");
      setIsLoading(true);
      const res = await fetch(
        "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=38.7222524&longitude=-9.1393366"
      );
      const data = await res.json();
      console.log("providerT data", data);
      setProvider(data);
    }
    a3();
  }, []);
  return (
    <div>
      <h1>ProviderT</h1>
      {children}
    </div>
  );
}

function Logo() {
  console.log("logo");
  const [users, setUsers] = useState();
  const [isLoading, setIsLoading] = useState(false);
  console.log("logo", users, isLoading);

  useEffect(() => {
    console.log("logo useEffect");
  }, []);

  useEffect(() => {
    async function a1() {
      console.log("async logo");
      setIsLoading(true);
      const res = await fetch(
        "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=38.7222524&longitude=-9.1393366"
      );
      const data = await res.json();
      console.log("logo data", data);
      setUsers(data);
    }
    a1();
  }, []);

  return <h1>logo</h1>;
}

function Search() {
  console.log("search");
  const [search, setSearch] = useState();
  const [isLoading, setIsLoading] = useState(false);

  console.log("search", search, isLoading);

  useEffect(() => {
    console.log("search useEffect");
  }, []);

  useEffect(() => {
    async function a2() {
      console.log("async Search");
      setIsLoading(true);
      const res = await fetch(
        "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=38.7222524&longitude=-9.1393366"
      );
      const data = await res.json();
      console.log("search data", data);
      setSearch(data);
    }
    a2();
  }, []);
  return <h1>search</h1>;
}

export default Test;
