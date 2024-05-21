import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Snackbar,
  IconButton,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const Member = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [isGenerated, setIsGenerated] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const apiFetchUrl = process.env.REACT_APP_API_FETCH_URL;
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${apiFetchUrl}/member/`);
        if (response.data.status && response.data.data) {
          const email = localStorage.getItem("userEmail");
          setUserEmail(email);
          const filteredMembers = response.data.data.filter(
            (member) => member.email === email
          );

          const updatedMembers = await Promise.all(
            filteredMembers.map(async (member) => {
              try {
                const couponResponse = await axios.get(
                  `${apiBaseUrl}/api/coupons/${member.email}`
                );
                if (couponResponse.data.couponCode) {
                  return { ...member, couponGenerated: true };
                }
              } catch (error) {
                if (error.response && error.response.status === 404) {
                  return { ...member, couponGenerated: false };
                }
              }
              return member;
            })
          );

          setMembers(updatedMembers);
          const user = updatedMembers[0];
          if (user) {
            setUserData(user);
          }
        } else {
          setError("No member data found");
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleOpen = async (member) => {
    setSelectedMember(member);
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/coupons/${member.email}`
      );
      if (response.data.couponCode) {
        setCouponCode(response.data.couponCode);
        setIsGenerated(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setIsGenerated(false);
      } else {
        setError("Failed to fetch coupon code");
      }
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCouponCode("");
    setIsGenerated(false);
    setSelectedMember(null);
  };

  const generateCouponCode = async () => {
    const randomCode = "OLY" + Math.floor(100000 + Math.random() * 900000);
    setCouponCode(randomCode);

    if (selectedMember) {
      try {
        await axios.post(`${apiBaseUrl}/api/coupons`, {
          fullName: selectedMember.fullName,
          email: selectedMember.email,
          memberUniqueId: selectedMember.memberUniqueId,
          couponCode: randomCode,
        });
        setIsGenerated(true);
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.email === selectedMember.email
              ? { ...member, couponGenerated: true }
              : member
          )
        );
      } catch (error) {
        setError("Failed to save coupon code");
      }
    }
  };

  const handleCopySuccess = () => {
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Unique ID</TableCell>
              <TableCell>Generate Coupon</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {members.map((member, index) => (
              <TableRow key={index}>
                <TableCell>{member.fullName}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.memberUniqueId}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpen(member)}
                  >
                    {member.couponGenerated
                      ? "Show Coupon Code"
                      : "Generate Coupon"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Coupon Code</DialogTitle>
        <DialogContent style={{ paddingTop: "6px" }}>
          {selectedMember && (
            <div>
              <TextField
                label="Full Name"
                value={selectedMember.fullName}
                variant="outlined"
                fullWidth
                disabled
                style={{ marginBottom: "20px" }}
              />
              <TextField
                label="Email"
                value={selectedMember.email}
                variant="outlined"
                fullWidth
                disabled
                style={{ marginBottom: "20px" }}
              />
              <TextField
                label="Unique ID"
                value={selectedMember.memberUniqueId}
                variant="outlined"
                fullWidth
                disabled
                style={{ marginBottom: "20px" }}
              />
            </div>
          )}
          {couponCode && (
            <div style={{ position: "relative" }}>
              <TextField
                label="Coupon Code"
                value={couponCode}
                fullWidth
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
              <CopyToClipboard
                text={couponCode}
                onCopy={handleCopySuccess}
                style={{ position: "absolute", right: "0px", top: "6px" }}
              >
                <IconButton color="primary" aria-label="copy">
                  <FileCopyIcon />
                </IconButton>
              </CopyToClipboard>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          {!isGenerated && (
            <Button onClick={generateCouponCode}>Generate Now</Button>
          )}
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message="Coupon code copied successfully!"
      />
    </div>
  );
};

export default Member;
