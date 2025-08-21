// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import React, { useEffect, useState } from "react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// // import "./SuccessStory.css"; // optional for custom styles

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation, Autoplay } from "swiper/modules";

// import post1 from "../../assets/alec-img/success/top1.jpg";
// import post2 from "../../assets/alec-img/success/top2.jpg";
// import post3 from "../../assets/alec-img/success/top3.jpg";
// import post4 from "../../assets/alec-img/success/top4.jpg";
// import post5 from "../../assets/alec-img/success/top5.jpg";
// import { Layout } from "../../layouts/Layout";

// const successStories = [
//   { name: "DWIJ SINGH SENGAR", service: "CHHATTISGARH JUDICIAL SERVICES - 2023", image: post1 },
//   { name: "ANJEETA KHUTEY", service: "CHHATTISGARH JUDICIAL SERVICES - 2023", image: post2 },
//   { name: "SHIVANGI SHARMA", service: "BIHAR JUDICIAL SERVICES - 2024", image: post3 },
//   { name: "ANJEETA KHUTEY", service: "CHHATTISGARH JUDICIAL SERVICES - 2023", image: post4 },
//   { name: "SHIVANGI SHARMA", service: "BIHAR JUDICIAL SERVICES - 2024", image: post5 },
//   { name: "DWIJ SINGH SENGAR", service: "CHHATTISGARH JUDICIAL SERVICES - 2023", image: post1 },
//   { name: "ANJEETA KHUTEY", service: "CHHATTISGARH JUDICIAL SERVICES - 2023", image: post2 },
//   { name: "SHIVANGI SHARMA", service: "BIHAR JUDICIAL SERVICES - 2024", image: post3 },
//   { name: "ANJEETA KHUTEY", service: "CHHATTISGARH JUDICIAL SERVICES - 2023", image: post4 },
//   { name: "SHIVANGI SHARMA", service: "BIHAR JUDICIAL SERVICES - 2024", image: post5 },
//   { name: "ANJEETA KHUTEY", service: "CHHATTISGARH JUDICIAL SERVICES - 2023", image: post4 },
//   { name: "SHIVANGI SHARMA", service: "BIHAR JUDICIAL SERVICES - 2024", image: post5 },
// ];

// export const SuccessStory = () => {
//   return (
//      const [stories, setStories] = useState([]);
//    const [loading, setLoading] = useState(true);
//  const [error, setError] = useState("");

//    useEffect(() => {
//     const fetchStories = async () => {
//       try {
//         const response = await fetch("https://backend.aashayeinjudiciary.com/success/display");
//         if (!response.ok) {
//           throw new Error("Failed to fetch success stories");
//         }
//         const data = await response.json();
//         setStories(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//        }
//      };

//      const storiesToShow = stories.length > 0 ? stories : staticStories;

//       <section className="py-5 text-center bg-light mt-0 mt-md-5">
//         <div className="px-3 px-md-5">
//           <h2 style={{  }} className="text-danger fw-bold text-uppercase">
//             Success Story
//           </h2>
//           <h3 className="fs-2 fw-bold mt-2 mb-4 text-dark">
//             Our Recent Success Stories
//           </h3>

//           <Swiper
//             slidesPerView={1}
//             spaceBetween={20}
//             pagination={{ clickable: true }}
//             navigation
//             autoplay={{ delay: 3000, disableOnInteraction: false }}
//             modules={[Pagination, Navigation, Autoplay]}
//             breakpoints={{
//               576: { slidesPerView: 1 },
//               768: { slidesPerView: 2 },
//               992: { slidesPerView: 3 },
//               1200: { slidesPerView: 4 },
//             }}
//             className="mySwiper"
//           >
//               {storiesToShow.map((story, index) => (
//               <SwiperSlide key={index}>
//                 <div className="card border-0 shadow-sm p-3 rounded-3 h-100">
//                   <img
//                    src={story.images ? story.images[0] : story.image}
//                   alt={story.StudentName || story.name}
//                     className="card-img-top rounded-3"
//                     style={{ height: "230px", objectFit: "cover" }}
//                   />
//                   <div className="card-body">
//                     <h5 className="card-title fw-bold text-dark">    {story.StudentName || story.name}</h5>
//                     <p className="card-text text-muted"> {story.Judicial || story.service}</p>
//                   </div>
//                 </div>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </div>
//       </section>
//     )
// };

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";

import post1 from "../../assets/alec-img/success/top1.jpg";
import post2 from "../../assets/alec-img/success/top2.jpg";
import post3 from "../../assets/alec-img/success/top3.jpg";
import post4 from "../../assets/alec-img/success/top4.jpg";
import post5 from "../../assets/alec-img/success/top5.jpg";
import { Link } from "react-router-dom";

const staticStories = [
  {
    name: "DWIJ SINGH SENGAR",
    service: "CHHATTISGARH JUDICIAL SERVICES - 2023",
    image: post1,
  },
  {
    name: "ANJEETA KHUTEY",
    service: "CHHATTISGARH JUDICIAL SERVICES - 2023",
    image: post2,
  },
  {
    name: "SHIVANGI SHARMA",
    service: "BIHAR JUDICIAL SERVICES - 2024",
    image: post3,
  },
  {
    name: "ANJEETA KHUTEY",
    service: "CHHATTISGARH JUDICIAL SERVICES - 2023",
    image: post4,
  },
  {
    name: "SHIVANGI SHARMA",
    service: "BIHAR JUDICIAL SERVICES - 2024",
    image: post5,
  },
];

export const SuccessStory = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  const storiesToShow = stories.length > 0 ? stories : staticStories;

  return (
    <section className="py-5 text-center bg-light mt-0 mt-md-5">
      <div className="px-3 px-md-5">
         <h4 className='td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color text-center'>Student Success Stories
</h4>
<p className='td_section_title text-center td_fs_20 mb-4'>  Success stories of determination from Aashayein Judiciary alumni.
    </p>

        {error && <p className="text-danger">Error: {error}</p>}

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Pagination, Navigation, Autoplay]}
          breakpoints={{
            576: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            992: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
          className="mySwiper"
        >
          {storiesToShow.map((story, index) => (

            <SwiperSlide key={index}>
              <Link to="/success-stories">

              <div className="card border-0 shadow-sm p-3 rounded-3 h-100">
                <img
                  src={story.images ? story.images[0] : story.image}
                  alt={story.StudentName || story.name}
                  className="card-img-top rounded-3 w-70"
                  style={{ objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-bold text-dark">
                    {story.StudentName || story.name}
                  </h5>
                  <p className="card-text text-muted">
                    {story.Judicial || story.service}
                  </p>
                  {story.description && (
                    <p className="card-text text-secondary mt-2" style={{ fontSize: '0.95em' }}>
                      {story.description}
                    </p>
                  )}
                </div>
              </div>
               </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStory;
