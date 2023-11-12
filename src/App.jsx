import './App.css'
import {Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/home/home.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import {useSelector} from "react-redux";
import DoctorLayout from "./components/doctorLayout/doctorLayout.jsx";
import Setting from "./pages/doctor/setting/setting.jsx";
import Plan from "./pages/doctor/plan/plan.jsx";
import {Roles} from "./store/slice/auth.slice.js";
import PatientLayout from './components/patientLayout/patientLayout.jsx';
import Search from './pages/patient/search/search.jsx';
import SearchResult from './pages/patient/searchResult/searchResult.jsx';

function App() {

    const {isAuthenticated,role} = useSelector(store => store.auth)

    return (<Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={!isAuthenticated ? <Login/> : <Navigate to="/"/>}/>
        <Route path="/register" element={!isAuthenticated ? <Register/> : <Navigate to="/"/>}/>
        <Route path="/doctor" element={isAuthenticated && role===Roles.DOCTOR ? <DoctorLayout/> : <Navigate to="/login"/>}>
            <Route path="setting" element={<Setting/>}/>
            <Route path="plan" element={<Plan/>}/>
            <Route path="" element={<Navigate to="/doctor/plan"/>}/>
        </Route>
         <Route path="/patient" element={isAuthenticated && role===Roles.PATIENT ? <PatientLayout/> : <Navigate to="/login"/>}>
            <Route path="search" element={<Search/>}/>
            <Route path="result" element={<SearchResult/>}/>
            <Route path="" element={<Navigate to="/patient/search"/>}/>
        </Route>
        <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>)
}

export default App
