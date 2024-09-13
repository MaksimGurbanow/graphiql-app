import { useState, useRef, useContext } from "react";
import AudioPlayer from "../../components/audio-player/AudioPlayer";
import RS_SCHOOL_LOGO from "../../assets/icons_and_logos/rs_school.svg";
import EP_PHOTO from "../../assets/photoes/EP.jpg";
import MG_PHOTO from "../../assets/photoes/MG.png";
import DN_PHOTO from "../../assets/photoes/DN.jpg";
import styles from "./Welcome.module.scss";
import Swiper from "../swiper/Swiper";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import useResizeObserver from "@react-hook/resize-observer";
import trackSrc from "../../assets/audio/Track.mp3";
import { useNavigate } from "@remix-run/react";
import { IsLogedInContext } from "../../context/loginContext";
import { auth } from "../../../lib/firebase.config";

const RS_SCHOOL_LOGO_URL: string = RS_SCHOOL_LOGO as unknown as string;
const RS_SCHOOL_URL: string = "https://rs.school/";

const teamMembers: {
  name: "maksimName" | "egorName" | "dmitryName";
  role: "teamLead" | "frontendDeveloper";
  bio: "maksimBio" | "egorBio" | "dmitryBio";
  photo: string;
  github: string;
}[] = [
  {
    name: "maksimName",
    role: "teamLead",
    bio: "maksimBio",
    photo: MG_PHOTO as string,
    github: "https://github.com/MaksimGurbanow",
  },
  {
    name: "egorName",
    role: "frontendDeveloper",
    bio: "egorBio",
    photo: EP_PHOTO as string,
    github: "https://github.com/predsedatel228",
  },
  {
    name: "dmitryName",
    role: "frontendDeveloper",
    bio: "dmitryBio",
    photo: DN_PHOTO as string,
    github: "https://github.com/Grammeri",
  },
];

const Welcome = () => {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);
  const [isLogin] = useContext(IsLogedInContext);
  const user = auth.currentUser;

  useResizeObserver(ref, (entry) => {
    setIsMobileView(entry.contentRect.width <= 768);
  });

  const handlePlay = () => {
    setIsAnimating(true);
  };

  const handlePause = () => {
    setIsAnimating(false);
  };

  return (
    <div className={styles.aboutUsContainer} ref={ref}>
      {isLogin && (
        <div>
          <h2 className={styles.welcomeGreetings}>{`${t(
            "welcome.welcomeBack"
          )} ${user?.email}!`}</h2>
          <div className={styles.welcomeButtonContainer}>
            <Button onClick={() => navigate("/GET")} variant="outlined">
              {t("welcome.restClient")}
            </Button>
            <Button onClick={() => navigate("/GRAPHQL")} variant="outlined">
              {t("welcome.graphiQlClient")}
            </Button>
            <Button onClick={() => navigate("/history")} variant="outlined">
              {t("welcome.history")}
            </Button>
          </div>
        </div>
      )}
      {!isLogin && (
        <div>
          <h2>{t("welcome.welcome")}</h2>
          <div className={styles.welcomeButtonContainer}>
            <Button onClick={() => navigate("/login")} variant="outlined">
              {t("form.signIn")}
            </Button>
            <Button
              onClick={() => navigate("/registration")}
              variant="outlined"
            >
              {t("form.signUp")}
            </Button>
          </div>
        </div>
      )}
      <h1
        className={`${styles.welcomeTitle} ${
          isAnimating ? styles.animate : ""
        }`}
      >
        {t("welcome.reactGroup")}
      </h1>
      <div className={styles.audioBlock}>
        <div>
          <h2 className={styles.audioHeading}>
            {t("welcome.prepareTogether")}
          </h2>
          <div className={styles.audioPlayerContainer}>
            <AudioPlayer
              src={trackSrc as string}
              onPlay={handlePlay}
              onPause={handlePause}
            />
          </div>
        </div>
      </div>

      {isMobileView ? (
        <Swiper>
          {teamMembers.map((member) => {
            const bio = t(`welcome.${member.bio}`);
            const splitPhrase =
              i18n.language === "ru"
                ? "Вклад в проект:"
                : "Contribution to the project:";
            const [mainPart, contribution] = bio.split(splitPhrase);

            return (
              <div
                key={member.name}
                className={`${styles.teamMember} ${
                  isAnimating ? styles.animate : ""
                }`}
              >
                <img
                  src={member.photo}
                  alt={`Фото ${t(`welcome.${member.name}`)}`}
                  className={styles.teamMemberPhoto}
                />
                <h2>{t(`welcome.${member.name}`)}</h2>
                <h3>{t(`welcome.${member.role}`)}</h3>
                <p>
                  {mainPart}
                  <span style={{ fontWeight: "bold" }}>{splitPhrase}</span>
                  {contribution}
                </p>
                <div>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ textTransform: "none" }}
                    >
                      {t("welcome.githubProfile")}
                    </Button>
                  </a>
                </div>
              </div>
            );
          })}
        </Swiper>
      ) : (
        <div className={styles.teamSection}>
          {teamMembers.map((member) => {
            const bio = t(`welcome.${member.bio}`);
            const splitPhrase =
              i18n.language === "ru"
                ? "Вклад в проект:"
                : "Contribution to the project:";
            const [mainPart, contribution] = bio.split(splitPhrase);

            return (
              <div
                key={member.name}
                className={`${styles.teamMember} ${
                  isAnimating ? styles.animate : ""
                }`}
              >
                <img
                  src={member.photo}
                  alt={`Фото ${t(`welcome.${member.name}`)}`}
                  className={styles.teamMemberPhoto}
                />
                <h2>{t(`welcome.${member.name}`)}</h2>
                <h3>{t(`welcome.${member.role}`)}</h3>
                <p>
                  {mainPart}
                  <span style={{ fontWeight: "bold" }}>{splitPhrase}</span>
                  {contribution}
                </p>
                <div>
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ textTransform: "none" }}
                    >
                      {t("welcome.githubProfile")}
                    </Button>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <div className={styles.bottomTextAndLogo}>
        <p className={styles.schoolInfo}>{t("welcome.studentInfo")}</p>
        <div className={styles.rsSchoolLogo}>
          <a href={RS_SCHOOL_URL} target="_blank" rel="noopener noreferrer">
            <img src={RS_SCHOOL_LOGO_URL} alt="RS School Logo" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
