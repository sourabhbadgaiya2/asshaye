// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams, useLocation } from "react-router-dom";

// import { Layout } from "../../layouts/Layout";
// import CoursesnewSidebar from "./CoursesnewSidebar";
// import { CoursesAllGrid } from "../../common/CoursesAllGrid";

// import { SliderCard } from "../../common/SliderCard";

// import { fetchCategories } from "../../Redux/features/category/categoryThunk";
// import { fetchSubcategoriesByCategory } from "../../Redux/features/subCategory/subcategoryThunk";

// import {
//   fetchCourses,
//   fetchFilteredCourses,
// } from "../../Redux/features/courseThunk";

// import {
//   setActiveCategory,
//   setActiveSubcategory,
//   setActiveSubSubcategory,
//   resetFilters,
// } from "../../Redux/features/courseSlice";

// import SubSubcategorySlider from "../../common/SubSubcategorySlider"; // नया slider component
// import OtherCoursesSlider from "./OtherCourses";

// const CourseNew = () => {
//   const [activeSubSubcategoryName, setActiveSubSubcategoryName] = useState("");

//   const dispatch = useDispatch();
//   const { state } = useLocation();
//   const location = useLocation();

//   const { name: paramName, id: paramId } = state;

//   // console.log(paramName, paramId, "sourabh");

//   const slugToLabel = (slug) =>
//     slug
//       ? slug
//           .replace(/-/g, " ")
//           .replace(/\s+/g, " ")
//           .trim()
//           .replace(/\b\w/g, (c) => c.toUpperCase())
//       : "";

//   const search = useMemo(
//     () => new URLSearchParams(location.search),
//     [location.search]
//   );
//   const queryId = search.get("id");
//   const queryName = search.get("name");

//   const routeCategoryId = paramId || queryId || null;
//   const routeCategorySlug = paramName || queryName || "";
//   const routeCategoryLabel = slugToLabel(routeCategorySlug);

//   const subSubCategoryId = search.get("id");
//   const subSubCategoryName = search.get("name");

//   const {
//     categories,
//     loading: catLoading,
//     error: catError,
//   } = useSelector((s) => s.categories);

//   const {
//     subcategories,
//     loading: subLoading,
//     error: subError,
//   } = useSelector((s) => s.subcategories);

//   const {
//     subSubcategories,
//     loading: subSubLoading,
//     error: subSubError,
//   } = useSelector((s) => s.subSubcategories);

//   const {
//     courses,
//     filteredCourses,
//     loading: courseLoading,
//     error: courseError,
//     activeCategoryId,
//     activeSubcategoryId,
//     activeSubSubcategoryId,
//   } = useSelector((s) => s.courses);

//   // Initial load
//   useEffect(() => {
//     dispatch(fetchCategories());

//     if (subSubCategoryId) {
//       dispatch(setActiveSubSubcategory(subSubCategoryId));
//       setActiveSubSubcategoryName(subSubCategoryName || ""); // Optional

//       dispatch(
//         fetchFilteredCourses({
//           subSubCategory: subSubCategoryId,
//         })
//       );
//     } else if (routeCategoryId) {
//       dispatch(setActiveCategory(routeCategoryId));
//       dispatch(fetchFilteredCourses({ category: routeCategoryId }));
//     } else {
//       dispatch(fetchCourses());
//     }

//     if (routeCategoryId) {
//       // Directly activate & fetch filtered data
//       dispatch(setActiveCategory(routeCategoryId));
//       dispatch(fetchFilteredCourses({ category: routeCategoryId }));
//     } else {
//       // No route id: load all
//       dispatch(fetchCourses());
//     }
//   }, [dispatch, routeCategoryId]);

//   // Load subcategories on category change
//   useEffect(() => {
//     if (activeCategoryId) {
//       dispatch(fetchSubcategoriesByCategory(activeCategoryId));
//     }
//   }, [activeCategoryId, dispatch]);

//   // Handler: Category Click (updated)
//   const handleCategoryClick = (catId) => {
//     if (activeCategoryId === catId) {
//       dispatch(resetFilters());
//       dispatch(fetchCourses());
//     } else {
//       dispatch(setActiveCategory(catId));
//       dispatch(
//         fetchFilteredCourses({
//           category: catId,
//           subSubCategory: activeSubSubcategoryId, // <-- ADD THIS!
//         })
//       );
//     }
//   };

//   // Handler: Subcategory Click (updated)
//   const handleSubcategoryClick = (subId) => {
//     if (activeSubcategoryId === subId) {
//       dispatch(setActiveSubcategory(null));
//       dispatch(
//         fetchFilteredCourses({
//           category: activeCategoryId,
//           subSubCategory: activeSubSubcategoryId, // <-- ADD THIS!
//         })
//       );
//     } else {
//       dispatch(setActiveSubcategory(subId));
//       dispatch(
//         fetchFilteredCourses({
//           category: activeCategoryId,
//           subCategory: subId,
//           subSubCategory: activeSubSubcategoryId, // <-- ADD THIS!
//         })
//       );
//     }
//   };

//   const handleSubSubcategoryClick = ({ id, name }) => {
//     setActiveSubSubcategoryName(name); // <-- Save name

//     if (activeSubSubcategoryId === id) {
//       dispatch(setActiveSubSubcategory(null));
//       setActiveSubSubcategoryName("");
//       dispatch(
//         fetchFilteredCourses({
//           category: activeCategoryId,
//           subCategory: activeSubcategoryId,
//         })
//       );
//     } else {
//       dispatch(setActiveSubSubcategory(id));
//       dispatch(
//         fetchFilteredCourses({
//           category: activeCategoryId,
//           subCategory: activeSubcategoryId,
//           subSubCategory: id,
//         })
//       );
//     }
//   };

//   // Reset all
//   const handleReset = () => {
//     dispatch(resetFilters());
//     dispatch(fetchCourses());
//   };

//   const displayCourses =
//     filteredCourses.length > 0 || activeCategoryId || activeSubcategoryId
//       ? filteredCourses
//       : courses;

//   // Try to resolve display name from Redux categories (zyada trusted)
//   const activeCategoryObj = categories.find((c) => c._id === activeCategoryId);

//   // Jo naam dikhayenge:
//   const activeCategoryLabel =
//     (activeCategoryObj && activeCategoryObj.name) ||
//     routeCategoryLabel ||
//     "Category";

//   // Heading selection:
//   const headingLabel = activeSubSubcategoryId
//     ? activeSubSubcategoryName
//     : activeSubcategoryId
//     ? "Filtered Courses"
//     : activeCategoryId
//     ? `${activeCategoryLabel} Courses`
//     : "All Courses";

//   const isFilterActive = !!(
//     activeCategoryId ||
//     activeSubcategoryId ||
//     activeSubSubcategoryId
//   );
//   const noFilteredResults =
//     isFilterActive && !courseLoading && filteredCourses.length === 0;

//   return (
//     <div className='mb-6'>
//       <Layout header={9} footer={1}>
//         <div className='td_height_140 td_height_lg_60' />
//         <SliderCard
//           selectedSubCategoryId='2'
//           onSlideClick={handleSubSubcategoryClick}
//         />

//         <div className='container-fluid'>
//           <div className='row'>
//             <h3 className='text-center fw-bold mb-6 d-none d-sm-block'>
//               <span
//                 style={{
//                   borderBottom: "3px solid red",
//                   paddingBottom: "5px",
//                 }}
//               >
//                 Explore Our Courses
//               </span>
//             </h3>
//             {/* Sidebar */}
//             <div className='col-12 col-md-4 col-lg-3 mb-3 mb-md-0'>
//               <CoursesnewSidebar
//                 categories={categories}
//                 subcategories={subcategories}
//                 activeCategoryId={activeCategoryId}
//                 activeSubcategoryId={activeSubcategoryId}
//                 activeSubSubcategoryId={activeSubSubcategoryId} // <-- NEW PROP!
//                 onCategoryClick={handleCategoryClick}
//                 onSubcategoryClick={handleSubcategoryClick}
//                 onReset={handleReset}
//                 loadingCategories={catLoading}
//                 loadingSubcategories={subLoading}
//                 errorCategories={catError}
//                 errorSubcategories={subError}
//               />
//             </div>

//             {/* Main */}
//             <div className='col-12 col-md-8 col-lg-9'>
//               <div className='d-flex justify-content-between align-items-center mb-3'>
//                 <h4 className='m-0'>{headingLabel}</h4>
//                 {courseLoading && (
//                   <div className='spinner-border spinner-border-sm text-primary' />
//                 )}
//               </div>

//               {noFilteredResults ? (
//                 <div className='alert alert-warning text-center'>
//                   No courses found for the selected filters.
//                 </div>
//               ) : (
//                 <CoursesAllGrid
//                   courses={displayCourses}
//                   loading={courseLoading}
//                   error={courseError}
//                 />
//               )}
//             </div>
//           </div>
//         </div>

//         <OtherCoursesSlider />
//       </Layout>
//     </div>
//   );
// };

// export default CourseNew;

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { Layout } from "../../layouts/Layout";
import CoursesnewSidebar from "./CoursesnewSidebar";
import { CoursesAllGrid } from "../../common/CoursesAllGrid";

import { SliderCard } from "../../common/SliderCard";

import { fetchCategories } from "../../Redux/features/category/categoryThunk";
import { fetchSubcategoriesByCategory } from "../../Redux/features/subCategory/subcategoryThunk";

import {
  fetchCourses,
  fetchFilteredCourses,
} from "../../Redux/features/courseThunk";

import {
  setActiveCategory,
  setActiveSubcategory,
  setActiveSubSubcategory,
  resetFilters,
} from "../../Redux/features/courseSlice";

import OtherCoursesSlider from "./OtherCourses";

const CourseNew = () => {
  const [activeSubSubcategoryName, setActiveSubSubcategoryName] = useState("");

  const dispatch = useDispatch();
  const location = useLocation();
  const { state = {} } = location;

  // detect if coming from details
  const isFromDetails = state.fromDetails === true;

  // extract based on source
  const subSubCategoryId = isFromDetails ? state.id : null;
  const subSubCategoryName = isFromDetails ? state.name : "";

  const search = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const queryId = search.get("id");
  const queryName = search.get("name");

  const routeCategoryId = !isFromDetails ? state.id || queryId : null;
  const routeCategorySlug = !isFromDetails ? state.name || queryName || "" : "";

  const slugToLabel = (slug) =>
    slug
      ? slug
          .replace(/-/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .replace(/\b\w/g, (c) => c.toUpperCase())
      : "";

  const routeCategoryLabel = slugToLabel(routeCategorySlug);

  const {
    categories,
    loading: catLoading,
    error: catError,
  } = useSelector((s) => s.categories);

  const {
    subcategories,
    loading: subLoading,
    error: subError,
  } = useSelector((s) => s.subcategories);

  const {
    courses,
    filteredCourses,
    loading: courseLoading,
    error: courseError,
    activeCategoryId,
    activeSubcategoryId,
    activeSubSubcategoryId,
  } = useSelector((s) => s.courses);

  // Initial load
  useEffect(() => {
    dispatch(fetchCategories());

    if (subSubCategoryId) {
      dispatch(setActiveSubSubcategory(subSubCategoryId));
      setActiveSubSubcategoryName(subSubCategoryName);
      dispatch(fetchFilteredCourses({ subSubCategory: subSubCategoryId }));
    } else if (routeCategoryId) {
      dispatch(setActiveCategory(routeCategoryId));
      dispatch(fetchFilteredCourses({ category: routeCategoryId }));
    } else {
      dispatch(fetchCourses());
    }
  }, [dispatch, routeCategoryId, subSubCategoryId]);

  // Load subcategories on category change
  useEffect(() => {
    if (activeCategoryId) {
      dispatch(fetchSubcategoriesByCategory(activeCategoryId));
    }
  }, [activeCategoryId, dispatch]);

  const handleCategoryClick = (catId) => {
    if (activeCategoryId === catId) {
      dispatch(resetFilters());
      dispatch(fetchCourses());
    } else {
      dispatch(setActiveCategory(catId));
      dispatch(
        fetchFilteredCourses({
          category: catId,
          subSubCategory: activeSubSubcategoryId,
        })
      );
    }
  };

  const handleSubcategoryClick = (subId) => {
    if (activeSubcategoryId === subId) {
      dispatch(setActiveSubcategory(null));
      dispatch(
        fetchFilteredCourses({
          category: activeCategoryId,
          subSubCategory: activeSubSubcategoryId,
        })
      );
    } else {
      dispatch(setActiveSubcategory(subId));
      dispatch(
        fetchFilteredCourses({
          category: activeCategoryId,
          subCategory: subId,
          subSubCategory: activeSubSubcategoryId,
        })
      );
    }
  };

  const handleSubSubcategoryClick = ({ id, name }) => {
    setActiveSubSubcategoryName(name);

    if (activeSubSubcategoryId === id) {
      dispatch(setActiveSubSubcategory(null));
      setActiveSubSubcategoryName("");
      dispatch(
        fetchFilteredCourses({
          category: activeCategoryId,
          subCategory: activeSubcategoryId,
        })
      );
    } else {
      dispatch(setActiveSubSubcategory(id));
      dispatch(
        fetchFilteredCourses({
          category: activeCategoryId,
          subCategory: activeSubcategoryId,
          subSubCategory: id,
        })
      );
    }
  };

  const handleReset = () => {
    dispatch(resetFilters());
    dispatch(fetchCourses());
  };

  const displayCourses =
    filteredCourses.length > 0 || activeCategoryId || activeSubcategoryId
      ? filteredCourses
      : courses;

  const activeCategoryObj = categories.find((c) => c._id === activeCategoryId);

  const activeCategoryLabel =
    (activeCategoryObj && activeCategoryObj.name) ||
    routeCategoryLabel ||
    "Category";

  const headingLabel = activeSubSubcategoryId
    ? activeSubSubcategoryName
    : activeSubcategoryId
    ? "Filtered Courses"
    : activeCategoryId
    ? `${activeCategoryLabel} Courses`
    : "All Courses";

  const isFilterActive = !!(
    activeCategoryId ||
    activeSubcategoryId ||
    activeSubSubcategoryId
  );

  const noFilteredResults =
    isFilterActive && !courseLoading && filteredCourses.length === 0;

  return (
    <div className='mb-6'>
      <Layout header={9} footer={1}>
        <div className='td_height_120 td_height_lg_80' />
        <SliderCard
          selectedSubCategoryId='2'
          onSlideClick={handleSubSubcategoryClick}
        />

        <div className='container-fluid'>
          <div className='row'>
            <h3 className='text-center fw-bold mb-6 d-none d-sm-block'>
              <span
                style={{
                  borderBottom: "3px solid red",
                  paddingBottom: "5px",
                }}
              >
                Explore Our Courses
              </span>
            </h3>
            <div className='col-12 col-md-4 col-lg-3 mb-3 mb-md-0'>
              <CoursesnewSidebar
                categories={categories}
                subcategories={subcategories}
                activeCategoryId={activeCategoryId}
                activeSubcategoryId={activeSubcategoryId}
                activeSubSubcategoryId={activeSubSubcategoryId}
                onCategoryClick={handleCategoryClick}
                onSubcategoryClick={handleSubcategoryClick}
                onReset={handleReset}
                loadingCategories={catLoading}
                loadingSubcategories={subLoading}
                errorCategories={catError}
                errorSubcategories={subError}
              />
            </div>

            <div className='col-12 col-md-8 col-lg-9'>
              <div className='d-flex justify-content-between align-items-center mb-3'>
                <h4 className='m-0'>{headingLabel}</h4>
                {courseLoading && (
                  <div className='spinner-border spinner-border-sm text-primary' />
                )}
              </div>

              {noFilteredResults ? (
                <div className='alert alert-warning text-center'>
                  No courses found for the selected filters.
                </div>
              ) : (
                <CoursesAllGrid
                  courses={displayCourses}
                  loading={courseLoading}
                  error={courseError}
                />
              )}
            </div>
          </div>
        </div>

        <OtherCoursesSlider />
      </Layout>
    </div>
  );
};

export default CourseNew;
