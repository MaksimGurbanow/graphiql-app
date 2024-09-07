import { useState, useRef } from "react";
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

const RS_SCHOOL_LOGO_URL: string = RS_SCHOOL_LOGO as unknown as string;
const RS_SCHOOL_URL: string = "https://rs.school/";
const teamMembers = [
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
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement | null>(null);

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
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className={`${styles.teamMember} ${
                isAnimating ? styles.animate : ""
              }`}
            >
              <img
                src={member.photo}
                alt={`Фото ${t(
                  `welcome.${member.name}` as never
                )}`}
                className={styles.teamMemberPhoto}
              />
              <h2>
                {t(`welcome.${member.name}` as never)}
              </h2>
              <h3>
                {t(`welcome.${member.role}` as never)}
              </h3>
              <p>
                {t(`welcome.${member.bio}` as never)}
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
          ))}
        </Swiper>
      ) : (
        <div className={styles.teamSection}>
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className={`${styles.teamMember} ${
                isAnimating ? styles.animate : ""
              }`}
            >
              <img
                src={member.photo}
                alt={`Фото ${t(
                  `welcome.${member.name}` as never
                )}`}
                className={styles.teamMemberPhoto}
              />
              <h2>
                {t(`welcome.${member.name}` as never)}
              </h2>
              <h3>
                {t(`welcome.${member.role}` as never)}
              </h3>
              <p>
                {t(`welcome.${member.bio}` as never)}
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
          ))}
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
