import { Box, Button, Container, Typography } from "@mui/material";
import "./headerseditor.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Dispatch, SetStateAction } from "react";
import { IHeader } from "~/types/types";

export interface HeadersEditorProps {
  headers: IHeader[];
  setHeaders: Dispatch<SetStateAction<IHeader[]>>;
}

const HeadersEditor = ({ headers, setHeaders }: HeadersEditorProps) => {
  const columns: GridColDef[] = [
    {
      field: "key",
      headerName: "Key",
      headerAlign: "center",
      flex: 1,
      editable: true,
    },
    {
      field: "value",
      headerName: "Value",
      headerAlign: "center",
      flex: 1,
      editable: true,
    },
    {
      field: "description",
      headerName: "Description",
      headerAlign: "center",
      flex: 1,
      editable: true,
    },
  ];
  const updateHeader = (prev: IHeader[], id: number, header?: IHeader) => {
    const newArray = [...prev];
    newArray[id] = header || { key: "", value: "", description: "" };
    return newArray;
  };
  return (
    <Box className="headers-editor">
      <Container
        sx={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Typography variant="h6">Headers:</Typography>
        <Button
          variant="contained"
          onClick={() => setHeaders((prev) => updateHeader(prev, prev.length))}
        >
          Add header
        </Button>
      </Container>
      <DataGrid
        rows={headers.map((header, index) => ({ ...header, id: index }))}
        hideFooter
        columns={columns}
        onCellKeyDown={(params, event) => {
          const {
            row: { id, value: rowValue, key, description },
            field,
          } = params;
          const { target } = event;
          const isLast = id === headers.length - 1;
          setHeaders((prev) =>
            updateHeader(prev, isLast ? id + 1 : id, {
              value: rowValue,
              key,
              description,
              [field]: (target as HTMLInputElement).value,
            })
          );
        }}
        rowHeight={30}
      />
    </Box>
  );
};

export default HeadersEditor;
