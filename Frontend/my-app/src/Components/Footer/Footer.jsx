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
          <a href=""><FaInstagram /></a>
          <a href="https://www.linkedin.com/in/revathi-salapu-083712301/"><FaLinkedin /></a>
          <a href="https://github.com/Revathi1411/ItemNeraBy-Web-App.git" ><IoLogoGithub /></a>
          <a href=""><FaTwitter /></a>
        </div>
      </div>

      <div className="footer-bottom">
  © {new Date().getFullYear()} NearByItem. All rights reserved.
  <br />
  Made by Revathi Salapu
</div>

    </footer>
  );
}

export default Footer;
