// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, useLocation } from "react-router-dom";
// import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import axios from "axios";
// import DOMPurify from "dompurify";
// import dayjs from "dayjs";
// import { Layout } from "../../layouts/Layout";
// import { CoursesAllGrid } from "./CoursesAllGrid";
// import OtherCoursesSlider from "../../pages/course/OtherCourses";
// import { SliderCard } from "../../common/SliderCard";
// import { useSelector } from "react-redux";

// const CouresesFull = () => {
//   // const { id } = useParams();
//   const navigate = useNavigate();
//   const [course, setCourse] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [relatedCourses, setRelatedCourses] = useState([]);
//   const [relatedLoading, setRelatedLoading] = useState(false);

//   const { routesData } = useSelector((state) => state.routes);

//   const { path } = routesData.find((route) => route.element === "CourseNew");

//   const handleSubSubcategoryClick = ({ id, name }) => {
//     navigate(`${path}`, { state: { id, name, fromDetails: true } });
//   };

//   const { state } = useLocation();

//   const id = state?.id;

//   const handleCourseClick = (courseId) => {
//     navigate(`/enroll/${courseId}`);
//   };

//   // ! url
//   useEffect(() => {
//     if (course && course.staticUrl) {
//       const slug = course.staticUrl
//         .toLowerCase()
//         .replace(/"/g, "")
//         .replace(/[^a-z0-9]+/g, "-")
//         .replace(/(^-|-$)+/g, "");

//       const newUrl = `/course-details/${slug}`;
//       const currentPath = window.location.pathname;

//       if (!currentPath.includes(slug)) {
//         window.history.replaceState(null, "", newUrl);
//       }
//     }
//   }, [course]);

//   useEffect(() => {
//     const fetchCourseData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch the main course data
//         const courseResponse = await axios.get(
//           `http://localhost:8000/api/courses/${id}`
//         );
//         if (!courseResponse.data) {
//           throw new Error("Course not found");
//         }
//         setCourse(courseResponse.data);

//         // Fetch related courses if category exists
//         if (courseResponse.data.category) {
//           setRelatedLoading(true);
//           const categoryId =
//             typeof courseResponse.data.category === "object"
//               ? courseResponse.data.category._id
//               : courseResponse.data.category;
//         }
//       } catch (err) {
//         console.error("Failed to fetch course:", {
//           message: err.message,
//           status: err.response?.status,
//           data: err.response?.data,
//           config: err.config,
//         });
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Failed to load course details"
//         );
//         if (err.response?.status === 404) {
//           navigate("/not-found", { replace: true });
//         }
//       } finally {
//         setLoading(false);
//         setRelatedLoading(false);
//       }
//     };

//     fetchCourseData();
//   }, [id, navigate]);

//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       {
//         breakpoint: 992,
//         settings: {
//           slidesToShow: 2,
//         },
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//         },
//       },
//     ],
//   };

//   // Function to sanitize HTML content
//   const sanitize = (dirty) => {
//     return DOMPurify.sanitize(dirty, {
//       ALLOWED_TAGS: [
//         "p",
//         "strong",
//         "em",
//         "ul",
//         "ol",
//         "li",
//         "br",
//         "h1",
//         "h2",
//         "h3",
//         "h4",
//         "h5",
//         "h6",
//       ],
//       ALLOWED_ATTR: [],
//     });
//   };

//   // Function to format date
//   const formatDate = (dateString) => {
//     if (!dateString) return "Enroll anytime";
//     return dayjs(dateString).format("MMMM D, YYYY");
//   };

//   if (loading) {
//     return (
//       <Container
//         className='d-flex justify-content-center align-items-center'
//         style={{ minHeight: "50vh" }}
//       >
//         <Spinner animation='border' variant='primary' />
//         <span className='ms-3'>Loading course details...</span>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className='my-5'>
//         <Alert variant='danger' className='text-center'>
//           <h4>Error Loading Course</h4>
//           <p>{error}</p>
//           <Button variant='primary' onClick={() => window.location.reload()}>
//             Try Again
//           </Button>
//         </Alert>
//       </Container>
//     );
//   }

//   if (!course) {
//     return (
//       <Container className='my-5'>
//         <Alert variant='warning' className='text-center'>
//           <h4>Course Not Found</h4>
//           <p>The requested course could not be found.</p>
//           <Button variant='primary' onClick={() => navigate("/courses")}>
//             Browse All Courses
//           </Button>
//         </Alert>
//       </Container>
//     );
//   }

//   const handleBack = () => {
//     if (state?.filter) {
//       navigate(`${path}`, { state: { filter: state.filter } });
//     } else {
//       navigate(-1);
//     }
//   };

//   return (
//     <>
//       <div className='col-md-12'>
//         <div className='td_height_112 td_height_lg_60' />
//         <SliderCard onSlideClick={handleSubSubcategoryClick} />
//       </div>
//       <Layout header={9} footer={1}>
//         <Container className='my-5'>
//           <Card className='mb-5 shadow rounded-4 border-0'>
//             <Card.Header
//               style={{ backgroundColor: "#BE191D" }}
//               className=' text-white d-flex justify-content-between align-items-center rounded-top-4 px-4 py-3'
//             >
//               <h2 className='mb-0 fs-4 text-white'>
//                 {course.title || "Course Title"}

//                 <span className='ms-2'>
//                   - {course?.subsubCategory?.name || "Self-paced"}
//                 </span>
//               </h2>
//               <Button variant='light' size='sm' onClick={handleBack}>
//                 ⬅ Back
//               </Button>
//             </Card.Header>

//             <Card.Body className='px-0 py-0'>
//               <div className='row g-0'>
//                 {/* Left Column - Video and Description */}
//                 <div className='col-md-7 p-4'>
//                   <div className='ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm bg-dark'>
//                     {course.URL ? (
//                       <iframe
//                         src={course.URL}
//                         title={`${course.title} preview`}
//                         allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
//                         allowFullScreen
//                         className='border-0'
//                       ></iframe>
//                     ) : (
//                       <div className='d-flex justify-content-center align-items-center h-100 text-white'>
//                         <div className='text-center'>
//                           <div className='fs-1 mb-2'>🎬</div>
//                           <p>Video Coming Soon</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className='mt-4 d-none d-md-block'>
//                     <h4>Course Description</h4>
//                     <div
//                       dangerouslySetInnerHTML={{
//                         __html: sanitize(
//                           course.CourseDescription ||
//                             "No description available."
//                         ),
//                       }}
//                     />

//                     {course.curriculum && course.curriculum.length > 0 && (
//                       <>
//                         <h5 className='mt-4'>Curriculum</h5>
//                         <ul className='list-group'>
//                           {course.curriculum.map((item, index) => (
//                             <li
//                               key={index}
//                               className='list-group-item border-0 ps-0'
//                             >
//                               <strong>Module {index + 1}:</strong> {item}
//                             </li>
//                           ))}
//                         </ul>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 <div className='col-md-5 p-4 border-start'>
//                   {/* Right Column - Course Details */}
//                   <div className=''>
//                     <h4 className='mb-3 text-secondary d-flex align-items-center gap-2'>
//                       <span>🔹</span> Course Details
//                     </h4>

//                     {course.features && course.features.length > 0 && (
//                       <>
//                         <h5>Features</h5>
//                         <ul className='mb-4'>
//                           {course.features.map((feature, i) => (
//                             <li
//                               key={i}
//                               className='mb-2 d-flex align-items-start gap-2'
//                             >
//                               <span className='text-success'>✓</span> {feature}
//                             </li>
//                           ))}
//                         </ul>
//                       </>
//                     )}

//                     <div className='bg-light p-3 rounded-3 mb-4'>
//                       <div className='mb-2'>
//                         <strong>💰 Price:</strong>
//                         <span className='text-success fw-bold ms-2'>
//                           {course.Price ? `₹${course.Price}` : "Free"}
//                         </span>
//                         {course.originalPrice &&
//                           course.originalPrice > course.price && (
//                             <span className='text-decoration-line-through text-muted ms-2'>
//                               ₹{course.originalPrice}
//                             </span>
//                           )}
//                       </div>
//                       <div className='mb-2'>
//                         <strong>⏳ Duration:</strong>
//                         <span className='ms-2'>
//                           {course.Durations || "Self-paced"}
//                         </span>
//                       </div>
//                       <div className='mb-2'>
//                         <strong>👨‍🏫 Instructor:</strong>
//                         <span className='ms-2'>
//                           {course.InstructorCourse || "Expert Team"}
//                         </span>
//                       </div>
//                       <div className='mb-2'>
//                         <strong>📅 Start Date:</strong>
//                         <span className='ms-2'>
//                           {formatDate(course.LastDate)}
//                         </span>
//                       </div>
//                       <div>
//                         <strong>🎓 Level:</strong>
//                         <span className='ms-2'>
//                           {course.level || "All levels"}
//                         </span>
//                       </div>
//                     </div>

//                     <div className='d-flex gap-2'>
//                       <Button
//                         variant='primary'
//                         size='lg'
//                         className='th-btn td_btn_in td_white_color td_accent_bg py-2 mb-2 border-0 rounded w-100 fw-semibold'
//                         onClick={() => handleCourseClick(course._id)}
//                       >
//                         🚀 Enroll Now
//                       </Button>

//                       {course.payNow && (
//                         <Button
//                           variant='primary'
//                           size='lg'
//                           className='th-btn td_btn_in td_white_color td_accent_bg py-2 mb-2 border-0 rounded w-100 fw-semibold'
//                           onClick={() => window.open(course.payNow, "_blank")}
//                         >
//                           🚀 Pay Now
//                         </Button>
//                       )}
//                     </div>

//                     {/* <Button
//                     variant="primary"
//                     size="lg"
//                     className="th-btn td_btn_in td_white_color td_accent_bg py-2 mb-2 border-0 rounded w-100 fw-semibold"
//                     onClick={() => handleCourseClick(course._id)}
//                   >
//                     🚀 Enroll Now
//                   </Button> */}

//                     <div className='border p-3 rounded-3'>
//                       <h5 className='mb-3'>What's Included</h5>
//                       <ul className='list-unstyled'>
//                         <li className='mb-2 d-flex align-items-start'>
//                           <span className='text-success me-2'>✔</span>
//                           <span>Certificate of completion</span>
//                         </li>
//                         <li className='mb-2 d-flex align-items-start'>
//                           <span className='text-success me-2'>✔</span>
//                           <span>Lifetime access to course materials</span>
//                         </li>
//                         <li className='mb-2 d-flex align-items-start'>
//                           <span className='text-success me-2'>✔</span>
//                           <span>Q&A support</span>
//                         </li>
//                         {course.downloadableResources && (
//                           <li className='d-flex align-items-start'>
//                             <span className='text-success me-2'>✔</span>
//                             <span>Downloadable resources</span>
//                           </li>
//                         )}
//                       </ul>
//                     </div>
//                   </div>

//                   <div className='mt-4 d-block d-lg-none'>
//                     <h4>Course Description</h4>
//                     <div
//                       dangerouslySetInnerHTML={{
//                         __html: sanitize(
//                           course.CourseDescription ||
//                             "No description available."
//                         ),
//                       }}
//                     />

//                     {course.curriculum && course.curriculum.length > 0 && (
//                       <>
//                         <h5 className='mt-4'>Curriculum</h5>
//                         <ul className='list-group'>
//                           {course.curriculum.map((item, index) => (
//                             <li
//                               key={index}
//                               className='list-group-item border-0 ps-0'
//                             >
//                               <strong>Module {index + 1}:</strong> {item}
//                             </li>
//                           ))}
//                         </ul>
//                       </>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </Card.Body>
//           </Card>

//           {relatedLoading ? (
//             <div className='text-center my-4'>
//               <Spinner animation='border' variant='secondary' />
//               <p className='mt-2'>Loading related courses...</p>
//             </div>
//           ) : relatedCourses.length > 0 ? (
//             <div className='mt-5'>
//               <h3 className='mb-4'>You Might Also Like</h3>
//               <Slider {...sliderSettings}>
//                 {relatedCourses.map((relatedCourse) => (
//                   <div key={relatedCourse._id} className='px-2'>
//                     <Card
//                       className='h-100 cursor-pointer shadow-sm'
//                       onClick={() => navigate(`/courses/${relatedCourse._id}`)}
//                     >
//                       <Card.Img
//                         variant='top'
//                         src={
//                           relatedCourse.imageUrl ||
//                           "https://via.placeholder.com/300x200?text=Course+Image"
//                         }
//                         alt={relatedCourse.title}
//                         style={{ height: "160px", objectFit: "cover" }}
//                       />
//                       <Card.Body>
//                         <Card.Title className='fs-6'>
//                           {relatedCourse.title}
//                         </Card.Title>
//                         <div className='d-flex justify-content-between align-items-center mt-3'>
//                           <span className='badge bg-secondary'>
//                             {relatedCourse.level || "All Levels"}
//                           </span>
//                           <strong className='text-primary'>
//                             {relatedCourse.price
//                               ? `$${relatedCourse.price}`
//                               : "Free"}
//                           </strong>
//                         </div>
//                       </Card.Body>
//                     </Card>
//                   </div>
//                 ))}
//               </Slider>
//             </div>
//           ) : null}
//         </Container>
//         <div className='col-md-12'>
//           <OtherCoursesSlider />
//         </div>
//       </Layout>
//     </>
//   );
// };
// export default CouresesFull;
// // export default ;
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import DOMPurify from "dompurify";
import dayjs from "dayjs";
import { Layout } from "../../layouts/Layout";
import { CoursesAllGrid } from "./CoursesAllGrid";
import OtherCoursesSlider from "../../pages/course/OtherCourses";
import { SliderCard } from "../../common/SliderCard";
import { useDispatch, useSelector } from "react-redux";
import { getBlogSEOById } from "../../Redux/features/blogSeo/blogSeoThunk";

const CouresesFull = () => {
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  const { routesData } = useSelector((state) => state.routes);

  const { path } = routesData.find((route) => route.element === "CourseNew");

  const { currentSEO } = useSelector((state) => state.blogSeo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (course && course?.seo) {
      dispatch(getBlogSEOById(course.seo));
    }
  }, [course]);

  useEffect(() => {
    if (currentSEO) {
      // Set document title
      document.title = currentSEO.title || "Default Course Title";

      // Set or update meta description
      const metaDescription = document.querySelector(
        "meta[name='description']"
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", currentSEO.description || "");
      } else {
        const descTag = document.createElement("meta");
        descTag.name = "description";
        descTag.content = currentSEO.description || "";
        document.head.appendChild(descTag);
      }

      // Set or update meta keywords
      const metaKeywords = document.querySelector("meta[name='keywords']");
      if (metaKeywords) {
        metaKeywords.setAttribute("content", currentSEO.keywords || "");
      } else {
        const keywordTag = document.createElement("meta");
        keywordTag.name = "keywords";
        keywordTag.content = currentSEO.keywords || "";
        document.head.appendChild(keywordTag);
      }
    }
  }, [currentSEO]);

  const handleSubSubcategoryClick = ({ id, name }) => {
    navigate(`${path}`, { state: { id, name, fromDetails: true } });
  };

  const { state } = useLocation();

  const id = state?.id;

  const handleCourseClick = (courseId) => {
    navigate(`/enroll/${courseId}`);
  };

  // ! url
  useEffect(() => {
    if (course && course.staticUrl) {
      const slug = course.staticUrl
        .toLowerCase()
        .replace(/"/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const newUrl = `/course/${slug}`;
      const currentPath = window.location.pathname;

      if (!currentPath.includes(slug)) {
        window.history.replaceState(null, "", newUrl);
      }

      const canonicalUrl = window.location.origin + newUrl;
      let link = document.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonicalUrl);
    }
  }, [course]);

  // useEffect(() => {
  //   if (course && course.staticUrl) {
  //     const slug = course.staticUrl
  //       .toLowerCase()
  //       .replace(/"/g, "")
  //       .replace(/[^a-z0-9]+/g, "-")
  //       .replace(/(^-|-$)+/g, "");

  //     const newUrl = `/course-details/${slug}`;
  //     const currentPath = window.location.pathname;

  //     if (!currentPath.includes(slug)) {
  //       window.history.replaceState(null, "", newUrl);
  //     }
  //   }
  // }, [course]);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the main course data
        const courseResponse = await axios.get(
          // `http://localhost:8000/api/courses/${id}`
          `http://localhost:8000/api/courses/${id}`
        );
        if (!courseResponse.data) {
          throw new Error("Course not found");
        }
        setCourse(courseResponse.data);

        // Fetch related courses if category exists
        if (courseResponse.data.category) {
          setRelatedLoading(true);
          const categoryId =
            typeof courseResponse.data.category === "object"
              ? courseResponse.data.category._id
              : courseResponse.data.category;
        }
      } catch (err) {
        console.error("Failed to fetch course:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          config: err.config,
        });
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load course details"
        );
        if (err.response?.status === 404) {
          navigate("/not-found", { replace: true });
        }
      } finally {
        setLoading(false);
        setRelatedLoading(false);
      }
    };

    fetchCourseData();
  }, [id, navigate]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
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

  // Updated sanitize function to allow table tags
  const sanitize = (dirty) => {
    return DOMPurify.sanitize(dirty, {
      ALLOWED_TAGS: [
        "p",
        "strong",
        "em",
        "ul",
        "ol",
        "li",
        "br",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
      ],
      ALLOWED_ATTR: ["style", "class", "border", "cellpadding", "cellspacing"],
    });
  };

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "Enroll anytime";
    return dayjs(dateString).format("MMMM D, YYYY");
  };

  if (loading) {
    return (
      <Container
        className='d-flex justify-content-center align-items-center'
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation='border' variant='primary' />
        <span className='ms-3'>Loading course details...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className='my-5'>
        <Alert variant='danger' className='text-center'>
          <h4>Error Loading Course</h4>
          <p>{error}</p>
          <Button variant='primary' onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!course) {
    return (
      <Container className='my-5'>
        <Alert variant='warning' className='text-center'>
          <h4>Course Not Found</h4>
          <p>The requested course could not be found.</p>
          <Button variant='primary' onClick={() => navigate("/courses")}>
            Browse All Courses
          </Button>
        </Alert>
      </Container>
    );
  }

  const handleBack = () => {
    if (state?.filter) {
      navigate(`${path}`, { state: { filter: state.filter } });
    } else {
      navigate(-1);
    }
  };

  return (
    <>
      <div className='col-md-12'>
        <div className='td_height_112 td_height_lg_60' />
        <SliderCard onSlideClick={handleSubSubcategoryClick} />
      </div>
      <Layout header={9} footer={1}>
        <Container className='my-5'>
          <Card className='mb-5 shadow rounded-4 border-0'>
            <Card.Header
              style={{ backgroundColor: "#BE191D" }}
              className=' text-white d-flex justify-content-between align-items-center rounded-top-4 px-4 py-3'
            >
              <h2 className='mb-0 fs-4 text-white'>
                {course.title || "Course Title"}

                <span className='ms-2'>
                  - {course?.subsubCategory?.name || "Self-paced"}
                </span>
              </h2>
              <Button variant='light' size='sm' onClick={handleBack}>
                ⬅ Back
              </Button>
            </Card.Header>

            <Card.Body className='px-0 py-0'>
              <div className='row g-0'>
                {/* Left Column - Video and Description */}
                <div className='col-md-7 p-4'>
                  <div className='ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm bg-dark'>
                    {course.URL ? (
                      <iframe
                        src={course.URL}
                        title={`${course.title} preview`}
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                        className='border-0'
                      ></iframe>
                    ) : (
                      <div className='d-flex justify-content-center align-items-center h-100 text-white'>
                        {/* <div className='text-center'> */}
                        {/* <div className='fs-1 mb-2'>🎬</div> */}
                        {/* <p>Video Coming Soon</p> */}
                        <img
                          className=' h-full w-full'
                          src={course.images}
                          alt=''
                        />
                        {/* </div> */}
                      </div>
                    )}
                  </div>

                  <div className='mt-4 d-none d-md-block'>
                    <h4>Course Description</h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sanitize(
                          course.CourseDescription ||
                            "No description available."
                        ),
                      }}
                      className='table-responsive' // Added for better table display
                    />

                    {course.curriculum && course.curriculum.length > 0 && (
                      <>
                        <h5 className='mt-4'>Curriculum</h5>
                        <ul className='list-group'>
                          {course.curriculum.map((item, index) => (
                            <li
                              key={index}
                              className='list-group-item border-0 ps-0'
                            >
                              <strong>Module {index + 1}:</strong> {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                <div className='col-md-5 p-4 border-start'>
                  {/* Right Column - Course Details */}
                  <div className=''>
                    <h4 className='mb-3 text-secondary d-flex align-items-center gap-2'>
                      <span>🔹</span> Course Details
                    </h4>

                    {course.features && course.features.length > 0 && (
                      <>
                        <h5>Features</h5>
                        <ul className='mb-4'>
                          {course.features.map((feature, i) => (
                            <li
                              key={i}
                              className='mb-2 d-flex align-items-start gap-2'
                            >
                              <span className='text-success'>✓</span> {feature}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className='bg-light p-3 rounded-3 mb-4'>
                      <div className='mb-2'>
                        <strong>💰 Price:</strong>
                        <span className='text-success fw-bold ms-2'>
                          {course.Price ? `₹${course.Price}` : "Free"}
                        </span>
                        {course.originalPrice &&
                          course.originalPrice > course.price && (
                            <span className='text-decoration-line-through text-muted ms-2'>
                              ₹{course.originalPrice}
                            </span>
                          )}
                      </div>
                      <div className='mb-2'>
                        <strong>⏳ Duration:</strong>
                        <span className='ms-2'>
                          {course.Durations || "Self-paced"}
                        </span>
                      </div>
                      {/* <div className='mb-2'>
                        <strong>👨‍🏫 Instructor:</strong>
                        <span className='ms-2'>
                          {course.InstructorCourse || "Expert Team"}
                        </span>
                      </div>
                      <div className='mb-2'>
                        <strong>📅 Start Date:</strong>
                        <span className='ms-2'>
                          {formatDate(course.LastDate)}
                        </span>
                      </div> */}
                      <div>
                        <strong>🎓 Level:</strong>
                        <span className='ms-2'>
                          {course.level || "All levels"}
                        </span>
                      </div>
                    </div>

                    <div className='d-flex gap-2'>
                      <Button
                        variant='primary'
                        size='lg'
                        className='th-btn td_btn_in td_white_color td_accent_bg py-2 mb-2 border-0 rounded w-100 fw-semibold'
                        onClick={() => handleCourseClick(course._id)}
                      >
                        🚀 Enroll Now
                      </Button>

                      {course.payNow && (
                        <Button
                          variant='primary'
                          size='lg'
                          className='th-btn td_btn_in td_white_color td_accent_bg py-2 mb-2 border-0 rounded w-100 fw-semibold'
                          onClick={() => window.open(course.payNow, "_blank")}
                        >
                          🚀 Pay Now
                        </Button>
                      )}
                    </div>

                    <div className='border p-3 rounded-3'>
                      <h5 className='mb-3'>What's Included</h5>
                      <ul className='list-unstyled'>
                        <li className='mb-2 d-flex align-items-start'>
                          <span className='text-success me-2'>✔</span>
                          <span>Certificate of completion</span>
                        </li>
                        <li className='mb-2 d-flex align-items-start'>
                          <span className='text-success me-2'>✔</span>
                          <span>Lifetime access to course materials</span>
                        </li>
                        <li className='mb-2 d-flex align-items-start'>
                          <span className='text-success me-2'>✔</span>
                          <span>Q&A support</span>
                        </li>
                        {course.downloadableResources && (
                          <li className='d-flex align-items-start'>
                            <span className='text-success me-2'>✔</span>
                            <span>Downloadable resources</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className='mt-4 d-block d-lg-none'>
                    <h4>Course Description</h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sanitize(
                          course.CourseDescription ||
                            "No description available."
                        ),
                      }}
                      className='table-responsive' // Added for better table display
                    />

                    {course.curriculum && course.curriculum.length > 0 && (
                      <>
                        <h5 className='mt-4'>Curriculum</h5>
                        <ul className='list-group'>
                          {course.curriculum.map((item, index) => (
                            <li
                              key={index}
                              className='list-group-item border-0 ps-0'
                            >
                              <strong>Module {index + 1}:</strong> {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {relatedLoading ? (
            <div className='text-center my-4'>
              <Spinner animation='border' variant='secondary' />
              <p className='mt-2'>Loading related courses...</p>
            </div>
          ) : relatedCourses.length > 0 ? (
            <div className='mt-5'>
              <h3 className='mb-4'>You Might Also Like</h3>
              <Slider {...sliderSettings}>
                {relatedCourses.map((relatedCourse) => (
                  <div key={relatedCourse._id} className='px-2'>
                    <Card
                      className='h-100 cursor-pointer shadow-sm'
                      onClick={() => navigate(`/courses/${relatedCourse._id}`)}
                    >
                      <Card.Img
                        variant='top'
                        src={
                          relatedCourse.imageUrl ||
                          "https://via.placeholder.com/300x200?text=Course+Image"
                        }
                        alt={relatedCourse.title}
                        style={{ height: "160px", objectFit: "cover" }}
                      />
                      <Card.Body>
                        <Card.Title className='fs-6'>
                          {relatedCourse.title}
                        </Card.Title>
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                          <span className='badge bg-secondary'>
                            {relatedCourse.level || "All Levels"}
                          </span>
                          <strong className='text-primary'>
                            {relatedCourse.price
                              ? `$${relatedCourse.price}`
                              : "Free"}
                          </strong>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Slider>
            </div>
          ) : null}
        </Container>
        <div className='col-md-12'>
          <OtherCoursesSlider />
        </div>
      </Layout>
    </>
  );
};

export default CouresesFull;
