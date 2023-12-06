import Home from "./home/home";
import Search from "./search/search";
import Account from "./users/account";

import Signin from "./login/signin";
import Details from "./details/details";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navigation from "./TuneHeartBeatNavigation/navigation";
import "./tuneheartbeat.css";
import store from "./store";
import {Provider} from "react-redux";


import Signup from "./register/signup";
import UserTable from "./users/table";

function TuneHeartBeat() {
  const [key, setKey] = useState("Home");


  return (
    <Provider store={store}>
    <div className="gradient-background">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-2 d-none d-xl-block">
            <Navigation />
          </div>
          <div className="col-md-10 ">
            <h1>TuneHeartBeat</h1>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Home" element={<Home />} />
              <Route path="/Signin" element={<Signin />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/Account" element={<Account />} />
              <Route path="/Account/:accountId" element={<Account />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/Search/:searchTerm" element={<Search />} />
              <Route path="/Details/:albumId" element={<Details />} />

              <Route path="/users/table" element={<UserTable />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
    </Provider>
  );
}

export default TuneHeartBeat;
