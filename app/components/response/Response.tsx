import "./response.scss";
import { useTranslation } from "react-i18next";

const Response = () => {
  const { t } = useTranslation();

  return <div>{t("response.title")}</div>;
};

export default Response;
