import React, { useState, useEffect } from "react";
import "../assets/style/Sidebar.css";
import Logo from "../assets/img/logo.jpg";
import { CustomMenu } from "./CustomMenu";
import { useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [selected, setSelected] = useState(0);
  const [selectedKeys, setSelectedKeys] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  return (
    <div className="Sidebar">
      {/* logo */}
      <div className="logo">
        <img src={Logo} alt="" className="Logo" />
        <span>
          V-<span>logement</span>
        </span>
      </div>

      {/* menu */}
      <div className="menu">
        {CustomMenu.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => {
                navigate(item.key);
                setSelected(index);
              }}
            >
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
