import { Box, Button, Container, Typography } from "@mui/material";
import classes from "./paramsEditor.module.scss";

const ParamsEditor = () => {
  return (
    <Box className={classes.paramsEditor}>
      <Container sx={{ display: "flex", gap: "10px" }}>
        <Typography variant="h6">Params: </Typography>
        <Button variant="contained">Add header</Button>
      </Container>
    </Box>
  );
};

export default ParamsEditor;
