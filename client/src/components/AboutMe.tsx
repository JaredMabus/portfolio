import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";

const AboutMe = () => {
  const theme = useTheme();

  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column" },
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
            py: { xs: 1, sm: 1 },
            borderBottom: `3px solid ${theme.palette.secondary.light}`,
            // borderBottom: {
            //   xs: `3px solid ${theme.palette.secondary.light}`,
            //   sm: "none",
            // },
            // borderRight: {
            //   xs: "none",
            //   sm: `3px solid ${theme.palette.secondary.light}`,
            // },
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
          Full stack developer and data analyst who is passionate about building
          applications and solving problems. It wasn’t until my time spent in
          college, diving into the many caffeine-fueled research projects, that
          the spark was lit. I couldn’t get enough of using technology and
          programming languages to manage, analyze, and tell stories with data.
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
          It wasn’t long until my passion for data analytics and web development
          merged. I like the creative freedom that front-end development
          provides; incorporating graphic design skills and UI/UX principles.
          Having spent countless hours cleaning and normalizing data, my
          experience has taught me the importance of thorough data modeling,
          robust RESTful API design, and database management skills.
        </Typography>
      </Stack>
    </>
  );
};

export default AboutMe;
