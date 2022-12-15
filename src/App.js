import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import AccountSummary from "./components/AccountSummary/AccountSummary";

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" exact />
      <Route element={<AccountSummary />} path="/accounts" exact />
    </Routes>
  );
}

export default App;
