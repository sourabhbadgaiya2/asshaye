import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import footerLogo from "../../assets/img/alec-for-judiciary.png";
import { fetchcategory } from "../../api";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaPinterest,
  FaTiktok,
  FaWhatsapp,
  FaTelegram,
  FaGithub,
  FaReddit,
  FaDiscord,
  FaTwitch,
  FaSnapchat,
  FaLink,
} from "react-icons/fa";
import { useSelector } from "react-redux";

export const FooterOne = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [socialLinks, setSocialLinks] = useState([]);
  const [playstoreLinks, setPlaystoreLinks] = useState([]);
  const navigate = useNavigate();

  const { routesData, loading: routesLoading } = useSelector(
    (state) => state.routes
  );

  // sbsbsbsbsbssb

  const routeData = routesData.find((route) => route.element === "CourseNew");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const categoriesResponse = await fetchcategory();
        if (categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }

        const socialResponse = await axios.get(
          "https://asshaye.onrender.com/social"
        );
        setSocialLinks(socialResponse.data.data);

        const playstoreResponse = await axios.get(
          "https://asshaye.onrender.com/playstore/alldisplay"
        );
        setPlaystoreLinks(playstoreResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLinkClick = (path) => {
    scrollToTop();
    navigate(path);
  };

  const getIconComponent = (iconName) => {
    const iconMap = {
      facebook: <FaFacebook style={{ color: "#1877F2" }} />,
      twitter: <FaTwitter style={{ color: "#1DA1F2" }} />,
      instagram: <FaInstagram style={{ color: "#E1306C" }} />,
      linkedin: <FaLinkedin style={{ color: "#0077B5" }} />,
      youtube: <FaYoutube style={{ color: "#FF0000" }} />,
      pinterest: <FaPinterest style={{ color: "#E60023" }} />,
      tiktok: <FaTiktok style={{ color: "#000000" }} />,
      whatsapp: <FaWhatsapp style={{ color: "#25D366" }} />,
      telegram: <FaTelegram style={{ color: "#0088CC" }} />,
      github: <FaGithub style={{ color: "#000000" }} />,
      reddit: <FaReddit style={{ color: "#FF5700" }} />,
      discord: <FaDiscord style={{ color: "#7289DA" }} />,
      twitch: <FaTwitch style={{ color: "#9146FF" }} />,
      snapchat: <FaSnapchat style={{ color: "#FFFC00" }} />,
    };

    return (
      iconMap[iconName?.toLowerCase()] || (
        <FaLink style={{ color: "#000000" }} />
      )
    );
  };

  return (
    <footer style={{ marginTop: "20px" }} className='td_footer td_style_1'>
      <div className='container'>
        <div className='td_footer_row'>
          {/* About Widget */}
          <div className='td_footer_col'>
            <div className='td_footer_widget'>
              <div className='td_footer_text_widget td_fs_18'>
                <img src={footerLogo} alt='Logo' />
                <p>
                  About Aashayein Judiciary: In today's increasingly complex
                  legal landscape, the demand for more judges and law officers
                  has never been greater.....
                </p>
              </div>
              <ul className='td_footer_address_widget td_medium td_mp_0'>
                <li>
                  <i className='fa-solid fa-phone-volume'></i>
                  <a href='tel:+919691073595'> +91 9691073595</a>
                </li>
                <li>
                  <i className='fa-solid fa-location-dot'></i>
                  3rd Floor, Radhika Heights, 284, in front of APT House,
                  Zone-II,
                  <br />
                  Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462011
                </li>
              </ul>
            </div>
          </div>

          {/* Useful Links */}
          <div className='td_footer_col'>
            <div className='td_footer_widget'>
              <h4 className='td_footer_widget_title td_fs_20 td_white_color td_medium td_mb_30'>
                Useful Links
              </h4>
              <ul className='td_footer_widget_menu '>
                <a
                  className='dropdown-item mb-2'
                  onClick={() => handleLinkClick("/")}
                >
                  Home
                </a>
                <a
                  className='dropdown-item mb-2'
                  onClick={() => handleLinkClick("/about")}
                >
                  About
                </a>
                {/* <a className='dropdown-item mb-2' onClick={() => handleLinkClick("/courses-grid-view")}>Courses</a> */}
                <a
                  className='dropdown-item mb-2'
                  onClick={() => handleLinkClick("/blog")}
                >
                  Blogs
                </a>
                <a
                  className='dropdown-item mb-2'
                  onClick={() => handleLinkClick("/judgements")}
                >
                  Judgement
                </a>
                <a
                  className='dropdown-item mb-2'
                  onClick={() => handleLinkClick("/contact")}
                >
                  Contact
                </a>
                <a
                  className='dropdown-item mb-2'
                  onClick={() => handleLinkClick("/refund")}
                >
                  Refund
                </a>
                <a
                  className='dropdown-item mb-2'
                  onClick={() => handleLinkClick("/help")}
                >
                  Help Center
                </a>
                <a
                  className='dropdown-item mb-2'
                  onClick={() => handleLinkClick("/privacy")}
                >
                  Privacy Policy
                </a>
              </ul>
            </div>
          </div>

          {/* Courses */}
          <div className='td_footer_col td_footer_widget_menu'>
            <div className='td_footer_widget'>
              <h4 className='td_footer_widget_title td_fs_20 td_white_color td_medium td_mb_30'>
                Courses
              </h4>
              <li className='menu-item-has-children'>
                <ul className='custom-dropdown'>
                  {categories.map((category) => (
                    <li key={category._id}>
                      <Link
                        to={`${routeData?.path}`}
                        state={{
                          id: category._id,
                          name: category.name,
                        }}
                        className='dropdown-item'
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                  <a
                    className='dropdown-item'
                    onClick={() => handleLinkClick("/otherCourse")}
                  >
                    Other course
                  </a>
                </ul>
              </li>
            </div>
          </div>

          {/* Newsletter & Socials */}
          <div className='td_footer_col'>
            <div className='td_footer_widget'>
              <h4 className='td_footer_widget_title td_fs_20 td_white_color td_medium td_mb_30'>
                Subscribe Now
              </h4>
              <div className='td_newsletter td_style_1'>
                <p className='td_mb_20 td_opacity_7'>
                  Far far away, behind the word mountains, far from the
                  Consonantia.
                </p>
                <form action='#' className='td_newsletter_form'>
                  <input
                    type='email'
                    className='td_newsletter_input'
                    placeholder='Email address'
                  />
                  <button
                    type='submit'
                    className='td_btn td_style_1 td_radius_30 td_medium'
                  >
                    <span className='td_btn_in td_white_color td_accent_bg'>
                      <span>Subscribe</span>
                    </span>
                  </button>
                </form>
              </div>

              <div
                id='social'
                className='td_hero_icon_btns position-relative mt-3'
              >
                <div
                  className='td_footer_social_btns'
                  style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
                >
                  {socialLinks.map((link) => (
                    <a
                      key={link._id}
                      href={link.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='td_center'
                      style={{
                        fontSize: "20px",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "32px",
                        height: "32px",
                        transition: "transform 0.2s",
                        borderRadius: "50%",
                      }}
                      title={link.altText}
                    >
                      {getIconComponent(link.icon)}
                    </a>
                  ))}
                </div>
              </div>

              {/* App Download Section */}
              <div className='td_footer_app_links td_mt_40 td_center mt-4'>
                <div
                  className='td_app_buttons'
                  style={{
                    display: "flex",
                    gap: "15px",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  }}
                >
                  {playstoreLinks?.map((link) => (
                    <a
                      key={link._id}
                      href={link.URL}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <img
                        src={link.images}
                        alt={link.altText || "Download on Play Store"}
                        style={{ height: "40px" }}
                        loading='lazy'
                      />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className='td_footer_bottom td_fs_18'>
        <div className='container'>
          <div className='td_footer_bottom_in'>
            <p className='td_copyright mb-0'>
              Copyright ©Aashyein judiciary | All Right Reserved
            </p>
            <ul className='td_footer_widget_menu'>
              <li onClick={() => handleLinkClick("/terms")}>
                Terms & Conditions
              </li>
              <li onClick={() => handleLinkClick("/privacy")}>
                Privacy & Policy
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
