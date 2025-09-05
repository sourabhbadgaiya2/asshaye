import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const CoursesAllList = ({ selectedCategoryId }) => {
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [allCourses, setAllCourses] = useState([]);

  const { routesData, loading: routesLoading } = useSelector(
    (state) => state.routes
  );

  const judgementRoute = routesData.find(
    (route) => route.element === "JudgementDetails"
  );

  const fetchAllCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        "https://asshaye.onrender.com/judement/display"
      );
      if (!response.ok) throw new Error("Failed to fetch judgments");

      const data = await response.json();
      // console.log("API Response:", data); // Debug
      setAllCourses(data);

      if (data.length === 0) {
        setError("No judgments available.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllCourses();
  }, [fetchAllCourses]);

  useEffect(() => {
    if (allCourses.length === 0) return;

    const activeCategoryId = selectedCategoryId || categoryId;

    if (!activeCategoryId) {
      setFilteredCourses(allCourses);
      setError(null);
      return;
    }

    // console.log("Active Category ID:", activeCategoryId); // Debug

    const filtered = allCourses.filter((judgment) => {
      const categoryIdFromJudgment =
        judgment.judementCategory?._id || judgment.judementCategory;

      // console.log(
      //   `Judgment ${judgment._id} has category:`,
      //   categoryIdFromJudgment
      // ); // Debug

      return categoryIdFromJudgment?.toString() === activeCategoryId.toString();
    });

    setFilteredCourses(filtered);

    if (filtered.length === 0) {
      setError(`No judgments found for this category.`);
    } else {
      setError(null);
    }
  }, [selectedCategoryId, categoryId, allCourses]);

  const handleCourseClick = useCallback(
    (courseId) => {
      navigate(`${judgementRoute.path}`, {
        state: { blogId: courseId },
      });
    },
    [navigate]
  );

  const renderCourseCard = (course) => (
    <div key={course._id} id='radiolog' className='col-lg-10 col-sm-12 mb-4'>
      <div
        style={{ justifyContent: "space-between" }}
        className='td_card td_style_5  td_type_3 hover-effect'
      >
        <div
          className='td_card_thumb clickable'
          onClick={() => handleCourseClick(course._id)}
        >
          <span className='td_card_thumb_in td_radius_10'>
            <img
              src={
                Array.isArray(course.images) ? course.images[0] : course.images
              }
              alt={course.altText}
              className='course-thumbnail'
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/300x200?text=No+Image";
              }}
            />
            <span className='td_card_label td_fs_14 td_white_color td_accent_bg'>
              {dayjs(course.lastDate).format("DD MMM YYYY")}
            </span>
          </span>
        </div>
        <div className='td_card_content'>
          <h2
            className='td_card_title td_fs_24 td_semibold td_mb_12 clickable'
            onClick={() => handleCourseClick(course._id)}
          >
            {course.title}
          </h2>
          <p className='td_mb_3'>{course.subTitle}</p>
          <div className='td_card_btns_wrap justify-content-between'>
            <div className='td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14'>
              <span className='td_accent_color'>
                <span>Posted By: </span>
                <span className='td_fs_18 td_medium td_heading_color'>
                  {course.publicerName}
                </span>
              </span>
            </div>
            <div
              className='td_btn td_style_1 td_type_3 td_radius_10 td_medium td_fs_14 clickable'
              onClick={() => handleCourseClick(course._id)}
            >
              <span className='td_btn_in td_white_color td_accent_bg'>
                Read more...
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading)
    return (
      <div className='text-center py-5'>
        <div className='spinner-border text-danger' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <p className='mt-2'>Loading judgments...</p>
      </div>
    );

  if (error)
    return (
      <div className='alert alert-danger text-center'>
        <div>{error}</div>
        <div className='d-flex justify-content-center gap-2 mt-3'>
          {(selectedCategoryId || categoryId) && (
            <button
              className='btn btn-outline-primary'
              onClick={() => navigate("/judgements")}
            >
              Show all judgments
            </button>
          )}
          <button className='btn btn-primary' onClick={fetchAllCourses}>
            Refresh
          </button>
        </div>
      </div>
    );

  return (
    <div className='row td_gap_y_10 td_row_gap_30'>
      {filteredCourses.length > 0 ? (
        filteredCourses.map(renderCourseCard)
      ) : (
        <div className='col-12 text-center py-5'>
          <h4>No judgments found</h4>
          <button
            className='btn btn-primary mt-3'
            onClick={() => navigate("/judgements")}
          >
            Browse All Judgments
          </button>
        </div>
      )}
    </div>
  );
};

CoursesAllList.propTypes = {
  selectedCategoryId: PropTypes.string,
};

// Styles
const styles = `
  .hover-effect {
    padding: 10px;
    border: 2px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
  }
  .hover-effect:hover {
    box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    border-color: #0066cc;
    transform: translateY(-2px);
  }
  .course-thumbnail {
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-radius: 8px;
  }
  .clickable {
    cursor: pointer;
    transition: color 0.2s ease;
  }
  .clickable:hover {
    color: #0066cc;
  }
`;

// Inject styles
document.head.insertAdjacentHTML("beforeend", `<style>${styles}</style>`);
