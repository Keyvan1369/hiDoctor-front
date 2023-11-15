import style from "./header.module.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, Roles } from "../../store/slice/auth.slice.js";

const Header = () => {
  const { isAuthenticated, role } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const isDoctor = role === Roles.DOCTOR;

  function handleLogout() {
    dispatch(logout());
  }

  function renderDoctorMenus() {
    return (
      <>
        <li>
          <Link to={"/doctor/setting"}>Settings</Link>
        </li>
        <li>
          <Link to={"/doctor/plan"}>Future Plan</Link>
        </li>
        <li>
          <Link to={"/doctor/appointments"}>Appointments</Link>
        </li>
      </>
    );
  }

  function renderPatientMenus() {
    return (
      <>
        <li>
          <Link to={"/patient/search"}>Search</Link>
          <Link to={"/patient/appointments"}>Appointments</Link>
        </li>
      </>
    );
  }

  return (
    <header className={style.header}>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <>
              {isDoctor ? renderDoctorMenus() : renderPatientMenus()}
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/register">Register</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
