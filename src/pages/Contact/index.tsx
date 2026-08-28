import React, { useState } from "react";
import PageContainer from "../../components/PageContainer";
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
  const animateStyles = useSpring({
    from: { x: 0, y: 10, opacity: 0 },
    to: { x: 0, y: 0, opacity: 1 },
    delay: 250,
  });

  const alertSpring = useSpring({
    from: { x: 0, y: -100, opacity: 0 },
    to: { x: 0, y: 0, opacity: 1 },
    delay: 250,
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
      <PageContainer>
        <animated.div style={animateStyles}>
          <Stack sx={{ justifySelf: "center" }}>
            <Stack
              sx={{
                width: { xs: "100%", sm: "75%", md: "50%" },
                maxWidth: 512,
                alignSelf: "center",
                my: 4,
                mt: 10,
                px: 3,
                py: 3,
                backgroundColor: theme.palette.surface.main,
                boxShadow:
                  theme.palette.mode === "dark"
                    ? theme.shadows[3]
                    : "0 8px 24px -4px rgba(0, 0, 0, 0.06)",
                borderRadius: 3,
                border: `1px solid ${theme.palette.border.state.outlinedBorder}`,
              }}
              spacing={2}
            >
              <Typography sx={{ alignSelf: "start", fontWeight: 600 }} variant="h5">
                Contact
              </Typography>
              <Stack sx={{ width: "100%" }} spacing={4}>
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
                    alignSelf: "center",
                    justifySelf: "end",
                    backgroundColor: theme.palette.primary.main,
                    color: theme.palette.primary.contrastText,
                    fontWeight: 600,
                    "&:hover": {
                      backgroundColor: theme.palette.primary.high,
                    },
                    "&:focus-visible": {
                      backgroundColor: theme.palette.primary.state.focusVisible,
                    },
                  }}
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </animated.div>
        {alert === true && (
          <animated.div style={alertSpring}>
            <Box sx={{ position: "fixed", bottom: 50, right: 50 }}>
              <Alert severity="success" onClose={toggleAlert}>
                <AlertTitle>Message Sent</AlertTitle>
                <strong>Thanks for reaching out.</strong> Be in touch
              </Alert>
            </Box>
          </animated.div>
        )}
      </PageContainer>
    </>
  );
}
