import React from "react";
import "../assets/style/MenuDash.css";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { useNavigate } from "react-router-dom";
import AuthService from "../Service/AuthService/AuthService";
import Profil from "../assets/img/profil.jpg";

const CustomHeader = () => {
  let navigate = useNavigate();
  const logout = () => {
    AuthService.logout();
    navigate("/");
  };
  // const user = AuthService.getCurrentUser();

  return (
    <div className="Menudash">
      <div className="Header">
        <img src={Profil} alt="" className="Profil" />
        {/* <span className="Nom"> {user.name}</span> */}
        <UilSignOutAlt className="Logout" onClick={() => logout()} />
      </div>
    </div>
  );
};

export default CustomHeader;
