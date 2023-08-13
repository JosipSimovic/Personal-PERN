import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";

const Profile = () => {
  const auth = useContext(AuthContext);

  return <h1 style={{ textAlign: "center" }}>{auth.username}</h1>;
};

export default Profile;
