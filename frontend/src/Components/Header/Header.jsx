import "../../styles/Header.css";
import Logo from "../Logo/Logo";
import { Link } from 'react-router-dom';

function Header() {
  // const imageUrl 

  return (
    <div className="header-container">
      <div className="header-container">
        {/* <div className="header-logo">
          <Logo />
        </div> */}
        <div className="side-menu">
          <i className="fa-solid fa-ellipsis-vertical menu-icon"></i>
          <Link to="/settings"><i className="fa-solid fa-gear settings-icon"></i></Link>
          <Link to="/profile">
            <div className="profile-logo">
              {/* <img src="images/profile.jpg" alt=""/> */}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
