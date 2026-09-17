import { Box, Chip, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import type {
  ResumeDataType,
  TechCategoryType,
} from "../data/resumeData";

interface ResumeSectionProps {
  data: ResumeDataType;
}

export function TechnicalSkills({ data }: ResumeSectionProps) {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      sx={{ flexWrap: "wrap", justifyContent: "start", gap: 1.5 }}
    >
      {data.skills?.map((tech: TechCategoryType) => (
        <Stack
          key={tech.category}
          sx={{
            alignItems: "start",
            p: 1.5,
            width: "fit-content",
            maxWidth: "100%",
            backgroundColor: theme.palette.surfaceContainer.main,
            border: `1px solid ${theme.palette.outline.state.outlinedBorder}`,
            borderRadius: "10px",
            gap: 0.75,
          }}
        >
          <Typography
            sx={{ fontWeight: 700, color: theme.palette.text.primary }}
            variant="body2"
          >
            {tech.category}
          </Typography>
          <Stack
            direction="row"
            sx={{ flexWrap: "wrap", alignItems: "center", gap: 0.75 }}
          >
            {tech.items.map((item) => (
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
            ))}
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}

export function ProfessionalExperience({ data }: ResumeSectionProps) {
  const theme = useTheme();

  return (
    <Stack direction="column" sx={{ width: "100%", gap: 2.5 }}>
      {data.jobs?.map((job) => (
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
              {job.content?.map((jobContent: string) => (
                <li key={jobContent} style={{ marginBottom: 4 }}>
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
}

export function Education({ data }: ResumeSectionProps) {
  const theme = useTheme();

  return (
    <Stack direction="column" sx={{ width: "100%", gap: 2 }}>
      {data.institution?.map((institution) => (
        <Stack
          key={institution.name}
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
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, fontSize: "0.925rem" }}
              >
                {institution.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary, fontSize: "0.8rem" }}
              >
                {institution.location}
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
              {institution.degree}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
}
