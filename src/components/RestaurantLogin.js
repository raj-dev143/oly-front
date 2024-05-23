import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Link } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from "@mui/material/Typography";
import { Radio, RadioGroup, FormControl, FormLabel } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Copyright from "./Copyright";

const RestaurantLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("restaurant");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginType) {
      setMessage("Please select a user type.");
      return;
    }
    try {
      const response = await axios.post(`${apiBaseUrl}/api/auth/login`, {
        email,
        password,
        loginType,
      });
      if (response.data.userType !== loginType) {
        setMessage("Invalid user type.");
        return;
      }
      setMessage("Login successful");
      // Save token and user email to local storage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userType", response.data.userType);
      localStorage.setItem("userEmail", email); // Store user's email
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setMessage(
        error.response?.data?.error || "An error occurred during login"
      );
    }
  };

  const defaultTheme = createTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOpenIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign In
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
                <FormControl component="fieldset" sx={{ mt: 2 }} required>
                  <FormLabel component="legend">Login as:</FormLabel>
                  <RadioGroup
                    row
                    aria-label="loginType"
                    name="loginType"
                    value={loginType}
                    onChange={(e) => setLoginType(e.target.value)}
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
                  Sign In
                </Button>
                {message && (
                  <p
                    style={{
                      color: "red",
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
                  <Link to="/rest" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default RestaurantLogin;
