import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { fetchcategory } from "../BlogsCategory/api";

export const BlogSidebar = ({ selectedCategoryId, setSelectedCategoryId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    $("#slider-range").slider({
      range: true,
      min: 10,
      max: 400,
      values: [60, 300],
      slide: function (event, ui) {
        $("#amount").val("$" + ui.values[0] + " - $" + ui.values[1]);
      },
    });
    $("#amount").val(
      "$" +
        $("#slider-range").slider("values", 0) +
        " - $" +
        $("#slider-range").slider("values", 1)
    );
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await fetchcategory();
      if (response.data) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId, e) => {
    e.preventDefault();
    if (selectedCategoryId !== categoryId) {
      setSelectedCategoryId(categoryId);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="d-lg-none d-flex align-items-center justify-content-between p-3">
         <h4 className='mb-0 td_section_subtitle_up td_fs_20 td_semibold   text-uppercase td_accent_color'>
               Explore Our Blog
          </h4>

        <button
          className="btn btn-danger  x shadow"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileSidebar"
          aria-controls="mobileSidebar"
        >
          <i className="bi bi-funnel-fill ms-2"></i>Open Filter
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className="offcanvas offcanvas-start custom-offcanvas-width"
        tabIndex="-1"
        id="mobileSidebar"
        aria-labelledby="mobileSidebarLabel"
      >
        <div className="offcanvas-header border-bottom">
          <h5 className="offcanvas-title" id="mobileSidebarLabel">
            Filters
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <SidebarContent
            categories={categories}
            loading={loading}
            error={error}
            selectedCategoryId={selectedCategoryId}
            onCategoryClick={handleCategoryClick}
          />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="d-none d-lg-block p-4 border-end" style={{ minWidth: "250px" }}>
        <SidebarContent
          categories={categories}
          loading={loading}
          error={error}
          selectedCategoryId={selectedCategoryId}
          onCategoryClick={handleCategoryClick}
        />
      </div>

      {/* Styles */}
      <style>{`
        @media (max-width: 991.98px) {
          .custom-offcanvas-width {
            width: 80% !important;
          }
        }

        .category-link {
          padding: 8px 12px;
          border-radius: 4px;
          display: inline-block;
        }

        .category-link:hover {
          text-decoration: none;
          background-color: #f8d7da;
        }

        .category-link.active {
          background-color: #dc3545 !important;
          color: white !important;
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
      `}</style>
    </>
  );
};

// SidebarContent Component
const SidebarContent = ({
  categories,
  loading,
  error,
  selectedCategoryId,
  onCategoryClick,
}) => {
  const handleClick = (categoryId, e) => {
    e.preventDefault();
    onCategoryClick(categoryId, e);
  };

  return (
    <div className="td_sidebar_filter m-0 me-0">
      <div className="td_filter_widget mb-4">
        <h3 className="td_filter_widget_title h5 mb-3 text-uppercase border-bottom pb-2">
          Categories
        </h3>
        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-danger" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="td_filter_category fw-semibold">
            <Link
              to="#"
              onClick={(e) => handleClick(null, e)}
              className={`category-link d-block mb-2 text-decoration-none ${
                selectedCategoryId === null ? "active" : "text-dark"
              }`}
            >
              All Categories
            </Link>
            {categories.map((category) => (
              <Link
                key={category._id}
                to="#"
                onClick={(e) => handleClick(category._id, e)}
                className={`category-link d-block mb-2 text-decoration-none ${
                  selectedCategoryId === category._id ? "active" : "text-dark"
                }`}
              >
                {category.name}
                {category.count && (
                  <span className="text-muted ms-2">({category.count})</span>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
