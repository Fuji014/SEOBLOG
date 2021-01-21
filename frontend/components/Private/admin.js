import React, { useEffect } from "react";

// router
import Router from "next/router";

// actions
import { isAuth } from "../../redux/actions/auth";

// redux
import { useSelector } from "react-redux";

function Admin(props) {
  // user state
  const userState = useSelector((state) => state.user);
  const { userLogged } = userState;

  useEffect(() => {
    if (!isAuth()) {
      Router.push("/signin");
    } else if (isAuth().role === 0) {
      Router.push("/");
    }
  }, [Router, userLogged, isAuth]);

  return <>{props.children}</>;
}

export default Admin;
