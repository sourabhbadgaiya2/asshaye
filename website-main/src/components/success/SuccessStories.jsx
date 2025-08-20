import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Layout } from "../../layouts/Layout";
import { CoursesAllGrid } from "../courses/CoursesAllGrid";
import OtherCoursesSlider from "../../pages/course/OtherCourses";
import { SliderCard } from "../../common/SliderCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SuccessStories = () => {
  const navigate = useNavigate();
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { routesData } = useSelector((state) => state.routes);

  const { path } = routesData.find((route) => route.element === "CourseNew");

  const handleSubSubcategoryClick = ({ id, name }) => {
    navigate(`${path}`, { state: { id, name, fromDetails: true } });
  };

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await fetch(
          "https://backend.aashayeinjudiciary.com/success/display"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch success stories");
        }
        const data = await response.json();
        setStories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  return (
    <Layout header={9} footer={1}>
      <div className='td_height_112 td_height_lg_80' />
      <div className='col-md-12'>
        <SliderCard onSlideClick={handleSubSubcategoryClick} />
      </div>
      <section className=' p-0 text-center bg-light mt-5 py-5'>
        <div className='container'>
             <h4 className='td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_5 text-uppercase td_accent_color mt-4'>
          Student Success Stories
          </h4>
          <p className='td_section_title td_fs_20 mb-3'> Success stories of determination from Aashayein Judiciary alumni.
</p>



          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className='text-danger'>{error}</div>
          ) : (
            <div className='row g-4'>
              {stories.map((story, index) => (
                <div key={index} className='col-lg-3 col-md-6 col-sm-12'>
                  <div className='card border-0 shadow-sm p-3 rounded-3 h-100'>
                    <img
                      src={story.images ? story.images[0] : story.image}
                      alt={story.StudentName}
                      className='card-img-top rounded-3'
                    />
                    <div className='card-body'>
                      <h5 className='card-title fw-bold text-dark'>
                        {story.StudentName}
                      </h5>
                      <p className='card-text text-muted'>{story.Judicial}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <OtherCoursesSlider />
    </Layout>
  );
};

export default SuccessStories;
