import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from "./component/Home/Home";
import AccountsConnected from './component/AccountsConnected/AccountsConnected';

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" exact />
      <Route element={<AccountsConnected />} path="/accounts" exact/>
    </Routes>
  );
}

export default App;
