import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import videoThumb from "../assets/img/others/video_thumb.jpg";
import axios from "axios";
import { useTabs } from "../lib/hooks/useTabs";
import { VideoPlayer } from "../components/videos/VideoPlayer";
import { Layout } from "../layouts/Layout";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export const Maintestseries = ({ courseId }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const isPreTestActive = location.pathname === `/pretestseries/${courseId}`;
  const isMainTestActive = location.pathname === `/maintestseries/${courseId}`;

  const baseClasses = "td_btn td_style_1 td_radius_10 td_medium";
  const activeClasses = "td_white_bg td_accent_color";
  const inactiveClasses = "td_white_color td_accent_bg";

  useTabs();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:8000/main/maintestseries/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Layout header={9}>
        <section>
          <div
            className='td_height_10 td_height_lg_80'
            style={{ marginTop: "320px" }}
          />
          <div className='container'>
            {product.length === 0 ? (
              <div className='row td_gap_y_50'>
                {/* Content Section */}
                <div className='col-lg-8'>
                  <div className='td_course_details'>
                    <h2 className='td_fs_48 td_mb_30'>
                      Starting Reputed Education & Build your Skills
                    </h2>

                    <div
                      className='td_card_btn mt-2 mb-3'
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "12px",
                        flexWrap: "wrap",
                        marginTop: "10px",
                      }}
                    >
                      <div className='flex gap-4'>
                        <Link
                          to={`/pretestseries/${id}`}
                          className={baseClasses}
                        >
                          <span
                            className={`td_btn_in ${
                              isPreTestActive ? activeClasses : inactiveClasses
                            }`}
                          >
                            <span>Pre Test Series</span>
                          </span>
                        </Link>
                      </div>
                      <Link
                        to={`/enroll/${courseId}`}
                        className='td_btn td_style_1 td_radius_10 td_medium'
                      >
                        <span className='td_btn_in td_white_color td_accent_bg'>
                          <span>Enroll Now</span>
                        </span>
                      </Link>
                    </div>
                    <div className='td_tabs td_style_1 td_mb_50'>
                      <div className='td_tab_body td_fs_18'>
                        <div className='td_tab active' id='td_tab_1'>
                          <p className='mb-0'>No main test found</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sidebar Section */}
                <div className='col-lg-4 mt-5'>
                  <div className='td_card td_style_7'>
                    <div className='td_height_30 td_height_lg_30' />
                    <Link
                      to='/cart'
                      className='td_btn td_style_1 td_radius_10 td_medium w-100'
                    >
                      <span className='td_btn_in td_white_color td_accent_bg'>
                        <span>Buy Now</span>
                      </span>
                    </Link>
                    <div className='td_height_40 td_height_lg_30' />
                    <h3 className='td_fs_20 td_semibold td_mb_15'>Share On:</h3>
                    <div className='td_footer_social_btns td_fs_18 td_accent_color'>
                      <Link to='#' className='td_center'>
                        <i className='fa-brands fa-facebook-f'></i>
                      </Link>
                      <Link to='#' className='td_center'>
                        <i className='fa-brands fa-x-twitter'></i>
                      </Link>
                      <Link to='#' className='td_center'>
                        <i className='fa-brands fa-instagram'></i>
                      </Link>
                      <Link to='#' className='td_center'>
                        <i className='fa-brands fa-pinterest-p'></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              product.map((item, idx) => (
                <div className='row td_gap_y_50' key={idx}>
                  {/* Content Section */}
                  <div className='col-lg-8'>
                    <div className='td_course_details'>
                      {/* Image Carousel Section */}
                      {item.images && item.images.length > 0 && (
                        <div className='mb-4'>
                          <Carousel
                            indicators={item.images.length > 1}
                            controls={item.images.length > 1}
                          >
                            {item.images.map((image, index) => (
                              <Carousel.Item key={index}>
                                <div
                                  className='d-block w-100'
                                  style={{
                                    height: "400px",
                                    backgroundImage: `url(${image})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    borderRadius: "10px",
                                  }}
                                />
                              </Carousel.Item>
                            ))}
                          </Carousel>
                        </div>
                      )}

                      <h2 className='td_fs_48 td_mb_30'>
                        Starting Reputed Education & Build your Skills
                      </h2>
                      <div
                        className='td_card_btn mt-2 mb-3'
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "12px",
                          flexWrap: "wrap",
                          marginTop: "10px",
                        }}
                      >
                        <div className='flex gap-4'>
                          <Link
                            to={`/pretestseries/${id}`}
                            className={baseClasses}
                          >
                            <span
                              className={`td_btn_in ${
                                isPreTestActive
                                  ? activeClasses
                                  : inactiveClasses
                              }`}
                            >
                              <span>Pre Test Series</span>
                            </span>
                          </Link>
                        </div>
                        <Link
                          to={`/enroll/${id}`}
                          className='td_btn td_style_1 td_radius_10 td_medium'
                        >
                          <span className='td_btn_in td_white_color td_accent_bg'>
                            <span>Enroll Now</span>
                          </span>
                        </Link>

                        <Link
                          to='/get-offer'
                          className='td_btn td_radius_10 td_medium'
                          style={{
                            border: "2px solid #ff5722",
                            color: "#ff5722",
                            backgroundColor: "#fff",
                            padding: "10px 20px",
                            textAlign: "center",
                            display: "inline-block",
                            transition: "all 0.3s ease",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#ff5722";
                            e.currentTarget.style.color = "#fff";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "#fff";
                            e.currentTarget.style.color = "#ff5722";
                          }}
                        >
                          Pre Mentor
                        </Link>
                      </div>
                      <div className='td_tabs td_style_1 td_mb_50'>
                        <ul className='td_tab_links td_style_2 td_type_2 td_mp_0 td_medium td_fs_20 td_heading_color'>
                          <li className='active'>
                            <a href='#td_tab_1'>Overview</a>
                          </li>
                          <li>
                            <a href='#td_tab_2'>Curriculum</a>
                          </li>
                          <li>
                            <a href='#td_tab_3'>Instructor</a>
                          </li>
                          <li>
                            <a href='#td_tab_4'>Reviews</a>
                          </li>
                        </ul>
                        <div className='td_tab_body td_fs_18'>
                          <div className='td_tab active' id='td_tab_1'>
                            <h2 className='td_fs_48 td_mb_20'>
                              Main test series
                            </h2>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  item.CourseDescription ||
                                  "No description available",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <h2 className='td_fs_48 td_mb_30'>
                        What you'll Learn it?
                      </h2>
                      <ul className='td_list td_style_2 td_type_2 td_fs_18 td_medium td_heading_color td_mp_0'>
                        <li>100% Better results</li>
                        <li>Building a Bright Future Together</li>
                        <li>Budget Friendly Education Theme</li>
                        <li>Empowering Children Through Education</li>
                        <li>Unlocking Potential Educations</li>
                        <li>Growing Genius Elementary School</li>
                      </ul>
                      <div className='td_height_60 td_height_lg_40' />
                      <h4 className='td_fs_24 td_semibold td_mb_20'>
                        Requirements
                      </h4>
                      <div className='td_requirements_list td_medium td_fs_18'>
                        <span className='td_requirement'>
                          Computer/ Mobiles
                        </span>
                        <span className='td_requirement'>Paper/ Pencil</span>
                        <span className='td_requirement'>
                          Internets Connect
                        </span>
                      </div>
                    </div>
                  </div>
                  {/* Sidebar Section */}
                  <div className='col-lg-4 mt-5'>
                    <div className='td_card td_style_7'>
                      {item.images && item.images.length > 0 ? (
                        <img
                          src={item.images[0]}
                          alt='Course thumbnail'
                          className='w-100'
                          style={{
                            height: "200px",
                            objectFit: "cover",
                            borderRadius: "10px 10px 0 0",
                          }}
                        />
                      ) : (
                        <VideoPlayer
                          trigger={
                            <a
                              href=''
                              className='td_card_video_block td_video_open d-block'
                            >
                              <img src={videoThumb} alt='Video thumbnail' />
                              <span className='td_player_btn_wrap_2'>
                                <span className='td_player_btn td_center'>
                                  <span></span>
                                </span>
                              </span>
                            </a>
                          }
                        />
                      )}
                      <div className='td_height_30 td_height_lg_30' />
                      <h3 className='td_fs_20 td_semibold td_mb_15'>
                        Courses Includes:
                      </h3>
                      <ul className='td_card_list td_mp_0 td_fs_18 td_medium'>
                        <li>
                          <span>Price:</span>
                          <span className='td_semibold td_accent_color'>
                            {item.Price || "N/A"}
                          </span>
                        </li>
                        <li>
                          <span>Durations:</span>
                          <span className='td_semibold td_accent_color'>
                            {item.Durations || "N/A"}
                          </span>
                        </li>
                      </ul>
                      <div className='td_height_30 td_height_lg_30' />
                      <Link
                        to='/cart'
                        className='td_btn td_style_1 td_radius_10 td_medium w-100'
                      >
                        <span className='td_btn_in td_white_color td_accent_bg'>
                          <span>Buy Now</span>
                        </span>
                      </Link>
                      <div className='td_height_40 td_height_lg_30' />
                      <h3 className='td_fs_20 td_semibold td_mb_15'>
                        Share On:
                      </h3>
                      <div className='td_footer_social_btns td_fs_18 td_accent_color'>
                        <Link to='#' className='td_center'>
                          <i className='fa-brands fa-facebook-f'></i>
                        </Link>
                        <Link to='#' className='td_center'>
                          <i className='fa-brands fa-x-twitter'></i>
                        </Link>
                        <Link to='#' className='td_center'>
                          <i className='fa-brands fa-instagram'></i>
                        </Link>
                        <Link to='#' className='td_center'>
                          <i className='fa-brands fa-pinterest-p'></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </Layout>
    </>
  );
};
