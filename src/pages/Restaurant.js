import React, { useState } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";

const CouponCodeSection = () => {
  const [coupon, setCoupon] = useState("");
  const [couponData, setCouponData] = useState(null);
  const [error, setError] = useState(null);

  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/coupons/verify/${coupon}`
      );
      setCouponData(response.data);
      setError(null);
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error);
        setCouponData(null);
      } else {
        setError("Coupon code is not valid");
        setCouponData(null);
      }
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      mt={4}
      p={2}
      border={1}
      borderRadius={2}
      borderColor="grey.300"
      width="50%"
      mx="auto"
    >
      <Typography variant="h6" mb={2}>
        Apply Coupon Code
      </Typography>
      <TextField
        label="Coupon Code"
        variant="outlined"
        value={coupon}
        onChange={(e) => setCoupon(e.target.value)}
        fullWidth
        mb={2}
        style={{ marginBottom: "20px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleApplyCoupon}
        fullWidth
      >
        Apply
      </Button>
      {error && (
        <Alert severity="error" mt={2}>
          {error}
        </Alert>
      )}
      {couponData ? (
        <TableContainer component={Paper} mt={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Full Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Member Unique ID</TableCell>
                <TableCell>Coupon Code</TableCell>
                <TableCell>Application Status</TableCell>
                <TableCell>Applied Date and Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>{couponData.fullName}</TableCell>
                <TableCell>{couponData.email}</TableCell>
                <TableCell>{couponData.memberUniqueId}</TableCell>
                <TableCell>{couponData.couponCode}</TableCell>
                <TableCell>
                  {couponData.appliedDate
                    ? "Successfully Applied"
                    : "Already Used"}
                </TableCell>
                <TableCell>
                  {couponData.appliedDate
                    ? new Date(couponData.appliedDate).toLocaleString()
                    : "-"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : error ? null : (
        <Typography variant="body1" mt={2}>
          Please apply a valid coupon code.
        </Typography>
      )}
    </Box>
  );
};

const Restaurant = () => {
  return (
    <div>
      <CouponCodeSection />
    </div>
  );
};

export default Restaurant;
