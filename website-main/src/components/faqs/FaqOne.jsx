// import React from "react";
// import { useHobble } from "../../lib/hooks/useHobble";
// import { useAccordion } from "../../lib/hooks/useAccordion";

// import faqShape5 from "../../assets/img/home_4/faq_shape_5.svg";
// import faqShape6 from "../../assets/img/home_4/faq_shape_6.svg";
// import faqShape7 from "../../assets/img/home_4/faq_shape_7.svg";

// export const FaqOne = () => {zz
//   useHobble();
//   useAccordion();

//   return (
//     <div className="td_gray_bg_8 td_shape_section_4 td_hobble">
//       <div className="td_shape td_shape_position_1 td_hover_layer_5">
//         <img src={faqShape5} alt="FAQ Shape 5" />
//       </div>
//       <div className="td_shape td_shape_position_2">
//         <img src={faqShape6} alt="FAQ Shape 6" />
//       </div>
//       <div className="td_shape td_shape_position_3 td_hover_layer_3">
//         <img src={faqShape7} alt="FAQ Shape 7" />
//       </div>
//       <div className="td_shape td_shape_position_4">
//         <img src={faqShape5} alt="FAQ Shape 5" />
//       </div>
//       <div className="td_height_112 td_height_lg_75" />
//       <div className="container">
//         <div className="row align-items-center td_gap_y_40">
//           <div
//             className="col-xl-12 wow fadeInLeft"
//             data-wow-duration="1s"
//             data-wow-delay="0.3s"
//           >
//             <div className="td_section_heading td_style_1">
//               <p className="td_section_subtitle_up td_fs_30 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color">
//                 FREQUENTLY ASKED QUESTIONS
//               </p>
//               {/* <h2 className="td_section_title td_fs_30 mb-0">
//                 We are The Best Kids School in City
//               </h2> */}
//             </div>
//             <div className="td_height_50 td_height_lg_50" />
//             <div className="td_accordians td_style_1 td_type_1">
//               <div className="td_accordian active">
//                 <div className="td_accordian_head">
//                   <h2 className="td_accordian_title td_fs_20 td_medium">
//                    1.	What are the fees for Aashayein Judiciary's online coaching classes?
//                   </h2>
//                   <span className="td_accordian_toggle">
//                     <svg
//                       width="14"
//                       height="9"
//                       viewBox="0 0 14 9"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                       role="presentation"
//                     >
//                       <path
//                         d="M12.355 9L7 3.43725L1.645 9L0 7.28745L7 -9.53674e-07L14 7.28745L12.355 9Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </span>
//                 </div>
//                 <div className="td_accordian_body">
//                   <p>
//                    The fees for Aashayein Judiciary online coaching classes vary depending on the course and duration. To get the most accurate and updated fee structure, please visit our website or contact our support team directly.

//                   </p>
//                 </div>
//               </div>

//               <div className="td_accordian">
//                 <div className="td_accordian_head">
//                   <h2 className="td_accordian_title td_fs_20 td_medium">
//                    2.	What study materials are provided by Aashayein Judiciary?
//                   </h2>
//                   <span className="td_accordian_toggle">
//                     <svg
//                       width="14"
//                       height="9"
//                       viewBox="0 0 14 9"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                       role="presentation"
//                     >
//                       <path
//                         d="M12.355 9L7 3.43725L1.645 9L0 7.28745L7 -9.53674e-07L14 7.28745L12.355 9Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </span>
//                 </div>
//                 <div className="td_accordian_body">
//                   <p>
//                    Aashayein Judiciary provides an extensive range of study materials tailored for judiciary exam preparation. These include detailed subject notes, case law summaries, previous year question papers, mock tests, and more. Our study materials are regularly updated to reflect the latest exam patterns and syllabus.
//                   </p>
//                 </div>
//               </div>

//               <div className="td_accordian">
//                 <div className="td_accordian_head">
//                   <h2 className="td_accordian_title td_fs_20 td_medium">
//                    3.	Who are the faculty members at Aashayein Judiciary?
//                   </h2>
//                   <span className="td_accordian_toggle">
//                     <svg
//                       width="14"
//                       height="9"
//                       viewBox="0 0 14 9"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                       role="presentation"
//                     >
//                       <path
//                         d="M12.355 9L7 3.43725L1.645 9L0 7.28745L7 -9.53674e-07L14 7.28745L12.355 9Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </span>
//                 </div>
//                 <div className="td_accordian_body">
//                   <p>
//                     Aashayein Judiciary boasts a team of highly experienced and qualified faculty members who are experts in their respective fields. Our faculty includes former judges, legal scholars, and practicing lawyers who bring a wealth of knowledge and practical insights to the classroom. Detailed profiles of our faculty members are available on our website.

//                   </p>
//                 </div>
//               </div>

//               <div className="td_accordian">
//                 <div className="td_accordian_head">
//                   <h2 className="td_accordian_title td_fs_20 td_medium">
//                   4.	If I miss Judiciary Online Classes, can I watch them again?
//                   </h2>
//                   <span className="td_accordian_toggle">
//                     <svg
//                       width="14"
//                       height="9"
//                       viewBox="0 0 14 9"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                       role="presentation"
//                     >
//                       <path
//                         d="M12.355 9L7 3.43725L1.645 9L0 7.28745L7 -9.53674e-07L14 7.28745L12.355 9Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </span>
//                 </div>
//                 <div className="td_accordian_body">
//                   <p>
//                    Yes, if you cannot attend the live classes, you can watch the videos later whenever your time permits.
//                   </p>
//                 </div>
//               </div>

//                <div className="td_accordian">
//                 <div className="td_accordian_head">
//                   <h2 className="td_accordian_title td_fs_20 td_medium">
//                   5.	Can I get free study materials along with Judiciary Coaching Online classes?
//                   </h2>
//                   <span className="td_accordian_toggle">
//                     <svg
//                       width="14"
//                       height="9"
//                       viewBox="0 0 14 9"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                       role="presentation"
//                     >
//                       <path
//                         d="M12.355 9L7 3.43725L1.645 9L0 7.28745L7 -9.53674e-07L14 7.28745L12.355 9Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </span>
//                 </div>
//                 <div className="td_accordian_body">
//                   <p>
//               Yes, along with the online classes, we provide free subject-wise study materials PDF. These materials are curated from respective subject expertise.                   </p>
//                 </div>
//               </div>

//                <div className="td_accordian">
//                 <div className="td_accordian_head">
//                   <h2 className="td_accordian_title td_fs_20 td_medium">
//                  6.	Which is the best institute for judicial coaching?
//                   </h2>
//                   <span className="td_accordian_toggle">
//                     <svg
//                       width="14"
//                       height="9"
//                       viewBox="0 0 14 9"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                       role="presentation"
//                     >
//                       <path
//                         d="M12.355 9L7 3.43725L1.645 9L0 7.28745L7 -9.53674e-07L14 7.28745L12.355 9Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </span>
//                 </div>
//                 <div className="td_accordian_body">
//                   <p>
// If you searching for the best institute for the preparation of judicial coaching, visit Toprankers.com. it offers well interactive online classes. Only Subject matter experts are appointed as the faculties. They even offer separate doubt regular doubt solving sessions and free mock tests.                  </p>
//                 </div>
//               </div>

//                <div className="td_accordian">
//                 <div className="td_accordian_head">
//                   <h2 className="td_accordian_title td_fs_20 td_medium">
//                  7.	Should I practice with preparation for the judiciary?
//                   </h2>
//                   <span className="td_accordian_toggle">
//                     <svg
//                       width="14"
//                       height="9"
//                       viewBox="0 0 14 9"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                       aria-hidden="true"
//                       role="presentation"
//                     >
//                       <path
//                         d="M12.355 9L7 3.43725L1.645 9L0 7.28745L7 -9.53674e-07L14 7.28745L12.355 9Z"
//                         fill="white"
//                       />
//                     </svg>
//                   </span>
//                 </div>
//                 <div className="td_accordian_body">
//                   <p>
// Any student who aspires to serve in judicial services need to work and study with dedication and should work hard to reach the ultimate goal. Candidate must cover the whole syllabus and keep sufficient time for revision. Along with completing the syllabus, the candidate should practice a lot, because practicing is the key to remember.                   </p>
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* <div
//             className="col-xl-6 wow fadeInRight"
//             data-wow-duration="1s"
//             data-wow-delay="0.4s"
//           >
//             <div className="td_image_box td_style_9">
//               <div className="td_image_box_img_1">
//                 <img src={faqImg} alt="FAQ Image" />
//               </div>
//               <div className="td_image_box_shape_2 position-absolute td_hover_layer_3">
//                 <img src={faqShape1} alt="FAQ Shape 1" />
//               </div>
//               <div className="td_image_box_shape_3 position-absolute td_hover_layer_5">
//                 <img src={faqShape2} alt="FAQ Shape 2" />
//               </div>
//               <div className="td_image_box_shape_4 position-absolute td_hover_layer_3">
//                 <img src={faqShape3} alt="FAQ Shape 3" />
//               </div>
//               <div className="td_image_box_shape_5 position-absolute">
//                 <img src={faqShape4} alt="FAQ Shape 4" />
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </div>
//       <div className="td_height_120 td_height_lg_80" />
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { useHobble } from "../../lib/hooks/useHobble";
import { useAccordion } from "../../lib/hooks/useAccordion";
import axios from "axios";
import faqShape5 from "../../assets/img/home_4/faq_shape_5.svg";
import faqShape6 from "../../assets/img/home_4/faq_shape_6.svg";
import faqShape7 from "../../assets/img/home_4/faq_shape_7.svg";

export const FaqOne = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const response = await axios.get(
          "https://backend.aashayeinjudiciary.com/faq/"
        );
        setFaqs(response.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch FAQs");
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  useHobble();
  useAccordion();

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading) return <div>Loading FAQs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="td_gray_bg_8 td_shape_section_4 td_hobble">
      <div className="td_shape td_shape_position_1 td_hover_layer_5">
        <img src={faqShape5} alt="FAQ Shape 5" />
      </div>
      <div className="td_shape td_shape_position_2">
        <img src={faqShape6} alt="FAQ Shape 6" />
      </div>
      <div className="td_shape td_shape_position_3 td_hover_layer_3">
        <img src={faqShape7} alt="FAQ Shape 7" />
      </div>
      <div className="td_shape td_shape_position_4">
        <img src={faqShape5} alt="FAQ Shape 5" />
      </div>
      <div className="td_height_112 td_height_lg_75" />
      <div className="container">
        <div className="row align-items-center td_gap_y_40">
          <div
            className="col-xl-12 wow fadeInLeft"
            data-wow-duration="1s"
            data-wow-delay="0.3s"
          >
            <div className="td_section_heading td_style_1">
                      <h4 className='td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_5 text-uppercase td_accent_color'>
         FREQUENTLY ASKED QUESTIONS
          </h4>
            
            </div>
            <div className="td_height_50 td_height_lg_50" />
            <div className="td_accordians td_style_1 td_type_1">
              {faqs.map((faq, index) => (
                <div
                  className={`td_accordian ${
                    activeIndex === index ? "active" : ""
                  }`}
                  key={faq.id || index}
                >
                  <div
                    className="td_accordian_head"
                    onClick={() => toggleAccordion(index)}
                  >
                    <h2 className="td_accordian_title td_fs_20 td_medium">
                      {faq.title}
                    </h2>
                    <span className="td_accordian_toggle">
                      <svg
                        width="14"
                        height="9"
                        viewBox="0 0 14 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="presentation"
                        className={activeIndex === index ? "rotate-180" : ""}
                      >
                        <path
                          d="M12.355 9L7 3.43725L1.645 9L0 7.28745L7 -9.53674e-07L14 7.28745L12.355 9Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                  </div>
                  <div
                    className="td_accordian_body"
                    style={{
                      display: activeIndex === index ? "block" : "none",
                    }}
                  >
                    <p alt={faq.altText}>{faq.response}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="td_height_120 td_height_lg_80" />
    </div>
  );
};
