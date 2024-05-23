import { CssBaseline, Grid } from "@mui/material";

const LeftSidebar = () => {
  const getRandomImage = () => {
    const images = [
      "https://www.olyspo.com/lightbox/gallery/bdm1.webp",
      "https://www.olyspo.com/lightbox/gallery/bdm2.webp",
      "https://www.olyspo.com/lightbox/gallery/bdm3.webp",
      "https://www.olyspo.com/lightbox/gallery/bdm4.webp",
      "https://www.olyspo.com/lightbox/gallery/bdm5.webp",
      "https://www.olyspo.com/lightbox/gallery/bdm6.webp",
      "https://www.olyspo.com/lightbox/gallery/bdm7.webp",
      "https://www.olyspo.com/lightbox/gallery/bdm8.webp",
      "https://www.olyspo.com/lightbox/gallery/bdm9.webp",
      "https://www.olyspo.com/lightbox/gallery/bdm10.webp",
      "https://www.olyspo.com/lightbox/gallery/bdm11.webp",
      "https://www.olyspo.com/assets/images/newsevent/cl2.webp",
      "https://www.olyspo.com/assets/images/newsevent/cl1.webp",
      "https://www.olyspo.com/img/intro3.webp",
      "https://www.olyspo.com/lightbox/gallery/gym1.webp",
      "https://www.olyspo.com/lightbox/gallery/gym2.webp",
      "https://www.olyspo.com/lightbox/gallery/gym3.webp",
      "https://www.olyspo.com/lightbox/gallery/gym4.webp",
      "https://www.olyspo.com/lightbox/gallery/gym5.webp",
      "https://www.olyspo.com/lightbox/gallery/gym6.webp",
      "https://www.olyspo.com/lightbox/gallery/gym7.webp",
      "https://www.olyspo.com/lightbox/gallery/gym8.webp",
      "https://www.olyspo.com/lightbox/gallery/squash1.webp",
      "https://www.olyspo.com/lightbox/gallery/squash2.webp",
      "https://www.olyspo.com/lightbox/gallery/squash3.webp",
      "https://www.olyspo.com/lightbox/gallery/squash4.webp",
      "https://www.olyspo.com/lightbox/gallery/squash5.webp",
      "https://www.olyspo.com/lightbox/gallery/swim1.webp",
      "https://www.olyspo.com/lightbox/gallery/swim2.webp",
      "https://www.olyspo.com/lightbox/gallery/swim3.webp",
      "https://www.olyspo.com/lightbox/gallery/swim4.webp",
      "https://www.olyspo.com/lightbox/gallery/swim5.webp",
      "https://www.olyspo.com/lightbox/gallery/swim6.webp",
    ];
    return images[Math.floor(Math.random() * images.length)];
  };

  return (
    <>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${getRandomImage()})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </>
  );
};

export default LeftSidebar;
