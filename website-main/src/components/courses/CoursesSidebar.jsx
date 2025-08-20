import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { fetchcategory } from "../../judement/api";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

export const CoursesSidebar = ({ onCategorySelect, selectedCategoryId }) => {
  const navigate = useNavigate();

  // Initialize jQuery UI slider
  useEffect(() => {
    const initializeSlider = () => {
      if ($("#slider-range").length) {
        $("#slider-range").slider({
          range: true,
          min: 10,
          max: 400,
          values: [60, 300],
          slide: function (event, ui) {
            $("#amount").val(`$${ui.values[0]} - $${ui.values[1]}`);
          },
        });
        $("#amount").val(
          `$${$("#slider-range").slider("values", 0)} - $${$(
            "#slider-range"
          ).slider("values", 1)}`
        );
      }
    };

    initializeSlider();

    return () => {
      // Cleanup slider if component unmounts
      if ($("#slider-range").length) {
        $("#slider-range").slider("destroy");
      }
    };
  }, []);

  return (
    <>
      <div className='d-lg-none d-flex align-items-center mb-3 justify-content-between mt-4 '>
         <h4 className=' mb-0 fw-bold text-center td_section_subtitle_up td_fs_20 td_semibold text-uppercase td_accent_color'>
              Explore Our Judgement
          </h4>


        <button
          className='btn btn-danger  shadow'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#mobileSidebar'
          aria-controls='mobileSidebar'
        >
          <i className='bi bi-funnel-fill '></i>Open Filter
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className='offcanvas offcanvas-start custom-offcanvas-width'
        tabIndex='-1'
        id='mobileSidebar'
        aria-labelledby='mobileSidebarLabel'
      >
        <div className='offcanvas-header border-bottom'>
          <h5 className='offcanvas-title' id='mobileSidebarLabel'>
            Filters
          </h5>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='offcanvas'
            aria-label='Close'
          ></button>
        </div>
        <div className='offcanvas-body'>
          <SidebarContent
            onCategorySelect={onCategorySelect}
            navigate={navigate}
            selectedCategoryId={selectedCategoryId}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div
        className='d-none d-lg-block p-4 border-end'
        style={{ minWidth: "250px" }}
      >
        <SidebarContent
          onCategorySelect={onCategorySelect}
          navigate={navigate}
          selectedCategoryId={selectedCategoryId}
        />
      </div>

      <style jsx>{`
        @media (max-width: 991.98px) {
          .custom-offcanvas-width {
            width: 80% !important;
          }
        }
        .category-link:hover {
          color: #dc3545;
          text-decoration: underline;
        }
        #slider-range {
          height: 8px;
          background: #dee2e6;
          border-radius: 5px;
        }
        #slider-range .ui-slider-handle {
          background: #dc3545;
          border: none;
          width: 20px;
          height: 20px;
          top: -6px;
          border-radius: 50%;
        }
          .active-category {
  background-color: #dc3545; /* Bootstrap “danger” red */
  color: #000 !important;      /* black text */
  padding: 4px 6px;
  border-radius: 4px;
}`}</style>
    </>
  );
};

CoursesSidebar.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
  selectedCategoryId: PropTypes.string,
};

// Sidebar Content Component
const SidebarContent = ({ onCategorySelect, navigate, selectedCategoryId }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchcategory();
      if (response.data) {
        setCategories(response.data);
      } else {
        setError("No categories found");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const { routesData, loading: routesLoading } = useSelector(
    (state) => state.routes
  );

  const judgementRoute = routesData.find(
    (route) => route.element === "Judgement"
  );

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryClick = useCallback(
    (e, categoryId, categoryName) => {
      e.preventDefault();
      if (!categoryId) return;

      // Pass both ID and name through props
      onCategorySelect?.({
        id: categoryId,
        name: categoryName,
      });

      // navigate(`/judgements/${categoryId}`);
      navigate(`${judgementRoute.path}`, {
        state: { blogId: courseId },
      });
    },
    [onCategorySelect, navigate]
  );

  if (loading) {
    return (
      <div className='d-flex justify-content-center py-3'>
        <div className='spinner-border text-danger' role='status'>
          <span className='visually-hidden'>Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='alert alert-danger'>
        {error}
        <button className='btn btn-link p-0 ms-2' onClick={fetchCategories}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className='td_sidebar_filter m-0 me-0'>
      <div className='td_filter_widget mb-4'>
        <h3 className='td_filter_widget_title h5 mb-3 text-uppercase border-bottom pb-2'>
          Categories
        </h3>
        <div className='td_filter_category fw-semibold'>
          {categories.map((category) => {
            const categoryId =
              category.id || category._id || category.categoryId;
            const categoryName = category.name || "Unnamed Category";

            if (!categoryId) return null;

            return (
  //             <Link
  //               key={categoryId}
  //               // className='d-block mb-2 text-dark text-decoration-none category-link'
  //                className={`d-block mb-2 text-decoration-none category-link ${
  //   selectedCategoryId === categoryId ? "text-red-600 font-semibold" : "text-black"
  // }`}
  //               onClick={(e) =>
  //                 handleCategoryClick(e, categoryId, categoryName)
  //               }
  //             >
  //               {categoryName}
  //             </Link>
              <Link
              key={categoryId}
              className={`d-block mb-2 text-decoration-none category-link ${
                selectedCategoryId === categoryId
                  ? "active-category"        // red background, black text
                  : "text-dark"              // default dark text
              }`}
              onClick={(e) =>
                handleCategoryClick(e, categoryId, categoryName)
              }
            >
              {categoryName}
            </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

SidebarContent.propTypes = {
  onCategorySelect: PropTypes.func.isRequired,
  navigate: PropTypes.func.isRequired,
  selectedCategoryId: PropTypes.string,
};
