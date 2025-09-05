// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const videos = [
//   "https://www.youtube.com/embed/videoseries?si=zzlOIsNS2N8W8RQh&list=PLa1H6vWJbT7b4TBWsQMDj0A-JsD1z5Qw_",
//   "https://www.youtube.com/embed/mVAFWOSD3mk?si=okiVuUGtkeUZz-h6",
//   "https://www.youtube.com/embed/videoseries?si=JI1HT5mEZfROhDd1&list=PLa1H6vWJbT7aMN8Wo7hW9R1oLC0OCEYvQ",
//   "https://www.youtube.com/embed/videoseries?si=Esdldb7hmsk8HyQM&list=PLa1H6vWJbT7amlmNTmaG1du3jnxPEzNEt",
//   "https://www.youtube.com/embed/videoseries?si=Esdldb7hmsk8HyQM&list=PLa1H6vWJbT7amlmNTmaG1du3jnxPEzNEt",
// ];

// export const Slider = () => {

//   return (
//     <div style={{ backgroundColor:"#f8f9fa" }} className=" py-5">
//       <h2 className="td_section_title td_fs_30 mb-3 text-center">
//         Important courses available on YouTube
//       </h2>
//       <div className=" mx-auto px-3 px-md-5">
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={25}
//           slidesPerView={1}
//           breakpoints={{
//             640: { slidesPerView: 1 },
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//             1280: { slidesPerView: 4 },
//           }}
//           loop={true}
//           autoplay={{ delay: 3000 }}
//           pagination={{
//             clickable: true,
//             el: ".swiper-pagination", // Ensure dots appear inside this div
//           }}
//           navigation={true}
//           className="custom-swiper"
//         >
//           {videos.map((video, index) => (
//             <SwiperSlide key={index}>
//               <div className="video-container">
//                 <iframe
//                   height={250}
//                   width={390}
//                   className="w-full h-full"
//                   src={video}
//                   title={`Testimonial ${index + 1}`}
//                   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                   allowFullScreen
//                 ></iframe>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Pagination Dots Positioned Below Videos Like Success Story */}
//         <div className="swiper-pagination"></div>
//       </div>

//       {/* Custom CSS for Proper Positioning of Pagination Dots */}
//       <style jsx>{`
//         .video-container {
//           position: relative;
//           width: 100%;
//           height: 250px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: black;
//           border-radius: 10px;
//           overflow: hidden;
//         }
//         .swiper-pagination {
//           display: flex;
//           justify-content: center;
//           margin-top: 15px; /* Ensuring dots appear below videos */
//           position: relative;
//         }
//         .swiper-pagination-bullet {
//           width: 12px;
//           height: 12px;
//           background-color: #ccc;
//           opacity: 1;
//           margin: 0 5px;
//           transition: all 0.3s ease-in-out;
//         }
//         .swiper-pagination-bullet-active {
//           background-color: #dc2626;
//           transform: scale(1.3);
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Slider;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Slider = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const response = await axios.get(
          "https://asshaye.onrender.com/url/display"
        );
        setStories(response.data.data);
        // console.log(stories, "aaaaaaaaaaaaaaaaaaaaaaaaaa");
      } catch (err) {
        setError("Failed to fetch video URLs");
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div style={{ backgroundColor: "#f8f9fa" }} className='py-5'>
      <h4 className='td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color text-center'>
        Important courses available on YouTube
      </h4>

      <div className='mx-auto px-3 px-md-5'>
        {loading ? (
          <p className='text-center text-gray-500'>Loading videos...</p>
        ) : error ? (
          <p className='text-center text-red-500'>{error}</p>
        ) : stories.length === 0 ? (
          <p className='text-center text-gray-500'>No videos available.</p>
        ) : (
          <>
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={25}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              loop={true}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true, el: ".swiper-pagination" }}
              navigation={true}
              className='custom-swiper'
            >
              {stories.map((story, idx) => (
                <SwiperSlide key={idx}>
                  <div className='video-container w-full h-64 sm:h-96'>
                    <iframe
                      width='100%'
                      height='100%'
                      className='w-full h-full rounded-lg'
                      src={story.URL}
                      title={`Course Video ${idx + 1}`}
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    ></iframe>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className='swiper-pagination'></div>
          </>
        )}
      </div>

      <style jsx>{`
        .video-container {
          position: relative;
          width: 100%;
          height: 250px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: black;
          border-radius: 10px;
          overflow: hidden;
        }
        .swiper-pagination {
          display: flex;
          justify-content: center;
          margin-top: 15px;
          position: relative;
        }
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background-color: #ccc;
          opacity: 1;
          margin: 0 5px;
          transition: all 0.3s ease-in-out;
        }
        .swiper-pagination-bullet-active {
          background-color: #dc2626;
          transform: scale(1.3);
        }
      `}</style>
    </div>
  );
};

export default Slider;
