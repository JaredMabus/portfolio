import {
  Box,
  Button,
  Divider,
  Chip,
  Stack,
  Typography,
  TextField,
  alpha,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

import { useTheme } from "@mui/material/styles";
import useDocumentTitle from "@/utils/useDocumentTitle";
import {
  resumeData,
  ResumeDataType,
  TechCategoryType,
  JobsType,
  InstitutionsType,
} from "./resumeData";
import { Key } from "@mui/icons-material";

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
        my: 2,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {data.skills &&
        data.skills.map((tech: TechCategoryType) => (
          <Stack
            key={tech.category}
            sx={{
              alignItems: "center",
              p: 1,
              m: 0.5,
              maxHeight: 400,
              border: `1px solid ${theme.palette.outline.main}`,
              borderRadius: 3,
            }}
          >
            <Typography
              sx={{ mb: 0.5, mx: 0.2, fontWeight: 700 }}
              variant="body2"
            >
              {tech.category}:
            </Typography>
            <Stack
              direction="row"
              sx={{
                maxWidth: 130,
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              {tech.items.map((item) => {
                return (
                  <Chip
                    key={item}
                    sx={{ m: 0 }}
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

// interface ProfessionalProps {
//   data: ResumeDataType
// }

const ProfessionalExperience: React.FC<Props> = ({ data }) => {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      sx={{
        my: 2,
        flexWrap: "wrap",
        justifyContent: "center",
        width: "100%",
      }}
    >
      {data.jobs &&
        data.jobs.map((job) => (
          <Stack key={job.employer} sx={{ width: "100%", mb: 5 }}>
            <Stack
              sx={{ width: "100%", justifyContent: "space-between", mb: 1 }}
              direction="row"
            >
              <Stack>
                <Stack
                  sx={{ width: "100%", alignItems: "baseline" }}
                  direction="row"
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ mr: 1, fontWeight: 600 }}
                  >
                    {job.employer}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {job.location}
                  </Typography>
                </Stack>
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, fontStyle: "italic" }}
                >
                  {job.position}
                </Typography>
              </Stack>
              <Typography sx={{ fontWeight: 600, pt: 0.5 }} variant="body1">
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
              <Typography variant="body1" sx={{ pl: 1, pb: 0.5 }}>
                {job.jobSummary}
              </Typography>
            )}
            <Box sx={{ p: 0.5, pl: 3 }}>
              <ul>
                {job.content &&
                  job.content.map((jobContent: string, key: number) => (
                    <li key={key}>
                      <Typography variant="body1">{jobContent}</Typography>
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
        my: 2,
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {data.institution &&
        data.institution.map((ist) => (
          <Typography key={ist.name}>{ist.name}</Typography>
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
        px: { xs: 3, sm: 7 },
        pt: 7,
        pb: 20,
        mt: 5,
        mb: 10,
        maxWidth: { xs: "100%", sm: 600, md: 900 },
        borderRadius: 2,
        // boxShadow: "rgba(0 0 0 / 10%) 2px 2px 5px 2px",
        border:
          theme.palette.mode === "dark"
            ? `1px solid transparent`
            : `1px solid ${theme.palette.border.light}`,

        boxShadow:
          theme.palette.mode === "dark"
            ? "rgba(50 50 50 / 15%) 1px 1px 5px 2px"
            : "rgba(0 0 0 / 10%) 1px 1px 10px 2px",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          justifySelf: "end",
          alignSelf: "end",
          top: 20,
        }}
      ></Box>
      <Stack
        sx={{
          p: 1,
        }}
      >
        <Typography variant="h4">Jared Mabusth</Typography>
        <Stack
          sx={{
            alignSelf: "start",
            gap: { xs: 1, sm: 2 },
            mt: 0.4,
            mb: 0.7,
            pl: 0.5,
            flexDirection: { xs: "column", sm: "row" },
          }}
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                borderColor: theme.palette.outline.main,
              }}
            />
          }
        >
          <a
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
            }}
            href="https://www.linkedin.com/in/jaredmabusth"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            style={{
              textDecoration: "none",
              color: theme.palette.text.primary,
            }}
            href="https://github.com/JaredMabus"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          {/* <Typography variant="body1">Minneapolis, MN</Typography> */}
        </Stack>
        {resumeData.map((section) => (
          <Stack spacing={2} sx={{ py: 2 }} key={section.id}>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 600,
                pb: 0.5,
                borderBottom: `2px solid ${alpha(
                  theme.palette.outline.light,
                  0.8
                )}`,
              }}
            >
              {section.title}
            </Typography>
            {section.title === "Summary" && (
              <Typography
                variant="body1"
                sx={{
                  justifySelf: "center",
                  alignSelf: "start",
                  maxWidth: 800,
                  p: 1,
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
