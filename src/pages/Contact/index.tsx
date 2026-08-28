import React, { useState } from "react";
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
import validate from "./validate";
import { useTheme } from "@mui/material/styles";
import { useSpring, animated } from "@react-spring/web";

export interface FormData {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const theme = useTheme();
  const alertSpring = useSpring({
    from: { x: 0, y: -100, opacity: 0 },
    to: { x: 0, y: 0, opacity: 1 },
  });

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState<Partial<FormData>>({});
  const [alert, setAlert] = useState(false);

  const toggleAlert = () => {
    if (alert) {
      setAlert(false);
      return;
    }
    setAlert(!alert);
    removeAlert();
  };

  const removeAlert = () => {
    let time = 7;
    const timer = setInterval(() => {
      time--;
      if (time <= 0) {
        time = 5;
        setAlert(false);
        clearInterval(timer);
      }
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateData = async () => {
    setError(validate(formData));
    return validate(formData);
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    let err = await validateData();

    if (Object.keys(err).length === 0) {
      toggleAlert();
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
  };

  return (
    <>
      <MainLayout>
        <Stack sx={{ justifySelf: "center" }}>
            <Stack
              sx={{
                width: { xs: "100%", sm: "80%", md: "55%" },
                maxWidth: 480,
                alignSelf: "center",
                my: { xs: 4, sm: 6 },
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
                <FormControl error={error.name ? true : false}>
                  <InputLabel htmlFor="name-input">Name</InputLabel>
                  <Input
                    type="text"
                    id="name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {error.name && (
                    <FormHelperText id="name-input-ht">
                      {error.name}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl error={error.email ? true : false}>
                  <InputLabel htmlFor="email-input">Email</InputLabel>
                  <Input
                    type="email"
                    id="email-input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {error.email && (
                    <FormHelperText id="name-input-ht">
                      {error.email}
                    </FormHelperText>
                  )}
                </FormControl>
                <TextField
                  id="message-input"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  label="Message"
                  multiline
                  rows={4}
                  maxRows={10}
                  variant="outlined"
                  error={error.message ? true : false}
                  helperText={error.message ? `${error.message}` : ""}
                />
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    width: 200,
                    height: 44,
                    alignSelf: "center",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
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
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Stack>
        {alert === true && (
          <animated.div style={alertSpring}>
            <Box sx={{ position: "fixed", bottom: 32, right: 32, zIndex: 1000 }}>
              <Alert
                severity="success"
                onClose={toggleAlert}
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
