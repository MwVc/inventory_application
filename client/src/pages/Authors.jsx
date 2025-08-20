import React from "react";
import { authors } from "../data/authors";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";

export default function Authors() {
  return (
    <Container sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Authors
        </Typography>
        <List>
          {authors.map((author) => (
            <ListItem key={author.id}>
              <ListItemText primary={author.name} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Container>
  );
}
