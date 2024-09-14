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
  bodyMode: string;
  setBodyMode: (v: string) => void;
}

const BodyEditor = ({
  body,
  setBody,
  bodyMode,
  setBodyMode,
}: BodyEditorProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBodyMode((event.target as HTMLInputElement).value);
  };
  return (
    <Container>
      <Box>
        <RadioGroup
          sx={{ display: "flex", gap: "10px" }}
          row
          value={bodyMode}
          onChange={handleChange}
        >
          <FormControlLabel value="JSON" control={<Radio />} label="JSON" />
          <FormControlLabel value="Text" control={<Radio />} label="Text" />
        </RadioGroup>
      </Box>
      <Box>
        <TextareaAutosize
          style={{ width: "80%", maxWidth: "85vw", padding: "5px 10px" }}
          value={body}
          onInput={({ target }) =>
            setBody((target as HTMLTextAreaElement).value)
          }
          minRows={10}
        />
      </Box>
    </Container>
  );
};

export default BodyEditor;
