import './App.css';
import { Route, Routes } from 'react-router-dom';
import Users from "./component/Users";
import Home from './component/Home';

function App() {
  return (
    <Routes>
      <Route element={<Home />} path="/" exact />
      <Route element={<Users />} path="/users" exact/>
    </Routes>
  );
}

export default App;
