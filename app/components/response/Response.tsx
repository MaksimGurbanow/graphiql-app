import classes from "./response.module.scss";
import JSONPretty from "react-json-pretty";
import JSONPrettyMon from "react-json-pretty/dist/monikai";

export interface ResponseProps {
  data: string;
  status?: number;
  statusText?: string;
}

const Response = ({ data, status, statusText }: ResponseProps) => {
  const statusConverter = () => {
    if (status) {
      if (status >= 200 && status < 300) return classes.ok;
      if (status >= 400 && status < 500) return classes.error;
      if (status >= 500 && status < 600) return classes.error;
    }
    return null;
  };
  return (
    <div className={classes.responseBlock} data-testid="response-block">
      {status && statusText && (
        <div
          className={`${classes.responseStatus} ${statusConverter()}`}
          data-testid="response-status"
        >
          <span data-testid="status-code">{status}</span>
          <span data-testid="status-text">{statusText}</span>
        </div>
      )}
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
    </div>
  );
};
export default Response;
