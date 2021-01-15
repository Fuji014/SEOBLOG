import React, { useEffect } from "react";

// router
import Router from "next/router";

// actions
import { isAuth } from "../../redux/actions/auth";

// redux
import { useSelector } from "react-redux";

function Private(props) {
  // user state
  const userState = useSelector((state) => state.user);
  const { userLogged } = userState;

  useEffect(() => {
    !isAuth() && Router.push("/signin");
  }, [Router, userLogged]);

  return <>{props.children}</>;
}

export default Private;
