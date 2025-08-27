import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMobilemenu } from "../../lib/hooks/useMobilemenu";
import { useStickyHeader } from "../../lib/hooks/useStickyHeader";
import Logo from "../../assets/alec-img/courses/alec-for-judiciary-removebg-preview.png";
import { toast } from "react-toastify";
import { fetchcategory } from "../../api";
import axios from "axios";
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

export const HeaderNine = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [syllabusCategories, setSyllabusCategories] = useState([]);
  const navigate = useNavigate();

  const api = "https://backend.aashayeinjudiciary.com/social";
  const [socialLinks, setSocialLinks] = useState([]);

  const { routesData, loading: routesLoading } = useSelector(
    (state) => state.routes
  );

  const routeData = routesData.find((route) => route.element === "CourseNew");

  // console.log(routeData?.path, "courseNew");

  const fetchSocialLinks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(api);
      setSocialLinks(response.data.data);
    } catch (error) {
      console.error("Error fetching social links:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSocialLinks();
  }, []);

  const getIconComponent = (iconName) => {
    if (!iconName) return <FaLink style={{ color: "#000000" }} />;

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
      iconMap[iconName.toLowerCase()] || <FaLink style={{ color: "#000000" }} />
    );
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setSelectedCategory(categoryId);

    if (categoryId) {
      navigate(`/coursesone?category=${categoryId}`);
    }
  };

  const fetchSyllabusCategories = async () => {
    const api = "https://backend.aashayeinjudiciary.com/syllabuscategory";

    try {
      const response = await axios.get(api);
      if (response && response.data) {
        setSyllabusCategories(response.data);
      } else {
        toast.error("Failed to fetch syllabus categories");
      }
    } catch (error) {
      console.error("Error fetching syllabus:", error);
      toast.error("Failed to load syllabus categories. Please try again.");
    }
  };

  useEffect(() => {
    fetchSyllabusCategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await fetchcategory();
        if (response.data) {
          setCategories(response.data);
        } else {
          toast.error("No categories found.");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  useMobilemenu();
  useStickyHeader();

  return (
    <header className='td_site_header td_style_1 td_type_2 td_sticky_header td_medium td_heading_color'>
      <div className='td_top_header td_heading_bg td_white_color'>
        {/* ... existing top header code ... */}
      </div>

      <div className='td_main_header'>
        <div className='px-3 px-md-5'>
          <div className='td_main_header_in'>
            <div className='td_main_header_left'>
              <Link className='td_site_branding td_accent_color' to='/'>
                <img
                  id='logo'
                  className='logos'
                  src={Logo}
                  alt='Logo'
                  style={{ width: "200px" }}
                />
              </Link>
            </div>

            <div className='td_main_header_right'>
              <nav className='td_nav'>
                <div className='td_nav_list_wrap'>
                  <div className='td_nav_list_wrap_in'>
                    <ul className='td_nav_list'>
                      <li>
                        <Link to='/'>Home</Link>
                      </li>
                      <li className='menu-item-has-children'>
                        <Link>About</Link>
                        <ul>
                          <li>
                            <Link to='/about-institute'>
                              About the institute
                            </Link>
                          </li>
                          <li>
                            <Link to='/about-director'>About the Director</Link>
                          </li>
                          <li>
                            <Link to='/why-aashayein-judiciary'>
                              Why AASHAYEIN JUDICIARY (ALEC)?
                            </Link>
                          </li>
                          <li>
                            <Link to='/directors-message'>
                              Director's Message
                            </Link>
                          </li>
                          <li>
                            <Link to='/success-stories'>
                              Our Success Stories
                            </Link>
                          </li>
                        </ul>
                      </li>

                      {/* //mai hu yaha  */}
                      <li className='menu-item-has-children'>
                        <Link to='/courses'>Courses</Link>
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
                        </ul>
                      </li>

                      <li>
                        <Link to='/blog'>Blogs</Link>
                      </li>
                      <li>
                        <Link to='/judgements'>Judgements</Link>
                      </li>
                      <li>
                        <Link to='/enquiry'>Enquiry</Link>
                      </li>

                      <li className='menu-item-has-children'>
                        <Link to='#'>Syllabus</Link>
                        <ul>
                          {syllabusCategories &&
                          syllabusCategories.length > 0 ? (
                            syllabusCategories.map((category) => (
                              <li key={category._id}>
                                <Link
                                  to={`/syllabus/${category.staticUrl}`}
                                  state={{ id: category._id }}
                                >
                                  {category.name}
                                </Link>
                              </li>
                            ))
                          ) : (
                            <li>No syllabus categories available</li>
                          )}
                        </ul>
                      </li>

                      <li>
                        <Link to='/contact'>Contact</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>

              <div id='social' className='td_hero_icon_btns position-relative'>
                <div
                  className='td_footer_social_btns'
                  style={{ display: "flex", gap: "4px" }}
                >
                  {socialLinks.map((link, index) => (
                    <a
                      key={index}
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
