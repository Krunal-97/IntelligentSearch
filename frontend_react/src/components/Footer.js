import React from "react";
import "../styles/footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer_container">
        <div className="footer_coloumn">
          <h3>About Us</h3>
          <a href="#">Aim</a>
          <a href="#">Vision</a>
          <a href="#">Testimonials</a>
        </div>
        <div className="footer_coloumn">
          <h3>Services</h3>
          <a href="#">For Organization</a>
          <a href="#">General User</a>
        </div>
        <div className="footer_coloumn">
          <h3>Social Media</h3>
          <a href="#" className="footer_social">
            <i class="fa-brands fa-google-plus-square"></i>
            <span>Google</span>
          </a>
          <a href="#" className="footer_social">
            <i class="fa-brands fa-facebook-square"></i>
            <span>Facebook</span>
          </a>
          <a href="#" className="footer_social">
            <i class="fa-brands fa-twitter-square"></i>
            <span>Twitter</span>
          </a>
          <a href="#" className="footer_social">
            <i class="fa-brands fa-instagram"></i>
            <span>Instagram</span>
          </a>
        </div>
      </div>

      <div className="footer_bottom">
        <span>@ 2022 IntelligentSearch | Made with ❤️</span>
      </div>
    </div>
  );
}

export default Footer;
