import { useSelector } from "react-redux";

function Customer() {
  const custInfo = useSelector((store) => {
    return store.customer;
  });
  return <h2>👋 Welcome, {custInfo.fullName}</h2>;
}

export default Customer;
