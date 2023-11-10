import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import {useSelector} from "react-redux";
import DoctorLayout from "./components/doctorLayout/doctorLayout.jsx";
import Setting from "./pages/doctor/setting/setting.jsx";

function App() {

    const {isAuthenticated} = useSelector(store => store.auth)

    return (<Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={!isAuthenticated ? <Login/> : <Navigate to="/"/>}/>
        <Route path="/register" element={!isAuthenticated ? <Register/> : <Navigate to="/"/>}/>
        <Route path="/doctor" element={isAuthenticated ? <DoctorLayout/> : <Navigate to="/login"/>}>
            <Route path="setting" element={<Setting/>}/>
            <Route path="" element={<Navigate to="/doctor/setting"/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>)
}

export default App
