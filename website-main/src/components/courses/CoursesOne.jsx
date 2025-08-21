import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useNavigate } from "react-router-dom";

import { CoursesOneItem } from "./CoursesOneItem";
import courseThumb1 from "../../assets/alec-img/courses/course-1.jpg";
import courseThumb2 from "../../assets/alec-img/courses/up-course.jpg";
import courseThumb3 from "../../assets/alec-img/courses/jh-course.jpg";
import courseThumb4 from "../../assets/alec-img/courses/bihar-course.jpg";
import courseThumb6 from "../../assets/alec-img/courses/rj-course.jpg";
import courseThumb5 from "../../assets/alec-img/courses/uttarakhand-course.jpg";
import { useSelector } from "react-redux";

export const CoursesOne = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          "https://backend.aashayeinjudiciary.com/api/allcourse"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch courses");
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const { routesData } = useSelector((state) => state.routes);

  const { path } = routesData.find((route) => route.element === "CouresesFull");

  const handleCourseClick = (courseId) => {
    navigate(`${path}`, { state: { id: courseId } });
  };

  // Fallback images in case API data doesn't include images
  const images = [
    courseThumb1,
    courseThumb2,
    courseThumb3,
    courseThumb4,
    courseThumb5,
    courseThumb6,
  ];

  if (loading) {
    return <div className='text-center py-5'>Loading courses...</div>;
  }

  if (error) {
    return <div className='text-center py-5 text-danger'>Error: {error}</div>;
  }

  return (
    <section style={{ backgroundColor: "#f8f9fa" }} className='back-cover'>
      <div className='td_height_20 td_height_lg_20' />
      <div className='px-2 px-md-5'>
        {/* Header */}
        <div className='td_section_heading td_style_1 text-center'>
          <h4 className='td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_5 text-uppercase td_accent_color'>
            Popular Judiciary Courses
          </h4>
          <p className='td_section_title td_fs_20 mb-0'>Top-rated courses designed to prepare you for Civil Judge & Judiciary Exams with confidence.
</p>

        </div>
        <div className='td_height_30 td_height_lg_30' />

        {/* Swiper Carousel */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          spaceBetween={20}
          slidesPerView={3}
          navigation={{ clickable: true }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          loop={true}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className='course-slider'
        >
          {courses.map((course, idx) => (
            <SwiperSlide key={course._id || idx}>
              <div
                className='course-item'
                onClick={() => handleCourseClick(course._id)}
                style={{ cursor: "pointer" }}
              >
                <CoursesOneItem
                  // src={images[idx % images.length]}
                  src={
                    Array.isArray(course.images)
                      ? course.images[0]
                      : course.images
                  }
                  seats={course.Price || 100}
                  alt={course.Alttage}
                  semesters={course.Durations || 12}
                  subtitle={course?.category?.name}
                  title={course.Coursename || "Judiciary Examination"}
                  description={
                    course.TrainerName ||
                    "A competitive exam for Civil Judge recruitment."
                  }
                  totalRatings={course.Review || 5}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className='td_height_20 td_height_lg_20' />
    </section>
  );
};

export default CoursesOne;
