import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useActiveWeb3React } from "../utils/hooks/useActiveWeb3React";


export default function PrivateRoute({
  children,
  authenticated,
}: {
  children: JSX.Element;
  authenticated: boolean;
}) {
  let location = useLocation(),
    { account } = useActiveWeb3React(),
    auth = localStorage.getItem("authToken");

  if(!account){
    return <Navigate to='/unauthorized' state={{ from: location }} replace />;
  }else if (account && !authenticated) {
    // Redirect them to the /unauthorized page, but save the current location they were
    // trying to go to when they were redirected.
    return <Navigate to='/app' state={{ from: location }} replace />;
  }

  // if (!account) {
  //   // Redirect them to the /unauthorized page, but save the current location they were
  //   // trying to go to when they were redirected.
  //   return <Navigate to='/unauthorized' state={{ from: location }} replace />;
  // }

  return children;
}
