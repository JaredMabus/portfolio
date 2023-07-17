import Box from "@mui/material/Box";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Socials = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 10,
          backgroundColor: "#E5E5E5",
          borderRadius: "0 0 10rem 10rem",
          svg: {
            color: "#0D111785",
            transition: "250ms ease-in-out",
            m: 0.5,
            ":hover": {
              color: "#0D1117",
            },
          },
        }}
      >
        <a href="https://github.com/JaredMabus" target="_blank">
          <GitHubIcon fontSize="large" />
        </a>
        <a href="https://www.linkedin.com/in/jaredmabusth/" target="_blank">
          <LinkedInIcon fontSize="large" />
        </a>
      </Box>
    </>
  );
};

export default Socials;
