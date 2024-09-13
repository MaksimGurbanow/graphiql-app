import { Button } from "@mui/material";
import { Navigate, useNavigate } from "@remix-run/react";
import { useContext } from "react";
import { IsLogedInContext } from "~/context/loginContext";
import styles from "./history.module.scss";
import { useTranslation } from "react-i18next";

const History = () => {
  const requestArr = localStorage.getItem("history")?.split(",") || [];
  const [isLogedIn] = useContext(IsLogedInContext);
  const { t } = useTranslation();
  const data = !(requestArr === null || requestArr.length === 0);

  const navigate = useNavigate();

  console.log(requestArr);

  return (
    <main className={styles.historyContainer}>
      {!isLogedIn && <Navigate to="/" replace={true} />}
      {isLogedIn && (
        <div className={styles.history}>
          <h1 className={styles.historyHeading}>{t("history.history")}</h1>
          {!data && (
            <div>
              <p>
                You haven&apos;t executed any requests. It&apos;s empty here.
                Try:
              </p>
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
          {data &&
            requestArr.map((el: string, i: number) => (
              <button
                className={styles.historyLink}
                key={i}
                onClick={() => navigate(`${el}`)}
              >
                {el}
              </button>
            ))}
        </div>
      )}
    </main>
  );
};

export default History;
