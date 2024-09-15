import { Button } from "@mui/material";
import { Navigate, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import { IsLogedInContext } from "../../context/loginContext";
import styles from "./history.module.scss";
import { useTranslation } from "react-i18next";

const History = () => {
  const requestArr = localStorage.getItem("history")?.split(",") || [];
  const [isLogedIn] = useContext(IsLogedInContext);
  const { t } = useTranslation();
  const data = !(requestArr === null || requestArr.length === 0);

  const navigate = useNavigate();

  const getType = (string: string) => {
    const parsedString = string.split("/");
    return parsedString[1];
  };

  const getUrl = (string: string) => {
    const parsedString = string.split("/");
    let answer;
    try {
      answer = atob(parsedString[2]);
    } catch {
      answer = "error";
    }
    return answer;
  };

  return (
    <main className={styles.historyContainer}>
      {!isLogedIn && <Navigate to="/" replace={true} />}
      {isLogedIn && (
        <div className={styles.history}>
          <h1 className={styles.historyHeading}>{t("history.history")}</h1>
          {!data && (
            <div>
              <p>{t("history.noRequestsMessage")}</p>
              <div className={styles.historyButtons}>
                <Button onClick={() => navigate("/GET")} variant="outlined">
                  {t("welcome.restClient")}
                </Button>
                <Button onClick={() => navigate("/GRAPHQL")} variant="outlined">
                  {t("welcome.graphiQlClient")}
                </Button>
              </div>
            </div>
          )}
          <div className={styles.historyTable}>
            <div className={styles.requestsTop}>
              <div className={styles.tableNumber}>№</div>
              <div className={styles.tableRequest}>Type</div>
              <div className={styles.tableRequest}>URL</div>
            </div>
            {data &&
              requestArr.map((el: string, i: number) => (
                <div key={i} className={styles.historyRequest}>
                  <div className={styles.historyNumber}>{i + 1}.</div>
                  <div className={styles.tableRequest}>{getType(el)}</div>
                  <button
                    className={styles.historyLink}
                    onClick={() => navigate(`${el}`)}
                  >
                    {getUrl(el)}
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}
    </main>
  );
};

export default History;
