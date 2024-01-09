import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registre from "./pages/Login/Registre";
import Dashboard from "../src/pages/Dashboard/Home";
import Achat from "../src/pages/Achat/Achat";
import Produit from "../src/pages/Produit/Produit";
import Cite from "../src/pages/Cite/Cite";
import User from "../src/pages/User/User";
import Client from "../src/pages/Client/Client";
import MainLayout from "./layout/MainLayout";
import AuthService from "./Service/AuthService/AuthService";

function App() {
  const currentUser = AuthService.getCurrentUser();
  
  return (
    <BrowserRouter>
    <div className="container">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registre" element={<Registre />}></Route>

        <Route element={<MainLayout />}>
          <Route path="/home" element={<Dashboard />} />
          <Route path="/client" element={<Client />} />
          <Route path="/produit" element={<Produit />} />
          <Route path="/achat" element={<Achat />} />
          <Route path="/cite" element={<Cite />}></Route>
          <Route path="/user" element={<User />}></Route>
        </Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
