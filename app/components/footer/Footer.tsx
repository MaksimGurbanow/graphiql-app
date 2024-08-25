import "./footer.scss";
import rsLogo from "../../assets/rss-logo.svg";
import gitHubLogo from "../../assets/github-logo.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__github-container">
        <a href="https://github.com/maksimgurbanow">
          <img
            src={gitHubLogo}
            alt="Github logo"
            className="footer__github-logo"
          />
        </a>
        <a href="https://github.com/grammeri">
          <img
            src={gitHubLogo}
            alt="Github logo"
            className="footer__github-logo"
          />
        </a>
        <a href="https://github.com/predsedatel228">
          <img
            src={gitHubLogo}
            alt="Github logo"
            className="footer__github-logo"
          />
        </a>
      </div>
      <span className="footer__year">2024</span>
      <a href="https://rs.school">
        <img src={rsLogo} alt="RS school logo" className="footer__rs-logo" />
      </a>
    </footer>
  );
};

export default Footer;
