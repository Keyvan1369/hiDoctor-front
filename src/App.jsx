import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
        </Routes>
    )
}

export default App
