import MainLayout from "@/components/layouts/MainLayout";
import {
  Box,
  Button,
  Stack,
  Typography,
  TextField,
  FormControl,
  Input,
  FormHelperText,
  InputLabel,
  Alert,
  AlertTitle,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useSpring, animated } from "@react-spring/web";
import useContactForm from "../hooks/useContactForm";

export default function Contact() {
  const theme = useTheme();
  const alertSpring = useSpring({
    from: { x: 0, y: -100, opacity: 0 },
    to: { x: 0, y: 0, opacity: 1 },
  });

  const {
    dismissSuccess,
    errors,
    formData,
    handleChange,
    handleSubmit,
    isSuccessVisible,
  } = useContactForm();

  return (
    <>
      <MainLayout animatePage={true}>
        <Box
          component="section"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 4, md: 6 },
            pb: 8,
            pt: { xs: 2, md: 4 },
            width: "100%",
            alignItems: "center",
          }}
        >
          <Stack
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: { xs: "100%", sm: "80%", md: "55%" },
              maxWidth: 480,
              alignSelf: "center",
              my: 0,
              px: { xs: 3, sm: 4 },
              py: { xs: 3, sm: 4 },
              gap: 2.5,
              backgroundColor: theme.palette.surface.main,
              boxShadow:
                theme.palette.mode === "dark"
                  ? theme.shadows[3]
                  : "0 8px 24px -4px rgba(0, 0, 0, 0.06)",
              borderRadius: "16px",
              border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
            }}
          >
            <Typography sx={{ alignSelf: "start", fontWeight: 700, letterSpacing: "-0.01em" }} variant="h5">
              Contact
            </Typography>
            <Stack sx={{ width: "100%", gap: 2.5 }}>
              <FormControl error={Boolean(errors.name)}>
                <InputLabel htmlFor="name-input">Name</InputLabel>
                <Input
                  type="text"
                  id="name-input"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && (
                  <FormHelperText id="name-input-ht">
                    {errors.name}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl error={Boolean(errors.email)}>
                <InputLabel htmlFor="email-input">Email</InputLabel>
                <Input
                  type="email"
                  id="email-input"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <FormHelperText id="email-input-ht">
                    {errors.email}
                  </FormHelperText>
                )}
              </FormControl>
              <TextField
                id="message-input"
                name="message"
                label="Message"
                multiline
                rows={4}
                value={formData.message}
                onChange={handleChange}
                variant="outlined"
                error={Boolean(errors.message)}
                helperText={errors.message ?? ""}
              />
              <Button
                variant="contained"
                color="primary"
                sx={{
                  width: 200,
                  height: 44,
                  alignSelf: "center",
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.surface.main,
                  fontWeight: 700,
                  borderRadius: "24px",
                  mt: 1,
                  boxShadow: `0 4px 14px ${theme.palette.primary.state.focus}`,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.high,
                    boxShadow: `0 6px 20px ${theme.palette.primary.state.focusVisible}`,
                  },
                  "&:focus-visible": {
                    outline: `2px solid ${theme.palette.primary.state.focusVisible}`,
                  },
                }}
                type="submit"
              >
                Submit
              </Button>
            </Stack>
          </Stack>
        </Box>
        {isSuccessVisible && (
          <animated.div style={alertSpring}>
            <Box sx={{ position: "fixed", bottom: 32, right: 32, zIndex: 1000 }}>
              <Alert
                severity="success"
                onClose={dismissSuccess}
                sx={{ borderRadius: "12px", boxShadow: theme.shadows[4] }}
              >
                <AlertTitle>Message Sent</AlertTitle>
                <strong>Thanks for reaching out.</strong> I'll be in touch soon!
              </Alert>
            </Box>
          </animated.div>
        )}
      </MainLayout>
    </>
  );
}
