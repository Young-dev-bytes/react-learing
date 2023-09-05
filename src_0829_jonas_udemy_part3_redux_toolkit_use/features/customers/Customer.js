import { useSelector } from "react-redux";

function Customer() {
  const custInfo = useSelector((state) => state.customer);
  return <h2>👋 Welcome, {custInfo.fullName}</h2>;
}

export default Customer;
