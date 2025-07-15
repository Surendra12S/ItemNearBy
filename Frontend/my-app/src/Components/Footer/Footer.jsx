import "./Footer.css";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h1>NearByItem</h1>
          <p>Helping you find items in nearby shops easily.</p>
        </div>

        <div className="footer-links">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>

        <div className="footer-socials">
          <a href="https://www.instagram.com/recharge3680/"><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/dasari-surendra"><FaLinkedin /></a>
          <a href="https://github.com/Surendra12S" ><IoLogoGithub /></a>
          <a href="https://x.com/xyyamie?t=KzEwsyB35vzRr17PMRBREA&s=08"><FaTwitter /></a>
        </div>
      </div>

      <div className="footer-bottom">
  © {new Date().getFullYear()} NearByItem. All rights reserved.
  <br />
  Made by Surendra Dasari
</div>

    </footer>
  );
}

export default Footer;
