import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Slider from "react-slick";
import { Card } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

const OtherCoursesSlider = () => {
  const [courses, setCourses] = useState([]);
  // const [courses, setcourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { routesData } = useSelector((state) => state.routes);

  const { path } = routesData.find((route) => route.element === "OtherCourse");

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8000/othercourse");
      if (response.data) {
        setCourses(response.data);
        // Filter out the current course and get other courses from the same subcategory
        const filtered = response.data.filter(
          (course) =>
            course._id !== id &&
            course.subCategory?._id ===
              response.data.find((c) => c._id === id)?.subCategory?._id
        );
        // setcourses(filtered);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      // toast.error("Failed to load courses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [id]);

  const getImageUrl = (course) => {
    if (Array.isArray(course.images) && course.images.length > 0) {
      return course.images[0];
    }
    if (typeof course.images === "string") {
      return course.images;
    }
    return "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGF3fGVufDB8fDB8fHww";
  };

  const sliderSettings = {
    dots: false,
    infinite: courses.length > 3, // agar kam items ho to infinite mat chalao
    speed: 500,
    slidesToShow: Math.min(courses.length, 3), // jitne items hai utne hi dikhaye
    slidesToScroll: 1,
    autoplay: courses.length > 1, // ek hi item ho to autoplay off
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: Math.min(courses.length, 2),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  if (loading) {
    return <div className='text-center py-5'>Loading courses...</div>;
  }

  return (
    <div className='mt-5 mb-5'>
      <h4 className='td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_5 text-uppercase td_accent_color'>
        Other Courses
      </h4>
      {/* <h3 className='mb-4'></h3> */}
      {courses.length > 0 ? (
        <Slider {...sliderSettings}>
          {courses.map((course) => (
            <div key={course._id} className='px-2'>
              <Card className='h-100 cursor-pointer shadow-sm'>
                <Link to={`${path}`} state={course._id}>
                  <div
                    className='d-flex flex-row'
                    style={{ minHeight: "150px" }}
                  >
                    <div
                      style={{
                        width: "150px",
                        height: "150px",
                        overflow: "hidden",
                      }}
                    >
                      <Card.Img
                        src={getImageUrl(course)}
                        alt={course.Coursename || "Course image"}
                        style={{
                          width: "150px",
                          height: "150px",
                          // objectFit: 'cover'
                        }}
                      />
                    </div>
                    <Card.Body className='flex-grow-1'>
                      <Card.Title className='h6'>
                        {course.Coursename || "Untitled Course"}
                      </Card.Title>
                      <Card.Text className='small'>
                        <div>
                          <strong>Duration:</strong> {course.Durations || "N/A"}{" "}
                          months
                        </div>
                        <div>
                          <strong>Price:</strong> ₹{course.Price || "N/A"}
                        </div>
                        <div>
                          <strong>Trainer:</strong>{" "}
                          {course.TrainerName || "N/A"}
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </div>
                </Link>
              </Card>
            </div>
          ))}
        </Slider>
      ) : (
        <div className='text-center py-3'>
          <p>No related courses available at the moment.</p>
        </div>
      )}
    </div>
  );
};

export default OtherCoursesSlider;
