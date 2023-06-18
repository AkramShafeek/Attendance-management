import { Outlet, Route, Routes } from "react-router-dom";
import Header from "../components/global/Header";
import Sidenav from "../components/global/Sidenav";
import '../styles/admin.css'
import { Divider } from "@mui/material";

const Admin = () => {
  return (
    <div className="body flex-column gap-1">
      <Header />
      <div className="content-container flex-row gap-1">
        <Sidenav />
        <Divider sx={{
          height: '98%',
          width: '3px', 
          backgroundColor: 'rgb(230, 230, 230)',        
        }}></Divider>
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;