import { Box, Container } from "@mui/material";
import classes from "./response.module.scss";
import JSONPretty from "react-json-pretty";
import JSONPrettyMon from "react-json-pretty/dist/monikai";

export interface ResponseProps {
  data: string;
  status?: number;
}

const Response = ({ data, status }: ResponseProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        marginTop: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Container>
        
      </Container>
      <JSONPretty
        id="json-response"
        data={data}
        theme={JSONPrettyMon}
        className={classes.jsonResponse}
        replacer={function (key, value) {
          if (key === "cccc") {
            value += "~~~abc";
          }
          if (key === "gggg") {
            value *= 10;
          }
          return value;
        }}
        space="4"
      />
    </Box>
  );
};

export default Response;
