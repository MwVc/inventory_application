import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Topbar from "./components/Topbar";

export default function App() {
  return (
    <>
      <Topbar />
      <Box component="main" sx={{ py: 4 }}>
        <Container maxWidth="lg">
          <Routes></Routes>
        </Container>
      </Box>
    </>
  );
}
