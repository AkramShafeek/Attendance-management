import { Outlet, Route, Routes } from "react-router-dom";
import Header from "../components/global/Header";
import Sidenav from "../components/global/Sidenav";
import '../styles/admin.css'
import { Divider } from "@mui/material";

const Admin = () => {
  return (
    <div className="body flex-column gap-1 pad-1" style={{boxSizing: 'border-box',paddingBottom: '25px'}}>
      <Header />
      <div className="content-container flex-row gap-1" style={{borderRadius: '10px'}}>
        <div style={{ flex: '1 0 17%',borderRadius: '10px' }}>
          <Sidenav />
        </div>
        <div style={{ flex: '1 0 81%',borderRadius: '10px' }}>
          <Outlet />
        </div>
        {/* <Divider sx={{
          height: '98%',
          width: '2px',
          backgroundColor: 'rgb(230, 230, 230)',
        }}></Divider>
        <div style={{ flex: '1 0 66.666%' }}>
          <Outlet />
        </div> */}
      </div>
    </div>
  );
}

export default Admin;