import "./navbar.scss";
import userLogo from "../../images/user2.png";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";

import { useAuth0 } from '@auth0/auth0-react';

const Navbar = () => {
  const { user } = useAuth0();
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="items">
          <div className="item">
            <span className="welcome">Hello, {user?.name}  </span>
            <img
              src={user.picture}
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
