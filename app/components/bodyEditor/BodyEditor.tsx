import {
  Box,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextareaAutosize,
} from "@mui/material";

export interface BodyEditorProps {
  body: string;
  setBody: (v: string) => void;
}

const BodyEditor = ({ body, setBody }: BodyEditorProps) => {
  return (
    <Container>
      <RadioGroup
        defaultValue="JSON"
        name="request-body-editor-format"
        row
        value="Text"
      >
        <FormControlLabel label="JSON" value="JSON" control={<Radio />} />
        <FormControlLabel label="Text" value="Text" control={<Radio />} />
      </RadioGroup>
      <Box>
        <TextareaAutosize
          style={{ width: "80%", maxWidth: "85vw", padding: "5px 10px" }}
          value={body}
          onInput={({ target }) =>
            setBody((target as HTMLTextAreaElement).value)
          }
        />
      </Box>
    </Container>
  );
};

export default BodyEditor;
