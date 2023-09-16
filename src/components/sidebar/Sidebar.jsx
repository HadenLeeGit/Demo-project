import "./sidebar.scss"
import logo from '../../images/tslogo2_w.png';
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DownloadIcon from '@mui/icons-material/Download';
import {CSVLink} from "react-csv";
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from "react-router-dom";

const Sidebar = (props) => {

  const handleClick = () => {
    console.log("Hello");
  }

  const navigate = useNavigate()

  const viewProfile = () => {
      navigate("/")
  }

  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">
          <img src={logo} className="img" />
        </span>
      </div>
      <hr />
      <div className="bottomHalf">
        <div className="center">
          <ul>
            <p className="title">MAIN</p>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
            <p className="title">USER</p>
            <li onClick={viewProfile}>
              <AccountCircleRoundedIcon className="icon" />
              <span>Profile</span>
            </li>
            <p className="title">DATA</p>
            <li>
              <DownloadIcon className="icon" />
              <CSVLink data={props.value}>
                Download Data</CSVLink>
            </li>
          </ul>
        </div>
        <div className="bottom">
        </div>
      </div>
    </div>
  );
};

export default Sidebar;