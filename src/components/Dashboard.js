import React, { useEffect, useState } from "react";

import Member from "../pages/Member";
import Restaurant from "../pages/Restaurant";
import Header from "./Header";
import { Box } from "@mui/material";

const Dashboard = () => {
  const [userType, setUserType] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    // Retrieve user type and email from local storage
    const type = localStorage.getItem("userType");
    const email = localStorage.getItem("userEmail");
    setUserType(type);
    setUserEmail(email);
  }, []);

  return (
    <div>
      <Header />
      <Box component="span" sx={{ display: "none" }}>
        {userEmail}
      </Box>
      {userType === "member" && <Member />}
      {userType === "restaurant" && <Restaurant />}
    </div>
  );
};

export default Dashboard;
