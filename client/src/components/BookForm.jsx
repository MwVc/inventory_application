import React from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

export default function BookForm({
  data,
  onChange,
  onSubmit,
  submitLabel = "Save",
}) {
  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Title"
            name="title"
            value={data.title}
            onChange={onChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Author"
            name="author"
            value={data.author}
            onChange={onChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            select
            label="Category"
            name="category"
            value={data.category}
            onChange={onChange}
            fullWidth
          >
            <MenuItem value="Programming">Programming</MenuItem>
            <MenuItem value="Self-help">Self-help</MenuItem>
            <MenuItem value="Fiction">Fiction</MenuItem>
            <MenuItem value="Non-fiction">Non-fiction</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Price (KSh)"
            name="price"
            value={data.price}
            onChange={onChange}
            fullWidth
            type="number"
            required
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            label="Stock"
            name="stock"
            value={data.stock}
            onChange={onChange}
            fullWidth
            type="number"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            value={data.description}
            onChange={onChange}
            fullWidth
            multiline
            minRows={3}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end" }}
        >
          <Button
            variant="outlined"
            color="inherit"
            type="button"
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button variant="contained" type="submit">
            {submitLabel}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
