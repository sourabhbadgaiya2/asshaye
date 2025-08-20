// import React, { useState, useEffect, useCallback } from "react";
// import { BlogOneItem } from "./BlogOneItem";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

// import post1 from "../../assets/alec-img/blogs/one.jpg";
// import post2 from "../../assets/alec-img/blogs/two.jpg";
// import post3 from "../../assets/alec-img/blogs/three.jpg";

// export const BlogOne = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [judgement, setJudgement] = useState([]);

//   console.log(judgement, "judgment");

//   const navigate = useNavigate();

//   const fetchJudgement = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(
//         "https://backend.aashayeinjudiciary.com/judement/display"
//       );
//       if (!response.ok) throw new Error("Failed to fetch judgments");

//       const data = await response.json();
//       // console.log("API Response:", data); // Debug
//       setJudgement(data);

//       if (data.length === 0) {
//         setError("No judgments available.");
//       }
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchJudgement();
//     fetchBlogs();
//   }, []);

//   const fetchBlogs = async () => {
//     try {
//       const response = await fetch(
//         "https://backend.aashayeinjudiciary.com/blog/display"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch blogs");
//       }

//       const data = await response.json();
//       // console.log("Fetched blogs:", data);

//       const blogsArray = Array.isArray(data) ? data : data.data || [];
//       setBlogs(blogsArray);

//       setLoading(false);
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//       toast.error("Error fetching blogs: " + err.message);
//       setLoading(false);
//     }
//   };
//   const handleCourseClick = (blogId) => {
//     // console.log(blogId, "LLL");

//     // console.log("Navigating to blog with ID:", blogId);
//     navigate(`/blog-details/${blogId}`);
//   };
//   // Fallback blog posts if API fails
//   const fallbackBlogPosts = [
//     {
//       src: post1,
//       date: "22 Mar 2025",
//       author: "Aishwarya Chourasia",
//       title:
//         "Justice Yashwant Varma transfer? What is the In-House Enquiry Procedure?",
//       description:
//         "Introduction The legal fraternity was shaken when reports emerged regarding.",
//       delay: "0.2s",
//     },
//     {
//       src: post2,
//       date: "21 Mar 2025",
//       author: "Aishwarya Chourasia",
//       title: "How Can High Court Judges Be Removed?",
//       description:
//         "Recently a major controversy erupted after a large amount of unaccounted.",
//       delay: "0.3s",
//     },
//     {
//       src: post3,
//       date: "21 Mar 2025",
//       author: "Manas Shrivastava",
//       title:
//         "Vested and Contingent Interest under the Transfer of Property Act 1882",
//       description:
//         "When a property is transferred, the interest of the transferee.",
//       delay: "0.4s",
//     },
//   ];

//   if (loading) {
//     return (
//       <section>
//         <div className='td_height_20 td_height_lg_20' />
//         <div className='px-3 px-md-5 text-center'>
//           <p>Loading blogs...</p>
//         </div>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section>
//         <div className='td_height_20 td_height_lg_20' />
//         <div className='px-3 px-md-5 text-center'>
//           <p className='text-danger'>Error: {error}</p>
//         </div>
//       </section>
//     );
//   }

//   // Use API data if available, otherwise use fallback
//   const displayBlogs = blogs.length > 0 ? blogs.slice(0, 3) : fallbackBlogPosts;

//   return (
//     <section>
//       <div className='td_height_20 td_height_lg_20' />
//       <div className='px-3 px-md-5'>
//         <div
//           className='td_section_heading td_style_1 text-center wow fadeInUp'
//           data-wow-duration='1s'
//           data-wow-delay='0.2s'
//         >
//           <p className='td_section_subtitle_up td_fs_30 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color'>
//             BLOG & ARTICLES
//           </p>
//           <h2 className='td_section_title td_fs_30 mb-0'>
//             Take A Look At The Latest <br /> Articles
//           </h2>
//         </div>

//         <div className='td_height_50 td_height_lg_50' />

//         {/* Swiper Slider */}
//         {/* <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={20}
//           slidesPerView={1}
//           navigation={true}
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000 }}
//           loop={true}
//           breakpoints={{
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//           className='blog-slider'
//         >
//           {displayBlogs.map((blog, index) => {
//             // Format date from LastDate if it exists
//             const blogDate = blog.LastDate
//               ? new Date(blog.LastDate).toLocaleDateString("en-GB", {
//                   day: "numeric",
//                   month: "short",
//                   year: "numeric",
//                 })
//               : blog.date || "No date";

//             // Use first image from images array if available, otherwise use fallback image
//             const blogImage =
//               Array.isArray(blog.images) && blog.images.length > 0
//                 ? blog.images[0]
//                 : blog.src || post1;

//             const delay = `0.${index + 2}s`;

//             return (
//               <SwiperSlide key={blog._id || index}>
//                 <div
//                   className='wow fadeInUp'
//                   data-wow-duration='1s'
//                   data-wow-delay={delay}
//                 >
//                   <BlogOneItem
//                     src={blogImage}
//                     date={blogDate}
//                     author={blog.author || "Unknown Author"}
//                     title={blog.title || "No Title"}
//                     description={
//                       blog.description ||
//                       blog.excerpt ||
//                       "No description available"
//                     }
//                     // onClick={() => handleCourseClick(blog._id )}
//                     blogId={blog._id}
//                   />
//                 </div>
//               </SwiperSlide>
//             );
//           })}
//         </Swiper> */}
//         <Swiper
//           modules={[Navigation, Pagination, Autoplay]}
//           spaceBetween={20}
//           slidesPerView={1}
//           navigation={true}
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 3000 }}
//           loop={true}
//           breakpoints={{
//             768: { slidesPerView: 2 },
//             1024: { slidesPerView: 3 },
//           }}
//           className='blog-slider'
//         >
//           {displayItems.map((item, index) => {
//             const itemDate = item.LastDate
//               ? new Date(item.LastDate).toLocaleDateString("en-GB", {
//                   day: "numeric",
//                   month: "short",
//                   year: "numeric",
//                 })
//               : item.date || "No date";

//             const itemImage =
//               Array.isArray(item.images) && item.images.length > 0
//                 ? item.images[0]
//                 : item.src || post1;

//             const link =
//               item.type === "blog"
//                 ? `/blog-details/${item._id}`
//                 : `/judgement-details/${item._id}`;

//             const delay = `0.${index + 2}s`;

//             return (
//               <SwiperSlide key={item._id || index}>
//                 <div
//                   className='wow fadeInUp'
//                   data-wow-duration='1s'
//                   data-wow-delay={delay}
//                 >
//                   <BlogOneItem
//                     src={itemImage}
//                     date={itemDate}
//                     author={item.author || "Unknown Author"}
//                     title={item.title || "No Title"}
//                     description={
//                       item.description ||
//                       item.excerpt ||
//                       item.summary ||
//                       "No description available"
//                     }
//                     link={link}
//                   />
//                 </div>
//               </SwiperSlide>
//             );
//           })}
//         </Swiper>
//       </div>

//       <div className='td_height_60 td_height_lg_80' />
//     </section>
//   );
// };

import React, { useState, useEffect, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { toast } from "react-toastify";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "react-toastify/dist/ReactToastify.css";

import { BlogOneItem } from "./BlogOneItem";

import post1 from "../../assets/alec-img/blogs/one.jpg";
import post2 from "../../assets/alec-img/blogs/two.jpg";
import post3 from "../../assets/alec-img/blogs/three.jpg";
import { useSelector } from "react-redux";

export const BlogOne = () => {
  const [blogs, setBlogs] = useState([]);
  const [judgement, setJudgement] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log(blogs, "blogs");

  const { routesData, loading: routesLoading } = useSelector(
    (state) => state.routes
  );

  const blogRoute = routesData.find((route) => route.element === "BlogDetails");
  const judgementRoute = routesData.find(
    (route) => route.element === "JudgementDetails"
  );

  const fetchJudgement = useCallback(async () => {
    try {
      const response = await fetch(
        "https://backend.aashayeinjudiciary.com/judement/display"
      );
      if (!response.ok) throw new Error("Failed to fetch judgements");

      const data = await response.json();
      setJudgement(data);
    } catch (err) {
      console.error("Judgement fetch error:", err);
      setError(err.message);
    }
  }, []);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await fetch(
        "https://backend.aashayeinjudiciary.com/blog/display"
      );
      if (!response.ok) throw new Error("Failed to fetch blogs");

      const data = await response.json();
      const blogsArray = Array.isArray(data) ? data : data.data || [];
      setBlogs(blogsArray);
    } catch (err) {
      console.error("Blogs fetch error:", err);
      setError(err.message);
      toast.error("Error fetching blogs: " + err.message);
    }
  }, []);

  useEffect(() => {
    Promise.all([fetchJudgement(), fetchBlogs()]).finally(() => {
      setLoading(false);
    });
  }, [fetchJudgement, fetchBlogs]);

  const fallbackBlogPosts = [
    {
      src: post1,
      date: "22 Mar 2025",
      author: "Aishwarya Chourasia",
      title:
        "Justice Yashwant Varma transfer? What is the In-House Enquiry Procedure?",
      description:
        "Introduction The legal fraternity was shaken when reports emerged regarding.",
    },
    {
      src: post2,
      date: "21 Mar 2025",
      author: "Aishwarya Chourasia",
      title: "How Can High Court Judges Be Removed?",
      description:
        "Recently a major controversy erupted after a large amount of unaccounted.",
    },
    {
      src: post3,
      date: "21 Mar 2025",
      author: "Manas Shrivastava",
      title:
        "Vested and Contingent Interest under the Transfer of Property Act 1882",
      description:
        "When a property is transferred, the interest of the transferee.",
    },
  ];

  // Add type flag so we know what each is
  const displayBlogs = (
    blogs.length > 0 ? blogs.slice(0, 4) : fallbackBlogPosts
  ).map((b) => ({ ...b, type: "blog" }));

  const displayJudgements = (
    judgement.length > 0 ? judgement.slice(0, 4) : []
  ).map((j) => ({ ...j, type: "judgement" }));

  const displayItems = [...displayBlogs, ...displayJudgements];

  if (loading) {
    return (
      <section>
        <div className='td_height_20 td_height_lg_20' />
        <div className='px-3 px-md-5 text-center'>
          <p>Loading content...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <div className='td_height_20 td_height_lg_20' />
        <div className='px-3 px-md-5 text-center'>
          <p className='text-danger'>Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className='td_height_20 td_height_lg_20' />
      <div className='px-3 px-md-5'>
        <div
          className='td_section_heading td_style_1 text-center wow fadeInUp'
          data-wow-duration='1s'
          data-wow-delay='0.2s'
        >
                    <h4 className='td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_5 text-uppercase td_accent_color'>
            JUDICIARY Blogs & Judgements
          </h4>
       <p className='td_section_title text-center td_fs_20 mb-4'>  Knowledge to Power Your Success
    </p>
        </div>

        <div className='td_height_50 td_height_lg_50' />

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className='blog-slider'
        >
          {displayItems.map((item, index) => {
            const itemDate = item.LastDate
              ? new Date(item.LastDate).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })
              : item.date || "No date";

            const itemImage =
              Array.isArray(item.images) && item.images.length > 0
                ? item.images[0]
                : item.src || post1;

            const link =
              item.type === "blog"
                ? `${blogRoute?.path}`
                : `${judgementRoute?.path}`;

            const delay = `0.${index + 2}s`;

            return (
              <SwiperSlide key={item._id || index}>
                <div
                  className='wow fadeInUp'
                  data-wow-duration='1s'
                  data-wow-delay={delay}
                >
                  <BlogOneItem
                    src={itemImage}
                    date={itemDate}
                    author={item.author || "Unknown Author"}
                    title={item.title || "No Title"}
                    description={
                      item.description ||
                      item.excerpt ||
                      item.summary ||
                      "No description available"
                    }
                    link={link}
                    state={{ blogId: item._id }} // ✅ pass it!
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className='td_height_60 td_height_lg_80' />
    </section>
  );
};
