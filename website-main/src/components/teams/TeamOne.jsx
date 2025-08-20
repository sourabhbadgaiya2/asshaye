import React, { useState, useEffect } from "react";
import { useHobble } from "../../lib/hooks/useHobble";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import axios from "axios";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import teamShape1 from "../../assets/img/home_2/team_shape_1.svg";
import teamShape2 from "../../assets/img/home_2/team_shape_2.svg";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const TeamOne = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const apiUrl = "https://backend.aashayeinjudiciary.com/member/display";

  useHobble();

  const { routesData, loading: routesLoading } = useSelector(
    (state) => state.routes
  );

  const { path } = routesData.find(
    (route) => route.element === "TeamMemberDetails"
  );

  const handleMember = (id) => {
    return () => {
      navigate(`/team-member-details/${id}`);
    };
  };

  // console.log(path, "team route");

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(apiUrl);
        setMembers(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to fetch team members");
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  return (
    <section
      style={{ backgroundColor: "#f8f9fa" }}
      className='td_shape_section_8 td_hobble'
    >
      <div className='td_shape_position_1 position-absolute td_hover_layer_3'>
        <img src={teamShape1} alt='Team shape 1' />
      </div>
      <div className='td_shape_position_2 position-absolute td_hover_layer_3'>
        <img src={teamShape2} alt='Team shape 2' />
      </div>

      <div className='td_height_60 td_height_lg_75' />

      <div className='container'>
        <div
          className='td_section_heading td_style_1 text-center wow fadeInUp'
          data-wow-duration='1s'
          data-wow-delay='0.2s'
        >

             <h4 className='td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_5 text-uppercase td_accent_color'>
            Our Judiciary Mentors
          </h4>
       <p className='td_section_title text-center td_fs_20 mb-4'>Meet the dedicated mentors shaping future judges through quality training.

    </p>

        </div>
        <div className='td_height_50 td_height_lg_50' />

        {/* Swiper Slider */}
        {loading ? (
          <div className='text-center'>Loading team members...</div>
        ) : error ? (
          <div className='text-center text-danger'>
            Error loading team members
          </div>
        ) : (
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Navigation, Pagination, Autoplay]}
            className='mySwiper'
          >
            {members.map((member, idx) => (
              <SwiperSlide key={member._id || idx}>
                <Link to={`${path}`} state={member._id}>
                  <div
                    className='td_team td_style_1 text-center position-relative cursor:pointer'
                    // onClick={handleMember(member._id)}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={
                        Array.isArray(member.images)
                          ? member.images[0]
                          : member.images
                      }
                      alt={member.altText}
                      className='h-50 td_radius_10'
                    />
                    <div className='td_team_info td_white_bg'>
                      <h3 className='td_team_member_title td_fs_18 td_semibold mb-0'>
                        {member.Membername}
                      </h3>
                      <p className='td_team_member_designation mb-0 td_fs_14 td_opacity_7 td_heading_color'>
                        {member.Teamposition}
                      </p>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <div className='td_height_60 td_height_lg_60' />
    </section>
  );
};
