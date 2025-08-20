import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
  return (
    <Box textAlign="center" py={8}>
      <Typography variant="h3">404</Typography>
      <Typography variant="body1" gutterBottom>
        The page you are looking for doesn't exist.
      </Typography>
      <Button component={RouterLink} to="/" variant="contained">
        Go home
      </Button>
    </Box>
  );
}
