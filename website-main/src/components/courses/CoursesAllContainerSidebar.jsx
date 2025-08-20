import React from "react";
import { Link } from "react-router-dom";
import { CoursesSidebar } from "./CoursesSidebar";

export const CoursesAllContainerSidebar = ({
  isGrid,
  children,
  onCategorySelect,
  selectedCategoryId,
}) => {
  const handleCategorySelect = (category) => {
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  return (
    <section id='margin-top'>
      <div className='td_height_10 td_height_lg_10' />
      <div className='container'>
          <h4 className='  fw-bold mb-4 d-none d-sm-block text-center d-none d-sm-block td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_5 text-uppercase td_accent_color'>
               Explore Our Judgements
          </h4>

       
        <div className='row'>
          {/* Sidebar Column */}
          <div className='col-lg-4'>
            <CoursesSidebar onCategorySelect={handleCategorySelect}
            selectedCategoryId={selectedCategoryId} />
          </div>

          <div className='col-lg-8'>{children}</div>
        </div>
      </div>
    </section>
  );
};
