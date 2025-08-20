import React from "react";
import { AppBar, Toolbar, Typography, Container, Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function Topbar() {
  return (
    <AppBar position="static" color="primary" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 2 }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ color: "inherit", textDecoration: "none", flexGrow: 1 }}
          >
            Books
          </Typography>
          <Button component={RouterLink} to="/authors" color="inherit">
            Authors
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
