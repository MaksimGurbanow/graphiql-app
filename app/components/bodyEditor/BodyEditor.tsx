import { Box, Container, TextareaAutosize } from "@mui/material";

export interface BodyEditorProps {
  body: string;
  setBody: (v: string) => void;
}

const BodyEditor = ({ body, setBody }: BodyEditorProps) => {
  return (
    <Container>
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
