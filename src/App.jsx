import { Route, Routes } from "react-router-dom";
import "./App.css";
import { LineChart } from "./components/LineChart";
import { Home } from "./components/Home";
import { Login } from "./pages/Login/Login";
import SignUp from "./pages/Signup/Signup";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/line/:label" element={<LineChart />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
