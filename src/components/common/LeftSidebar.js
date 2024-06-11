import { Grid } from "@mui/material";

const LeftSidebar = () => {
  return (
    <>
      <Grid
        item
        xs={true}
        sm={12}
        md={6}
        sx={{
          backgroundImage: `url("../bg.webp")`,
          backgroundRepeat: "no-repeat",
          position: "relative",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="couponMain"
      >
        <Grid className="logo">
          <img src="../olympus.svg" alt="olympus" title="Olympus" />
        </Grid>
        <Grid className="couponDiscount">
          <img
            src="../coupon-discount.svg"
            alt="coupon discount"
            title="Coupon Discount"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LeftSidebar;
