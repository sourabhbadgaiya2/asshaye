// // import React, { useEffect, useState } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';
// // import Slider from 'react-slick';
// // import "slick-carousel/slick/slick.css";
// // import "slick-carousel/slick/slick-theme.css";
// // import axios from 'axios';
// // import DOMPurify from 'dompurify';
// // import dayjs from 'dayjs';
// // import { Layout } from '../../layouts/Layout';
// // import { CoursesAllGrid } from '../../components/courses/CoursesAllGrid';

// // const MainSeriesdeatils = () => {
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const [testSeries, setTestSeries] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [relatedTestSeries, setRelatedTestSeries] = useState([]);
// //   const [relatedLoading, setRelatedLoading] = useState(false);

// //   const handleEnrollClick = (testSeriesId) => {
// //     navigate(`/enroll/test-series/${testSeriesId}`);
// //   };

// //   useEffect(() => {
// //     const fetchTestSeriesData = async () => {
// //       try {
// //         setLoading(true);
// //         setError(null);

// //         // Fetch the main test series data
// //         const response = await axios.get(`http://localhost:8000/main/maintestseries/${id}`);
// //         if (!response.data) {
// //           throw new Error('Test series not found');
// //         }
// //         setTestSeries(response.data);

// //         // Fetch related test series if category exists
// //         if (response.data.category) {
// //           setRelatedLoading(true);
// //           const categoryId = typeof response.data.category === 'object'
// //             ? response.data.category._id
// //             : response.data.category;

// //           const relatedResponse = await axios.get(
// //             `http://localhost:8000/main/maintestseries?category=${categoryId}&limit=4&exclude=${id}`
// //           );
// //           setRelatedTestSeries(relatedResponse.data);
// //         }
// //       } catch (err) {
// //         console.error("Failed to fetch test series:", {
// //           message: err.message,
// //           status: err.response?.status,
// //           data: err.response?.data,
// //           config: err.config
// //         });
// //         setError(err.response?.data?.message || err.message || 'Failed to load test series details');
// //         if (err.response?.status === 404) {
// //           navigate('/not-found', { replace: true });
// //         }
// //       } finally {
// //         setLoading(false);
// //         setRelatedLoading(false);
// //       }
// //     };

// //     fetchTestSeriesData();
// //   }, [id, navigate]);

// //   const sliderSettings = {
// //     dots: true,
// //     infinite: true,
// //     speed: 500,
// //     slidesToShow: 3,
// //     slidesToScroll: 1,
// //     autoplay: true,
// //     autoplaySpeed: 3000,
// //     responsive: [
// //       {
// //         breakpoint: 992,
// //         settings: {
// //           slidesToShow: 2,
// //         }
// //       },
// //       {
// //         breakpoint: 768,
// //         settings: {
// //           slidesToShow: 1,
// //         }
// //       }
// //     ]
// //   };

// //   const sanitize = (dirty) => {
// //     return DOMPurify.sanitize(dirty, {
// //       ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
// //       ALLOWED_ATTR: []
// //     });
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return "Enroll anytime";
// //     return dayjs(dateString).format('MMMM D, YYYY');
// //   };

// //   if (loading) {
// //     return (
// //       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
// //         <Spinner animation="border" variant="primary" />
// //         <span className="ms-3">Loading test series details...</span>
// //       </Container>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <Container className="my-5">
// //         <Alert variant="danger" className="text-center">
// //           <h4>Error Loading Test Series</h4>
// //           <p>{error}</p>
// //           <Button variant="primary" onClick={() => window.location.reload()}>
// //             Try Again
// //           </Button>
// //         </Alert>
// //       </Container>
// //     );
// //   }

// //   if (!testSeries) {
// //     return (
// //       <Container className="my-5">
// //         <Alert variant="warning" className="text-center">
// //           <h4>Test Series Not Found</h4>
// //           <p>The requested test series could not be found.</p>
// //           <Button variant="primary" onClick={() => navigate('/test-series')}>
// //             Browse All Test Series
// //           </Button>
// //         </Alert>
// //       </Container>
// //     );
// //   }

// //   return (
// //     <>
// //       <div className="col-md-12">
// //         <CoursesAllGrid />
// //       </div>
// //       <Layout header={9} footer={1}>
// //         <Container className="my-5">
// //           <Card className="mb-5 shadow rounded-4 border-0">
// //             <Card.Header style={{ backgroundColor: "rgb(190, 25, 29)" }} className="text-white d-flex justify-content-between align-items-center rounded-top-4 px-4 py-3">
// //               <h2 className="mb-0 fs-4 text-white">{testSeries.testmodule || 'Test Series Title'}</h2>
// //               <Button variant="light" size="sm" onClick={() => navigate(-1)}>
// //                 ⬅ Back
// //               </Button>
// //             </Card.Header>

// //             <Card.Body className="px-0 py-0">
// //               <div className="row g-0">
// //                 {/* Left Column - Image and Description */}
// //                 <div className="col-md-7 p-4">
// //                   <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm bg-dark">
// //                     {testSeries.images && testSeries.images.length > 0 ? (
// //                       <img
// //                         src={testSeries.images[0]}
// //                         alt={`${testSeries.testmodule} preview`}
// //                         className="img-fluid w-100 h-100 object-fit-cover"
// //                       />
// //                     ) : (
// //                       <div className="d-flex justify-content-center align-items-center h-100 text-white">
// //                         <div className="text-center">
// //                           <div className="fs-1 mb-2">📝</div>
// //                           <p>Test Series Preview</p>
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>

// //                   <div className="mt-4">
// //                     <h4>Description</h4>
// //                     <div dangerouslySetInnerHTML={{ __html: sanitize(testSeries.CourseDescription || "No description available.") }} />

// //                     {testSeries.testmodule && (
// //                       <>
// //                         <h5 className="mt-4">Test Modules</h5>
// //                         <div className="bg-light p-3 rounded-3">
// //                           {testSeries.testmodule}
// //                         </div>
// //                       </>
// //                     )}
// //                   </div>
// //                 </div>

// //                 {/* Right Column - Test Series Details */}
// //                 <div className="col-md-5 p-4 border-start">
// //                   <h4 className="mb-3 text-secondary d-flex align-items-center gap-2">
// //                     <span>🔹</span> Test Series Details
// //                   </h4>

// //                   <div className="bg-light p-3 rounded-3 mb-4">
// //                     <div className="mb-2">
// //                       <strong>💰 Price:</strong>
// //                       <span className="text-success fw-bold ms-2">
// //                         {testSeries.Price ? `₹${testSeries.Price}` : 'Free'}
// //                       </span>
// //                     </div>
// //                     <div className="mb-2">
// //                       <strong>⏳ Duration:</strong>
// //                       <span className="ms-2">{testSeries.Durations || "Self-paced"}</span>
// //                     </div>
// //                     <div className="mb-2">
// //                       <strong>📅 Last Date:</strong>
// //                       <span className="ms-2">{formatDate(testSeries.LastDate)}</span>
// //                     </div>
// //                     <div>
// //                       <strong>📝 Tests:</strong>
// //                       <span className="ms-2">{testSeries.testmodule ? "Multiple tests" : "Not specified"}</span>
// //                     </div>
// //                   </div>

// //                   <Button
// //                     variant="primary"
// //                     size="lg"
// //                     className="th-btn td_btn_in td_white_color td_accent_bg py-2 mb-2 border-0 rounded w-100 fw-semibold btn btn-primary btn-lg"
// //                     onClick={() => handleEnrollClick(testSeries._id)}
// //                   >
// //                     🚀 Enroll Now
// //                   </Button>

// //                   <div className="border p-3 rounded-3">
// //                     <h5 className="mb-3">What's Included</h5>
// //                     <ul className="list-unstyled">
// //                       <li className="mb-2 d-flex align-items-start">
// //                         <span className="text-success me-2">✔</span>
// //                         <span>Comprehensive test series</span>
// //                       </li>
// //                       <li className="mb-2 d-flex align-items-start">
// //                         <span className="text-success me-2">✔</span>
// //                         <span>Detailed solutions</span>
// //                       </li>
// //                       <li className="mb-2 d-flex align-items-start">
// //                         <span className="text-success me-2">✔</span>
// //                         <span>Performance analysis</span>
// //                       </li>
// //                       <li className="d-flex align-items-start">
// //                         <span className="text-success me-2">✔</span>
// //                         <span>Time-bound tests</span>
// //                       </li>
// //                     </ul>
// //                   </div>
// //                 </div>
// //               </div>
// //             </Card.Body>
// //           </Card>

// //           {relatedLoading ? (
// //             <div className="text-center my-4">
// //               <Spinner animation="border" variant="secondary" />
// //               <p className="mt-2">Loading related test series...</p>
// //             </div>
// //           ) : relatedTestSeries.length > 0 ? (
// //             <div className="mt-5">
// //               <h3 className="mb-4">You Might Also Like</h3>
// //               <Slider {...sliderSettings}>
// //                 {relatedTestSeries.map((related) => (
// //                   <div key={related._id} className="px-2">
// //                     <Card
// //                       className="h-100 cursor-pointer shadow-sm"
// //                       onClick={() => navigate(`/test-series/${related._id}`)}
// //                     >
// //                       {related.images && related.images.length > 0 ? (
// //                         <Card.Img
// //                           variant="top"
// //                           src={related.images[0]}
// //                           alt={related.testmodule}
// //                           style={{ height: '160px', objectFit: 'cover' }}
// //                         />
// //                       ) : (
// //                         <div className="bg-secondary d-flex justify-content-center align-items-center" style={{ height: '160px' }}>
// //                           <span className="text-white">Test Series Image</span>
// //                         </div>
// //                       )}
// //                       <Card.Body>
// //                         <Card.Title className="fs-6">{related.testmodule}</Card.Title>
// //                         <div className="d-flex justify-content-between align-items-center mt-3">
// //                           <span className="badge bg-secondary">{related.Durations || 'Flexible'}</span>
// //                           <strong className="text-primary">
// //                             {related.Price ? `₹${related.Price}` : 'Free'}
// //                           </strong>
// //                         </div>
// //                       </Card.Body>
// //                     </Card>
// //                   </div>
// //                 ))}
// //               </Slider>
// //             </div>
// //           ) : null}
// //         </Container>
// //       </Layout>
// //     </>
// //   );
// // };

// // export default MainSeriesdeatils;

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Container, Card, Button, Spinner, Alert } from 'react-bootstrap';
// import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import axios from 'axios';
// import DOMPurify from 'dompurify';
// import dayjs from 'dayjs';
// import { Layout } from '../../layouts/Layout';
// import { CoursesAllGrid } from '../../components/courses/CoursesAllGrid';

// const MainSeriesdeatils = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [testSeries, setTestSeries] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [relatedTestSeries, setRelatedTestSeries] = useState([]);
//   const [relatedLoading, setRelatedLoading] = useState(false);

//   const handleEnrollClick = (testSeriesId) => {
//     navigate(`/enroll/test-series/${testSeriesId}`);
//   };

//   useEffect(() => {
//     const fetchTestSeriesData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         // Fetch the main test series data
//         const response = await axios.get(`http://localhost:8000/main/maintestseries/${id}`);
//         console.log(response,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
//         if (!response.data) {
//           throw new Error('Test series not found');
//         }
//         setTestSeries(response.data);

//         // Fetch related test series if category exists
//         if (response.data.category) {
//           setRelatedLoading(true);
//           const categoryId = typeof response.data.category === 'object'
//             ? response.data.category._id
//             : response.data.category;

//           // const relatedResponse = await axios.get(
//           //   `http://localhost:8000/test/preseries?category=${categoryId}&limit=4&exclude=${id}`
//           // );
//           // setRelatedTestSeries(relatedResponse.data);
//         }
//       } catch (err) {
//         console.error("Failed to fetch test series:", {
//           message: err.message,
//           status: err.response?.status,
//           data: err.response?.data,
//           config: err.config
//         });
//         setError(err.response?.data?.message || err.message || 'Failed to load test series details');
//         if (err.response?.status === 404) {
//           navigate('/not-found', { replace: true });
//         }
//       } finally {
//         setLoading(false);
//         setRelatedLoading(false);
//       }
//     };

//     fetchTestSeriesData();
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
//         }
//       },
//       {
//         breakpoint: 768,
//         settings: {
//           slidesToShow: 1,
//         }
//       }
//     ]
//   };

//   const sanitize = (dirty) => {
//     return DOMPurify.sanitize(dirty, {
//       ALLOWED_TAGS: ['p', 'strong', 'em', 'ul', 'ol', 'li', 'br', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
//       ALLOWED_ATTR: []
//     });
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "Enroll anytime";
//     return dayjs(dateString).format('MMMM D, YYYY');
//   };

//   if (loading) {
//     return (
//       <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
//         <Spinner animation="border" variant="primary" />
//         <span className="ms-3">Loading test series details...</span>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container className="my-5">
//         <Alert variant="danger" className="text-center">
//           <h4>Error Loading Test Series</h4>
//           <p>{error}</p>
//           <Button variant="primary" onClick={() => window.location.reload()}>
//             Try Again
//           </Button>
//         </Alert>
//       </Container>
//     );
//   }

//   if (!testSeries) {
//     return (
//       <Container className="my-5">
//         <Alert variant="warning" className="text-center">
//           <h4>Test Series Not Found</h4>
//           <p>The requested test series could not be found.</p>
//           <Button variant="primary" onClick={() => navigate('/test-series')}>
//             Browse All Test Series
//           </Button>
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <>
//       <div className="col-md-12">
//         <CoursesAllGrid />
//       </div>
//       <Layout header={9} footer={1}>
//         <Container className="my-5">
//           <Card className="mb-5 shadow rounded-4 border-0">
//             <Card.Header style={{ backgroundColor:"rgb(190, 25, 29)" }} className=" text-white d-flex justify-content-between align-items-center rounded-top-4 px-4 py-3">
//               <h2 className="mb-0 fs-4  text-white ">{testSeries.title || 'Test Series Title'}</h2>
//               <Button variant="light" size="sm" onClick={() => navigate(-1)}>
//                 ⬅ Back
//               </Button>
//             </Card.Header>

//             <Card.Body className="px-0 py-0">
//               <div className="row g-0">
//                 {/* Left Column - Image and Description */}
//                 <div className="col-md-7 p-4">
//                   <div className="ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm bg-dark">
//                     {testSeries.images && testSeries.images.length > 0 ? (
//                       <img
//                         src={testSeries.images[0]}
//                         alt={`${testSeries.title} preview`}
//                         className="img-fluid w-100 h-100 object-fit-cover"
//                       />
//                     ) : (
//                       <div className="d-flex justify-content-center align-items-center h-100 text-white">
//                         <div className="text-center">
//                           <div className="fs-1 mb-2">📝</div>
//                           <p>Test Series Preview</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="mt-4">
//                     <h4>Description</h4>
//                     <div dangerouslySetInnerHTML={{ __html: sanitize(testSeries.CourseDescription || "No description available.") }} />

//                     {testSeries.testmodule && (
//                       <>
//                         <h5 className="mt-4">Test Modules</h5>
//                         <div className="bg-light p-3 rounded-3">
//                           {testSeries.testmodule}
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {/* Right Column - Test Series Details */}
//                 <div className="col-md-5 p-4 border-start">
//                   <h4 className="mb-3 text-secondary d-flex align-items-center gap-2">
//                     <span>🔹</span> Test Series Details
//                   </h4>

//                   <div className="bg-light p-3 rounded-3 mb-4">
//                     <div className="mb-2">
//                       <strong>💰 Price:</strong>
//                       <span className="text-success fw-bold ms-2">
//                         {testSeries.Price ? `₹${testSeries.Price}` : 'Free'}
//                       </span>
//                     </div>
//                     <div className="mb-2">
//                       <strong>⏳ Duration:</strong>
//                       <span className="ms-2">{testSeries.Durations || "Self-paced"}</span>
//                     </div>
//                     <div className="mb-2">
//                       <strong>📅 Last Date:</strong>
//                       <span className="ms-2">{formatDate(testSeries.LastDate)}</span>
//                     </div>
//                     <div>
//                       <strong>📝 Tests:</strong>
//                       <span className="ms-2">{testSeries.testmodule ? "Multiple tests" : "Not specified"}</span>
//                     </div>
//                   </div>

//                   <Button
//                     variant="primary"
//                     size="lg"
//                     className="th-btn td_btn_in td_white_color td_accent_bg py-2 mb-2 border-0 rounded w-100 fw-semibold btn btn-primary btn-lg"
//                     onClick={() => handleEnrollClick(testSeries._id)}
//                   >
//                     🚀 Enroll Now
//                   </Button>

//                   <div className="border p-3 rounded-3">
//                     <h5 className="mb-3">What's Included</h5>
//                     <ul className="list-unstyled">
//                       <li className="mb-2 d-flex align-items-start">
//                         <span className="text-success me-2">✔</span>
//                         <span>Comprehensive test series</span>
//                       </li>
//                       <li className="mb-2 d-flex align-items-start">
//                         <span className="text-success me-2">✔</span>
//                         <span>Detailed solutions</span>
//                       </li>
//                       <li className="mb-2 d-flex align-items-start">
//                         <span className="text-success me-2">✔</span>
//                         <span>Performance analysis</span>
//                       </li>
//                       <li className="d-flex align-items-start">
//                         <span className="text-success me-2">✔</span>
//                         <span>Time-bound tests</span>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </Card.Body>
//           </Card>

//           {relatedLoading ? (
//             <div className="text-center my-4">
//               <Spinner animation="border" variant="secondary" />
//               <p className="mt-2">Loading related test series...</p>
//             </div>
//           ) : relatedTestSeries.length > 0 ? (
//             <div className="mt-5">
//               <h3 className="mb-4">You Might Also Like</h3>
//               <Slider {...sliderSettings}>
//                 {relatedTestSeries.map((related) => (
//                   <div key={related._id} className="px-2">
//                     <Card
//                       className="h-100 cursor-pointer shadow-sm"
//                       onClick={() => navigate(`/mainseries/${related._id}`)}
//                     >
//                       {related.images && related.images.length > 0 ? (
//                         <Card.Img
//                           variant="top"
//                           src={related.images[0]}
//                           alt={related.title}
//                           style={{ height: '160px', objectFit: 'cover' }}
//                         />
//                       ) : (
//                         <div className="bg-secondary d-flex justify-content-center align-items-center" style={{ height: '160px' }}>
//                           <span className="text-white">Test Series Image</span>
//                         </div>
//                       )}
//                       <Card.Body>
//                         <Card.Title className="fs-6">{related.title}</Card.Title>
//                         <div className="d-flex justify-content-between align-items-center mt-3">
//                           <span className="badge bg-secondary">{related.Durations || 'Flexible'}</span>
//                           <strong className="text-primary">
//                             {related.Price ? `₹${related.Price}` : 'Free'}
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
//       </Layout>
//     </>
//   );
// };

// export default MainSeriesdeatils;

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import DOMPurify from "dompurify";
import dayjs from "dayjs";
import { Layout } from "../../layouts/Layout";
import { CoursesAllGrid } from "../../components/courses/CoursesAllGrid";

const MainSeriesdeatils = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testSeries, setTestSeries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedTestSeries, setRelatedTestSeries] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);

  const handleEnrollClick = (testSeriesId) => {
    navigate(`/enroll/test-series/${testSeriesId}`);
  };

  useEffect(() => {
    const fetchTestSeriesData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch the main test series data
        const response = await axios.get(
          `http://localhost:8000/main/maintestseries/${id}`
        );
        // console.log(response.data.data, "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        if (!response.data) {
          throw new Error("Test series not found");
        }
        setTestSeries(response.data.data);

        // Fetch related test series if category exists
        if (response.data?.data.category) {
          setRelatedLoading(true);
          const categoryId =
            typeof response.data.category === "object"
              ? response.data.category._id
              : response.data.category;

          // const relatedResponse = await axios.get(
          //   `http://localhost:8000/test/preseries?category=${categoryId}&limit=4&exclude=${id}`
          // );
          // setRelatedTestSeries(relatedResponse.data);
        }
      } catch (err) {
        console.error("Failed to fetch test series:", {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
          config: err.config,
        });
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load test series details"
        );
        if (err.response?.status === 404) {
          navigate("/not-found", { replace: true });
        }
      } finally {
        setLoading(false);
        setRelatedLoading(false);
      }
    };

    fetchTestSeriesData();
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
      ],
      ALLOWED_ATTR: [],
    });
  };

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
        <span className='ms-3'>Loading test series details...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className='my-5'>
        <Alert variant='danger' className='text-center'>
          <h4>Error Loading Test Series</h4>
          <p>{error}</p>
          <Button variant='primary' onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </Alert>
      </Container>
    );
  }

  if (!testSeries) {
    return (
      <Container className='my-5'>
        <Alert variant='warning' className='text-center'>
          <h4>Test Series Not Found</h4>
          <p>The requested test series could not be found.</p>
          <Button variant='primary' onClick={() => navigate("/test-series")}>
            Browse All Test Series
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <>
      <div className='col-md-12'>
        <CoursesAllGrid />
      </div>
      <Layout header={9} footer={1}>
        <Container className='my-5'>
          <Card className='mb-5 shadow rounded-4 border-0'>
            <Card.Header
              style={{ backgroundColor: "rgb(190, 25, 29)" }}
              className=' text-white d-flex justify-content-between align-items-center rounded-top-4 px-4 py-3'
            >
              <h2 className='mb-0 fs-4  text-white '>
                {testSeries.title || "Test Series Title"}
              </h2>
              <Button variant='light' size='sm' onClick={() => navigate(-1)}>
                ⬅ Back
              </Button>
            </Card.Header>

            <Card.Body className='px-0 py-0'>
              <div className='row g-0'>
                {/* Left Column - Image and Description */}
                <div className='col-md-7 p-4'>
                  <div className='ratio ratio-16x9 rounded-3 overflow-hidden shadow-sm bg-dark'>
                    {testSeries.images && testSeries.images.length > 0 ? (
                      <img
                        src={testSeries.images[0]}
                        alt={`${testSeries.title} preview`}
                        className='img-fluid w-100 h-100 object-fit-cover'
                      />
                    ) : (
                      <div className='d-flex justify-content-center align-items-center h-100 text-white'>
                        <div className='text-center'>
                          <div className='fs-1 mb-2'>📝</div>
                          <p>Test Series Preview</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className='mt-4'>
                    <h4>Description</h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: sanitize(
                          testSeries.CourseDescription ||
                            "No description available."
                        ),
                      }}
                    />

                    {testSeries.testmodule && (
                      <>
                        <h5 className='mt-4'>Test Modules</h5>
                        <div className='bg-light p-3 rounded-3'>
                          {testSeries.testmodule}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Right Column - Test Series Details */}
                <div className='col-md-5 p-4 border-start'>
                  <h4 className='mb-3 text-secondary d-flex align-items-center gap-2'>
                    <span>🔹</span> Test Series Details
                  </h4>

                  <div className='bg-light p-3 rounded-3 mb-4'>
                    <div className='mb-2'>
                      <strong>💰 Price:</strong>
                      <span className='text-success fw-bold ms-2'>
                        {testSeries.Price ? `₹${testSeries.Price}` : "Free"}
                      </span>
                    </div>
                    <div className='mb-2'>
                      <strong>⏳ Duration:</strong>
                      <span className='ms-2'>
                        {testSeries.Durations || "Self-paced"}
                      </span>
                    </div>
                    <div className='mb-2'>
                      <strong>📅 Last Date:</strong>
                      <span className='ms-2'>
                        {formatDate(testSeries.LastDate)}
                      </span>
                    </div>
                    <div>
                      <strong>📝 Tests:</strong>
                      <span className='ms-2'>
                        {testSeries.testmodule
                          ? "Multiple tests"
                          : "Not specified"}
                      </span>
                    </div>
                  </div>

                  <div className='d-flex gap-2'>
                    <Button
                      variant='primary'
                      size='lg'
                      className='th-btn td_btn_in td_white_color td_accent_bg py-2 mb-2 border-0 rounded w-100 fw-semibold btn btn-primary btn-lg'
                      onClick={() => handleEnrollClick(testSeries._id)}
                    >
                      🚀 Enroll Now
                    </Button>

                    <Button
                      variant='primary'
                      size='lg'
                      className='th-btn td_btn_in td_white_color td_accent_bg py-2 mb-2 border-0 rounded w-100 fw-semibold'
                      onClick={() => handleEnrollClick(testSeries._id)}
                    >
                      🚀 Pay Now
                    </Button>
                  </div>

                  {/* <Button
                    variant="primary"
                    size="lg"
                    className="th-btn td_btn_in td_white_color td_accent_bg py-2 mb-2 border-0 rounded w-100 fw-semibold btn btn-primary btn-lg"
                    onClick={() => handleEnrollClick(testSeries._id)}
                  >
                    🚀 Enroll Now
                  </Button> */}

                  <div className='border p-3 rounded-3'>
                    <h5 className='mb-3'>What's Included</h5>
                    <ul className='list-unstyled'>
                      <li className='mb-2 d-flex align-items-start'>
                        <span className='text-success me-2'>✔</span>
                        <span>Comprehensive test series</span>
                      </li>
                      <li className='mb-2 d-flex align-items-start'>
                        <span className='text-success me-2'>✔</span>
                        <span>Detailed solutions</span>
                      </li>
                      <li className='mb-2 d-flex align-items-start'>
                        <span className='text-success me-2'>✔</span>
                        <span>Performance analysis</span>
                      </li>
                      <li className='d-flex align-items-start'>
                        <span className='text-success me-2'>✔</span>
                        <span>Time-bound tests</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {relatedLoading ? (
            <div className='text-center my-4'>
              <Spinner animation='border' variant='secondary' />
              <p className='mt-2'>Loading related test series...</p>
            </div>
          ) : relatedTestSeries.length > 0 ? (
            <div className='mt-5'>
              <h3 className='mb-4'>You Might Also Like</h3>
              <Slider {...sliderSettings}>
                {relatedTestSeries.map((related) => (
                  <div key={related._id} className='px-2'>
                    <Card
                      className='h-100 cursor-pointer shadow-sm'
                      onClick={() => navigate(`/test-series/${related._id}`)}
                    >
                      {related.images && related.images.length > 0 ? (
                        <Card.Img
                          variant='top'
                          src={related.images[0]}
                          alt={related.title}
                          style={{ height: "160px", objectFit: "cover" }}
                        />
                      ) : (
                        <div
                          className='bg-secondary d-flex justify-content-center align-items-center'
                          style={{ height: "160px" }}
                        >
                          <span className='text-white'>Test Series Image</span>
                        </div>
                      )}
                      <Card.Body>
                        <Card.Title className='fs-6'>
                          {related.title}
                        </Card.Title>
                        <div className='d-flex justify-content-between align-items-center mt-3'>
                          <span className='badge bg-secondary'>
                            {related.Durations || "Flexible"}
                          </span>
                          <strong className='text-primary'>
                            {related.Price ? `₹${related.Price}` : "Free"}
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
      </Layout>
    </>
  );
};

export default MainSeriesdeatils;
