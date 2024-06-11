import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Radio, RadioGroup, FormControl, FormLabel } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "./Copyright";

import axios from "axios";
import LeftSidebar from "./common/LeftSidebar";

const RestaurantRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("restaurant");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiBaseUrl}/api/auth/register`, {
        email,
        password,
        userType,
      });
      setMessage(response.data.message);
      navigate("/rest/login");
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid className="mainWrapper" container component="main">
        <LeftSidebar />
        <Grid
          sx={{ alignContent: "center" }}
          className="rightSidebar"
          item
          xs={12}
          sm={12}
          md={6}
          component={Paper}
          elevation={6}
          square
        >
          <Box
            sx={{
              my: 4,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="rightSidebarBox">
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign Up
              </Typography>
              <Box sx={{ mt: 1, maxWidth: 600 }}>
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    type="email"
                  />
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                  />
                  <FormControl component="fieldset" sx={{ mt: 2 }}>
                    <FormLabel component="legend">Register as:</FormLabel>
                    <RadioGroup
                      row
                      aria-label="userType"
                      name="userType"
                      value={userType}
                      onChange={(e) => setUserType(e.target.value)}
                    >
                      <FormControlLabel
                        value="restaurant"
                        control={<Radio />}
                        label="Restaurant"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                  {message && (
                    <p
                      style={{
                        color: "green",
                        fontStyle: "italic",
                        textAlign: "center",
                      }}
                    >
                      {message}
                    </p>
                  )}
                </form>
                <Grid container>
                  <Grid item>
                    <Link to="/rest/login" variant="body2">
                      {"Already have an account? Sign In"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </div>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RestaurantRegister;
