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

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("member");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
  const apiFetchUrl = process.env.REACT_APP_API_FETCH_URL;

  const checkMemberUniqueId = async (memberUniqueId) => {
    try {
      const response = await axios.get(`${apiFetchUrl}/member/`);
      if (response.data.status && response.data.data) {
        const existingMember = response.data.data.find(
          (member) =>
            member.memberUniqueId.toUpperCase() === memberUniqueId.toUpperCase()
        );
        return existingMember !== undefined;
      }
    } catch (error) {
      console.error("Error checking member unique ID:", error);
    }
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isMemberUniqueIdAvailable = await checkMemberUniqueId(email);
    if (!isMemberUniqueIdAvailable) {
      setError("Member Unique ID not found.");
      return;
    }
    try {
      const response = await axios.post(`${apiBaseUrl}/api/auth/register`, {
        email,
        password,
        userType,
      });
      setMessage(response.data.message);
      navigate("/login");
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
                    label="Member Id"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    margin="normal"
                    required
                    type="text"
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
                        value="member"
                        control={<Radio />}
                        label="Member"
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
                  {error && (
                    <p
                      style={{
                        color: "red",
                        fontStyle: "italic",
                        textAlign: "center",
                      }}
                    >
                      {error}
                    </p>
                  )}
                </form>
                <Grid container>
                  <Grid item>
                    <Link to="/login" variant="body2">
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

export default RegistrationForm;
