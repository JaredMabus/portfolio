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
          flexDirection: "column",
          justifyContent: { xs: "start", sm: "start", md: "center" },
          alignItems: "center",
          justifySelf: "center",
          alignSelf: "center",
          px: 1,
          mb: 30,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            p: 1,
            py: { xs: 1, sm: 1 },
            borderBottom: `3px solid ${theme.palette.secondary.light}`,
            whiteSpace: "nowrap",
          }}
        >
          About Me
        </Typography>
        <Stack
          sx={{
            width: { xs: "100%", sm: "75%", md: "60%" },
            justifyContent: "center",
            py: 2,
            px: 1,

            "& p": { mb: 2, textWrap: "pretty" },
          }}
        >
          <Typography>
            I'm a full-stack developer and data analyst who loves turning data
            and ideas into meaningful applications. My passion began in college,
            during countless caffeine-fueled research projects, where I
            discovered how code could manage, analyze, and tell stories with
            data.
          </Typography>
          <Typography>
            Over time, my love for data analytics and web development merged
            into a single craft. I enjoy the creative freedom of frontend
            design, blending visual storytelling with interface design, while
            maintaining well-structured data models and robust API endpoints.
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};

export default AboutMe;
