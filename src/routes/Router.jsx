import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import Register from "../Pages/registerPage/Register";
import Login from "../Pages/login/Login";
import About from "../Pages/About";
import ROUTES from "./ROUTES.js";
import Fav from "../Pages/Fav";
import LogOut from "../components/LogOut";

const Router = () => {
  return (
    <Routes>
      <Route exact path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.FAKEHOME} element={<Navigate to={ROUTES.HOME} />} />
      <Route exact path={ROUTES.REGISTER} element={<Register />} />
      <Route exact path={ROUTES.LOGIN} element={<Login />} />
      <Route exact path={ROUTES.ABOUT} element={<About />} />
      <Route exact path={ROUTES.FAV} element={<Fav />} />
      <Route exact path={ROUTES.LOGOUT} element={<LogOut />} />
    </Routes>
  );
};

export default Router;
