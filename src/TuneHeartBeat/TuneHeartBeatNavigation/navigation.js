import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navigation.css";
import { RiHomeHeartFill } from "react-icons/ri";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { IoMdLogIn } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import mp4Icon from "./TuneHeartBeat.mp4";
import * as client from "../users/client";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../users/reducer";

function Navigation() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.userReducer);
  const SignOut = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    localStorage.removeItem("currentUser");
    navigate("/TuneHeartBeat/signin");
  };


  React.useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      dispatch(setCurrentUser(JSON.parse(storedUser)));
    }
  }, []);

  const links = currentUser
    ? ["Home", "Search", "Account", "SignOut"]
    : ["Home", "Search", "Signin", "Signup"];
  const linkToIconMap = {
    Home: <RiHomeHeartFill />,
    Search: <BsFillSearchHeartFill />,
    Account: <RiAccountPinBoxFill />,
    Signin: <IoMdLogIn />,
    Signup: <SiGnuprivacyguard />,
    SignOut: <BiLogOut />,


  };



  const { pathname } = useLocation();

  return (
    <div className="list-group2 ">

      <div className="video-icon-container">
        <video autoPlay loop muted className="iconstyling">
          <source src={mp4Icon} type="video/mp4" />
        </video>
      </div>
      {links.map((link, index) => (
        <Link
          to={`/TuneHeartBeat/${link}`}
          className={`list-group-item ${pathname.includes(link) && "active"
            }`}
          key={index}
        >
          <span className="iconstyling">{linkToIconMap[link]}</span>

          {link === "SignOut" ? (
            <button
              className={`link-button ${pathname.includes(link) && "active"
                }`}
              onClick={SignOut}
            >
              {link}
            </button>
          ) : (
            <span>{link}</span>
          )}
        </Link>
      ))}

    </div>
  );
}

export default Navigation;