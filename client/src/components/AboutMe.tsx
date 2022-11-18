import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const AboutMe = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "start", sm: "start", md: "center" },
          alignItems: "center",
          justifySelf: "center",
          alignSelf: "center",
          px: 1,
          mb: 30,
        }}
      >
        <Typography
          sx={{
            p: 1,
            py: { xs: 1, sm: 4 },
            borderBottom: {
              xs: `3px solid ${theme.palette.secondary.light}`,
              sm: "none",
            },
            borderRight: {
              xs: "none",
              sm: `3px solid ${theme.palette.secondary.light}`,
            },
            whiteSpace: "nowrap",
          }}
          variant="h4"
        >
          About Me
        </Typography>
        <Typography
          sx={{
            p: 1,
            pt: 2,
            pl: 1.5,
            maxWidth: { xs: "100%", md: "50%" },
          }}
          variant="subtitle1"
        >
          Data analyst and web developer who loves to build applications and
          solve problems. Not only do I enjoy looking for statistical findings,
          I also find joy in using technology and programming languages to
          manage, analyze, and tell stories with data.
        </Typography>
      </Box>
    </>
  );
};

export default AboutMe;
