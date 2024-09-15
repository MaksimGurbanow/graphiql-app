import { Box, Button, Container, Typography } from "@mui/material";
import classes from "./tableEditor.module.scss";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { IRow } from "../../types/types";
import { formatValue } from "../../utils/defineTypedKey";
import { useEffect } from "react";
import { defaultKeyValuePair } from "../../../lib/constants";
import { useTranslation } from "react-i18next";

export interface TableEditorProps {
  rows: IRow[];
  setRows: (isLast: boolean, id?: number, row?: IRow) => void;
  headerText: string;
  onValueChange?: (v: string) => void;
}

const TableEditor = ({ rows = [], setRows, headerText }: TableEditorProps) => {
  const { t } = useTranslation();

  const columns: GridColDef[] = [
    {
      field: "key",
      headerName: t("tableEditor.key"),
      headerAlign: "center",
      flex: 1,
      editable: true,
    },
    {
      field: "value",
      headerName: t("tableEditor.value"),
      headerAlign: "center",
      flex: 1,
      editable: true,
    },
  ];

  useEffect(() => {
    if (!rows.length) setRows(true, rows.length, { ...defaultKeyValuePair });
  }, [rows, setRows]);

  return (
    <Box className={classes.headersEditor}>
      <Container
        sx={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <Typography variant="h6">{headerText}</Typography>
        <Button
          variant="contained"
          onClick={() => setRows(true, rows.length, { key: "", value: "" })}
        >
          {t("tableEditor.addValue")}
        </Button>
      </Container>
      <DataGrid
        rows={rows.map((row, index) => ({ ...row, id: index }))}
        hideFooter
        columns={columns}
        onCellKeyDown={(params, event) => {
          const {
            row: { id, value: rowValue, key },
            field,
          } = params;
          const { target, key: typedKey } = event;
          if (["Control", "Enter"].includes(typedKey)) return;
          const isLast = id === rows.length - 1;
          setRows(isLast, id, {
            value: rowValue,
            key,
            [field]: formatValue((target as HTMLInputElement).value, typedKey),
          });
        }}
        rowHeight={30}
      />
    </Box>
  );
};

export default TableEditor;
