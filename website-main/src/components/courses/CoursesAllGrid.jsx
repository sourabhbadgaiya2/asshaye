// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Slider from "react-slick";
// import courseThumb1 from "../../assets/alec-img/courses/course-1.jpg";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// export const CoursesAllGrid = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch('https://asshaye.onrender.com/api/allcourse');
//         if (!response.ok) {
//           throw new Error('Failed to fetch courses');
//         }
//         const data = await response.json();
//         setCourses(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   if (loading) return <div>Loading courses...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const sliderSettings = {
//     dots: true,
//     // infinite: true,
//     speed: 500,
//     slidesToShow: 6, // For desktop
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024, // tablets
//         settings: {
//           slidesToShow: 3,
//         }
//       },
//       {
//         breakpoint: 768, // mobile landscape
//         settings: {
//           slidesToShow: 4,
//         }
//       },
//       {
//         breakpoint: 480, // mobile portrait
//         settings: {
//           slidesToShow: 2,
//         }
//       }
//     ]
//   };

//   return (

//     <>
//      {/* <div className="td_height_140 td_height_lg_75" /> */}
//          <div className="td_height_140 td_height_lg_90" />
//     <div className="course-slider-wrapper mb-5">
//       <Slider {...sliderSettings}>
//         {courses.map((course, idx) => (

//          {id:console.log(course)},
//           <div key={course._id || idx} className="p-2">
//             <div className="td_card td_style_3 d-block td_radius_10">
//               {course.label && (
//                 <span className="td_card_label td_accent_bg td_white_color">
//                   {course.label}
//                 </span>
//               )}
//               <Link to={`/courses-layout`} className="td_card_thumb">
//                 <img
//                   src={course.images[0]}
//                   alt={course.Coursename}
//                   className="img-fluid"
//                 />
//               </Link>
//               <div className="p-2 td_white_bg">
//                 <div className="td_card_info_in">
//                   <h5 className="td_card_title text-center td_fs_14 td_mb_16">
//                     <Link to={`/courses-layout`}>{course.Coursename || "Judiciary Course"}</Link>
//                   </h5>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//     </>

//   );
// };

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { fetchSubsubcategory } from "../../components/api";

// export const CoursesAllGrid = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//  useEffect(() => {
//     const fetchAllSubsubcategories = async () => {
//       try {
//         const response = await fetchSubsubcategory();
//         if (response.data) {
//           setSubsubCategories(response.data);
//         }
//       } catch (error) {
//         console.error("Error fetching subsubcategories:", error);
//         toast.error("Failed to load subsubcategories. Please try again.");
//       }
//     };
//     fetchAllSubsubcategories();
//   }, []);

//   if (loading) return <div>Loading courses...</div>;
//   if (error) return <div>Error: {error}</div>;

//   const sliderSettings = {
//     dots: true,
//     infinite: false, // Prevents infinite loop (so no repeated data)
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: {
//           slidesToShow: 3,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 480,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   return (
//     <>
//       <div className="td_height_140 td_height_lg_90" />
//       <div className="course-slider-wrapper mb-5">
//         <Slider {...sliderSettings}>
//           {courses.map((course, idx) => (
//             <div key={course._id || idx} className="p-2">
//               <div className="td_card td_style_3 d-block td_radius_10">
//                 {course.subsubCategory?.name && (
//                   <span className="td_card_label td_accent_bg td_white_color">
//                     {course.subsubCategory?.name}
//                   </span>
//                 )}
//                 <Link to={`/courses-layout`} className="td_card_thumb">
//                   <img
//                     src={course.images?.[0]}
//                     alt={course.Coursename || "Course"}
//                     className="img-fluid"
//                     style={{height:"150px", width:"100%"}}
//                   />
//                 </Link>
//                 <div className="p-2 td_white_bg">
//                   <div className="td_card_info_in">
//                     <h5 className="td_card_title text-center td_fs_14 td_mb_16">
//                       <Link to={`/courses-layout`}>
//                         {course.subsubCategory?.name || "Judiciary Course"}
//                       </Link>
//                     </h5>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </>
//   );
// };

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { fetchSubsubcategory } from "../../components/api";
// import { toast } from "react-toastify";

// export const CoursesAllGrid = ({ selectedSubCategoryId }) => {
//   const [subsubCategories, setSubsubCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAllSubsubcategories = async () => {
//       try {
//         const response = await fetchSubsubcategory();
//         if (response.data) {
//           const uniqueByName = [];
//           const namesSeen = new Set();

//           for (const item of response.data) {
//             if (!namesSeen.has(item.name)) {
//               namesSeen.add(item.name);
//               uniqueByName.push(item);
//             }
//           }

//           setSubsubCategories(uniqueByName);
//         }
//       } catch (error) {
//         console.error("Error fetching subsubcategories:", error);
//         toast.error("Failed to load subsubcategories. Please try again.");
//         setError("Failed to load subsubcategories");
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAllSubsubcategories();
//   }, []);

//   const sliderSettings = {
//     dots: true,
//     infinite: false,
//     autoplay: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 3 } },
//       { breakpoint: 768, settings: { slidesToShow: 2 } },
//       { breakpoint: 480, settings: { slidesToShow: 2 } },
//     ],
//   };

//   if (loading) return <div>Loading categories...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <>
//       <div className="td_height_120 td_height_lg_90" />
//       <div className="course-slider-wrapper mb-5">
//         <Slider {...sliderSettings}>
//           {subsubCategories.map((subsub) => (
//             <div
//               key={subsub.uniqueId}
//               className={`p-2 ${
//                 subsub._id === selectedSubCategoryId ? "selected-slide" : ""
//               }`}
//             >
//               <div className="td_card td_style_3 d-block td_radius_10">
//                 <Link
//                   to={`/courses-layout/${subsub._id}`}
//                   className="td_card_thumb"
//                 >
//                   <img
//                     src={subsub.images?.[0] || "/default-image.jpg"}
//                     alt={subsub.name || "Course"}
//                     className="img-fluid"
//                     style={{
//                       height: "120px",
//                       width: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 </Link>
//                 <div className="p-2 td_white_bg">
//                   <div className="td_card_info_in">
//                     <h5 className="td_card_title text-center td_fs_14 td_mb_16">
//                       <Link to={`/courses-layout/${subsub._id}`}>
//                         {subsub.name || "Judiciary Course"}
//                       </Link>
//                     </h5>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </>
//   );
// };

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { fetchSubsubcategory } from "../../components/api";
// import { toast } from "react-toastify";

// export const CoursesAllGrid = ({ selectedSubCategoryId, onCategorySelect }) => {
//   const [subsubCategories, setSubsubCategories] = useState([]);
//   const [duplicateNameIds, setDuplicateNameIds] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchAllSubsubcategories = async () => {
//       try {
//         const response = await fetchSubsubcategory();
//         if (response.data) {
//           const allItems = response.data;
//           console.log(allItems, "dataaa");

//           // Step 1: Map name to list of IDs
//           const nameToIdsMap = {};
//           for (const item of allItems) {
//             const name = item.name;
//             if (!nameToIdsMap[name]) {
//               nameToIdsMap[name] = [];
//             }
//             nameToIdsMap[name].push(item._id);
//           }

//           console.log(nameToIdsMap, "12345");

//           // Step 2: Extract only duplicate name IDs
//           const duplicateIds = [];
//           for (const name in nameToIdsMap) {
//             if (nameToIdsMap[name].length > 1) {
//               duplicateIds.push(...nameToIdsMap[name]);
//             }
//           }

//           // Optional: Filter unique by name for display (as you did before)
//           const uniqueByName = [];
//           const namesSeen = new Set();
//           for (const item of allItems) {
//             if (!namesSeen.has(item.name)) {
//               namesSeen.add(item.name);
//               uniqueByName.push(item);
//             }
//           }

//           setSubsubCategories(uniqueByName);
//           setDuplicateNameIds(duplicateIds);
//         }
//       } catch (error) {
//         console.error("Error fetching subsubcategories:", error);
//         toast.error("Failed to load subsubcategories. Please try again.");
//         setError("Failed to load subsubcategories");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllSubsubcategories();
//   }, []);

//   const sliderSettings = {
//     dots: true,
//     infinite: false,
//     autoplay: true,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 1,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 3 } },
//       { breakpoint: 768, settings: { slidesToShow: 2 } },
//       { breakpoint: 480, settings: { slidesToShow: 2 } },
//     ],
//   };

//   if (loading) return <div>Loading categories...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <>
//       <div className="td_height_120 td_height_lg_90" />
//       <div className="course-slider-wrapper mb-5">
//         <Slider {...sliderSettings}>
//           {subsubCategories.map((subsub) => (
//             <div
//               key={subsub._id}
//               className={`p-2 ${
//                 subsub._id === selectedSubCategoryId ? "selected-slide" : ""
//               }`}
//             >
//               <div className="td_card td_style_3 d-block td_radius_10">
//                 <Link
//                   to={`/courses-layout/${subsub._id}`}
//                   className="td_card_thumb"
//                 >
//                   <img
//                     src={subsub.images?.[0] || "/default-image.jpg"}
//                     alt={subsub.name || "Course"}
//                     className="img-fluid"
//                     style={{
//                       height: "120px",
//                       width: "100%",
//                       objectFit: "cover",
//                     }}
//                   />
//                 </Link>
//                 <div className="p-2 td_white_bg">
//                   <div className="td_card_info_in">
//                     <h5 className="td_card_title text-center td_fs_14 td_mb_16">
//                       <Link to={`/courses-layout/${subsub._id}`}>
//                         {/* {JSON.stringify(subsub)}
//                         {console.log(subsub,"Sarik")} */}
//                         {subsub.name || "Judiciary Course"}
//                       </Link>
//                     </h5>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>

//       {/* Debug: Print duplicate IDs */}
//       {/* <pre>{JSON.stringify(duplicateNameIds, null, 2)}</pre> */}
//     </>
//   );
// };

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// ✅ Dummy Sub-Sub-Category Data
const dummySubsubCategories = [
  {
    _id: "1",
    name: "Criminal Law",
    images: ["/images/criminal-law.jpg"],
  },
  {
    _id: "2",
    name: "Civil Law",
    images: ["/images/civil-law.jpg"],
  },
  {
    _id: "3",
    name: "Family Law",
    images: ["/images/family-law.jpg"],
  },
  {
    _id: "4",
    name: "Contract Law",
    images: ["/images/contract-law.jpg"],
  },
  {
    _id: "5",
    name: "Property Law",
    images: ["/images/property-law.jpg"],
  },
  {
    _id: "6",
    name: "Administrative Law",
    images: ["/images/admin-law.jpg"],
  },
  {
    _id: "7",
    name: "Torts",
    images: ["/images/torts.jpg"],
  },
  {
    _id: "8",
    name: "Cyber Law",
    images: [],
  },
];

export const CoursesAllGrid = ({ selectedSubCategoryId }) => {
  const [subsubCategories, setSubsubCategories] = useState([]);

  useEffect(() => {
    // Simulate fetching subsubcategories
    const uniqueByName = [];
    const namesSeen = new Set();

    for (const item of dummySubsubCategories) {
      if (!namesSeen.has(item.name)) {
        namesSeen.add(item.name);
        uniqueByName.push(item);
      }
    }

    setSubsubCategories(uniqueByName);
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: false,
    autoplay: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <>
      {/* <div className="td_height_120 td_height_lg_90" /> */}
      <div className='course-slider-wrapper mb-5'>
        <Slider {...sliderSettings}>
          {subsubCategories.map((subsub) => (
            <div
              key={subsub._id}
              className={`p-2 ${
                subsub._id === selectedSubCategoryId ? "selected-slide" : ""
              }`}
            >
              <div className='td_card td_style_3 d-block td_radius_10'>
                <Link
                  to={`/courses-layout/${subsub._id}`}
                  className='td_card_thumb'
                >
                  <img
                    src={subsub.images?.[0] || "/default-image.jpg"}
                    alt={subsub.name || "Course"}
                    className='img-fluid'
                    style={{
                      height: "120px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Link>
                <div className='p-2 td_white_bg'>
                  <div className='td_card_info_in'>
                    <h5 className='td_card_title text-center td_fs_14 td_mb_16'>
                      <Link to={`/courses-layout/${subsub._id}`}>
                        {subsub.name || "Judiciary Course"}
                      </Link>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};
