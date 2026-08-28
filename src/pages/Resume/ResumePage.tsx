import {
  Box,
  Divider,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

import { useTheme } from "@mui/material/styles";
import useDocumentTitle from "@/utils/useDocumentTitle";
import {
  resumeData,
  ResumeDataType,
  TechCategoryType,
} from "./data/resumeData";

interface Props {
  data: ResumeDataType;
}

const TechnicalSkills: React.FC<Props> = ({ data }) => {
  const theme = useTheme();
  useDocumentTitle("Resume");

  return (
    <Stack
      direction="row"
      sx={{
        flexWrap: "wrap",
        justifyContent: "start",
        gap: 1.5,
      }}
    >
      {data.skills &&
        data.skills.map((tech: TechCategoryType) => (
          <Stack
            key={tech.category}
            sx={{
              alignItems: "start",
              p: 1.5,
              flexGrow: 1,
              minWidth: 180,
              backgroundColor: theme.palette.surfaceContainer.main,
              border: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
              borderRadius: "10px",
              gap: 0.75,
            }}
          >
            <Typography
              sx={{ fontWeight: 700, fontSize: "0.8rem", color: theme.palette.text.primary }}
              variant="subtitle2"
            >
              {tech.category}
            </Typography>
            <Stack
              direction="row"
              sx={{
                flexWrap: "wrap",
                alignItems: "center",
                gap: 0.75,
              }}
            >
              {tech.items.map((item) => {
                return (
                  <Chip
                    key={item}
                    sx={{
                      borderRadius: "6px",
                      fontSize: "0.72rem",
                      fontWeight: 500,
                      height: 22,
                    }}
                    size="small"
                    variant="outlined"
                    label={item}
                  />
                );
              })}
            </Stack>
          </Stack>
        ))}
    </Stack>
  );
};

const ProfessionalExperience: React.FC<Props> = ({ data }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="column"
      sx={{
        width: "100%",
        gap: 2.5,
      }}
    >
      {data.jobs &&
        data.jobs.map((job) => (
          <Stack key={job.employer} sx={{ width: "100%", gap: 0.5 }}>
            <Stack
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                width: "100%",
                alignItems: { xs: "start", sm: "baseline" },
                justifyContent: "space-between",
                gap: 0.5,
              }}
            >
              <Stack sx={{ gap: 0.25 }}>
                <Stack
                  sx={{
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "baseline",
                    gap: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 700, fontSize: "0.925rem" }}
                  >
                    {job.employer}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: theme.palette.text.secondary,
                      fontSize: "0.8rem",
                    }}
                  >
                    {job.location}
                  </Typography>
                </Stack>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    fontSize: "0.825rem",
                  }}
                >
                  {job.position}
                </Typography>
              </Stack>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.secondary,
                  whiteSpace: "nowrap",
                  fontSize: "0.78rem",
                }}
              >
                {new Date(job.startDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
                {" - "}
                {job.endDate === "Present"
                  ? "Present"
                  : new Date(job.endDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                  })}
              </Typography>
            </Stack>
            {job.jobSummary.length > 0 && (
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                  lineHeight: 1.5,
                  fontSize: "0.85rem",
                }}
              >
                {job.jobSummary}
              </Typography>
            )}
            <Box sx={{ pl: { xs: 1.5, sm: 2 } }}>
              <ul style={{ margin: 0, paddingLeft: 16 }}>
                {job.content &&
                  job.content.map((jobContent: string, key: number) => (
                    <li key={key} style={{ marginBottom: 4 }}>
                      <Typography
                        variant="body2"
                        sx={{
                          lineHeight: 1.5,
                          fontSize: "0.85rem",
                          color: theme.palette.text.primary,
                        }}
                      >
                        {jobContent}
                      </Typography>
                    </li>
                  ))}
              </ul>
            </Box>
          </Stack>
        ))}
    </Stack>
  );
};

const Education: React.FC<Props> = ({ data }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="column"
      sx={{
        width: "100%",
        gap: 2,
      }}
    >
      {data.institution &&
        data.institution.map((ist) => (
          <Stack
            key={ist.name}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "start", sm: "baseline" },
              gap: 0.5,
            }}
          >
            <Stack sx={{ gap: 0.25 }}>
              <Stack
                direction="row"
                sx={{ alignItems: "baseline", gap: 1, flexWrap: "wrap" }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: "0.925rem" }}>
                  {ist.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: theme.palette.text.secondary, fontSize: "0.8rem" }}
                >
                  {ist.location}
                </Typography>
              </Stack>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600, color: theme.palette.primary.main, fontSize: "0.825rem" }}
              >
                {ist.degree}
              </Typography>
            </Stack>
          </Stack>
        ))}
    </Stack>
  );
};

export default function ResumePage() {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        position: "relative",
        justifySelf: "center",
        alignSelf: "center",
        backgroundColor: theme.palette.surfaceContainer.main,
        px: { xs: 2.5, sm: 5, md: 6 },
        pt: { xs: 3, sm: 5 },
        pb: { xs: 4, sm: 6 },
        mt: { xs: 2, sm: 4 },
        mb: 6,
        maxWidth: { xs: "100%", sm: 700, md: 840 },
        width: "100%",
        borderRadius: "16px",
        border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
        boxShadow:
          theme.palette.mode === "dark"
            ? "rgba(50 50 50 / 15%) 1px 1px 5px 2px"
            : "rgba(0 0 0 / 6%) 0px 8px 24px 0px",
      }}
    >
      <Stack sx={{ gap: 0 }}>
        {/* Header Name & Social Links */}
        <Stack sx={{ gap: 0.75, pb: 1, p: 0.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: "-0.02em" }}>
            Jared Mabusth
          </Typography>
          <Stack
            sx={{
              alignSelf: "start",
              gap: { xs: 0.5, sm: 1 },
              flexDirection: { xs: "column", sm: "row" },
            }}
            divider={
              <Divider
                orientation="vertical"
                flexItem
                sx={{
                  borderColor: theme.palette.outline.state.outlinedBorder,
                }}
              />
            }
          >
            <Box
              component={Link}
              to="https://www.linkedin.com/in/jaredmabusth"
              target="_blank"
              rel="noreferrer"
              sx={{
                textDecoration: "none",
                color: theme.palette.text.secondary,
                py: 0.25,
                px: 1,
                borderRadius: "6px",
                fontSize: "0.825rem",
                fontWeight: 600,
                transition: theme.transitions.create(
                  ["color", "background-color"],
                  {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut,
                  }
                ),
                "&:hover": {
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.primary.state.hover,
                },
                "&:focus-visible": {
                  backgroundColor: theme.palette.primary.state.focusVisible,
                },
              }}
            >
              LinkedIn
            </Box>
            <Box
              component={Link}
              to="https://github.com/JaredMabus"
              target="_blank"
              rel="noreferrer"
              sx={{
                textDecoration: "none",
                color: theme.palette.text.secondary,
                py: 0.25,
                px: 1,
                borderRadius: "6px",
                fontSize: "0.825rem",
                fontWeight: 600,
                transition: theme.transitions.create(
                  ["color", "background-color"],
                  {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeInOut,
                  }
                ),
                "&:hover": {
                  color: theme.palette.primary.main,
                  backgroundColor: theme.palette.primary.state.hover,
                },
                "&:focus-visible": {
                  backgroundColor: theme.palette.primary.state.focusVisible,
                },
              }}
            >
              GitHub
            </Box>
          </Stack>
        </Stack>

        {/* Resume Content Sections */}
        {resumeData.map((section) => (
          <Stack
            sx={{
              pt: section.title === "Summary" ? { xs: 1.5, sm: 2 } : { xs: 3, sm: 4 },
              px: 0.5,
              pb: 0.5,
            }}
            key={section.id}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1.05rem",
                letterSpacing: "-0.01em",
                pb: 0.5,
                mb: 1.25,
                borderBottom: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
              }}
            >
              {section.title}
            </Typography>
            {section.title === "Summary" && (
              <Typography
                variant="body2"
                sx={{
                  maxWidth: 800,
                  lineHeight: 1.6,
                  color: theme.palette.text.secondary,
                  fontSize: "0.85rem",
                }}
              >
                {section.content}
              </Typography>
            )}
            {section.title === "Technical Skills" && (
              <TechnicalSkills data={section} />
            )}
            {section.title === "Professional Experience" && (
              <ProfessionalExperience data={section} />
            )}
            {section.title === "Education" && <Education data={section} />}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
