import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import {useSelector} from "react-redux";

function App() {

    const {isAuthenticated} = useSelector(store => store.auth)

    return (<Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={!isAuthenticated ? <Login/> : <Navigate to="/"/>}/>
        <Route path="/register" element={isAuthenticated ? <Register/> : <Navigate to="/"/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>)
}

export default App
