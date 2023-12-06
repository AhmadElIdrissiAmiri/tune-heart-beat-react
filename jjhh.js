import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navigation.css";
import { RiHomeHeartFill } from "react-icons/ri";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { RiAccountPinBoxFill } from "react-icons/ri";
import { IoMdLogIn } from "react-icons/io";
import { BiLogOut } from "react-icons/bi";
import { SiGnuprivacyguard } from "react-icons/si";
import mp4Icon from "./TuneHeartBeat.mp4";

function Navigation() {
  const navigate = useNavigate();
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const checkSignInStatus = async () => {
      try {
        const response = await fetch("/api/users/account");
        if (response.ok) {
          const currentUser = await response.json();
          setIsSignedIn(!!currentUser);
        } else {
          setIsSignedIn(false);
        }
      } catch (error) {
        console.error("Error fetching current user data:", error);
      }
    };

    checkSignInStatus();
  }, []);

  const SignOut = async () => {
    try {
      await fetch("/api/users/signout", { method: "POST" });
      setIsSignedIn(false);
      navigate("/TuneHeartBeat/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const links = isSignedIn
    ? ["Home", "Account", "SignOut", "Search"]
    : ["Home", "SignIn", "SignUp", "Search"];

  const linkToIconMap = {
    Home: <RiHomeHeartFill />,
    Search: <BsFillSearchHeartFill />,
    Account: <RiAccountPinBoxFill />,
    SignIn: <IoMdLogIn />,
    SignUp: <SiGnuprivacyguard />,
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
          className={`list-group-item ${
            pathname.includes(link) && "active"
          }`}
          key={index}
        >
          <span className="iconstyling">{linkToIconMap[link]}</span>
          {link === "SignOut" ? (
            <button
              className={`link-button ${
                pathname.includes(link) && "active"
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
