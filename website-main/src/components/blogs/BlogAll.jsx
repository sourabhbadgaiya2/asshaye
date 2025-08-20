
import React, { useState, useEffect } from "react";
import { BlogPagination } from "./BlogPagination";
import { BlogItem } from "./BlogItem";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import post1 from "../../assets/alec-img/blogs/one.jpg";

import { BlogSidebar } from "./BlogSidebar";
import MarqueeStrike from "../popup/MarqueeStrike";

export const BlogAll = () => {
  const [allBlogs, setAllBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      // Updated filtering logic to check BlogCategory._id
      const filtered = allBlogs.filter(
        (blog) =>
          blog.BlogCategory && blog.BlogCategory._id === selectedCategoryId
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs(allBlogs);
    }
  }, [selectedCategoryId, allBlogs]);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(
        "https://backend.aashayeinjudiciary.com/blog/display"
      );
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      const blogsArray = Array.isArray(data) ? data : data.data || [];
      setAllBlogs(blogsArray);
      setFilteredBlogs(blogsArray);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error("Error fetching blogs: " + err.message);
      setLoading(false);
    }
  };

  const fallbackBlogPosts = [
    // ... (keep your existing fallback data)
  ];

  const displayBlogs =
    filteredBlogs.length > 0
      ? filteredBlogs
      : allBlogs.length > 0
      ? allBlogs
      : fallbackBlogPosts;

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <section id='margins-top'>
      <div className=' td_height_lg_20' />
      <MarqueeStrike />

      <div className='container '>
         <h4 className='text-center mt-2 mb-2 d-none d-sm-block td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_5 text-uppercase td_accent_color'>
               Explore Our Blogs
          </h4>


        <div className='row'>
          <div className='col-lg-4'>
            <BlogSidebar
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
            />
          </div>

          <div className='col-lg-8'>
            {selectedCategoryId && filteredBlogs.length === 0 ? (
              <NoBlogsMessage clearFilter={() => setSelectedCategoryId(null)} />
            ) : (
              <BlogList blogs={displayBlogs} />
            )}
          </div>
        </div>

        {/* <div className="td_height_60 td_height_lg_40" /> */}
        {/* <BlogPagination totalItems={displayBlogs.length} /> */}
      </div>
      {/* <div className="td_height_120 td_height_lg_80" /> */}
    </section>
  );
};

// Sub-components for better organization
const LoadingState = () => (
  <section id='margin-top'>
    <div className='td_height_120 td_height_lg_80' />
    <div className='container text-center'>
      <p>Loading blogs...</p>
    </div>
  </section>
);

const ErrorState = ({ error }) => (
  <section id='margin-top'>
    <div className='td_height_120 td_height_lg_80' />
    <div className='container text-center'>
      <p className='text-danger'>Error: {error}</p>
    </div>
  </section>
);

const NoBlogsMessage = ({ clearFilter }) => (
  <div className='alert alert-info'>
    No blogs found in this category.
    <button className='btn btn-link ms-2' onClick={clearFilter}>
      Show all blogs
    </button>
  </div>
);

const BlogList = ({ blogs }) => (
  <div className='row'>
    {blogs.map((blog, index) => {
      const blogDate = blog.LastDate
        ? new Date(blog.LastDate).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : blog.date || "No date";

      const blogImage =
        Array.isArray(blog.images) && blog.images.length > 0
          ? blog.images[0]
          : blog.image || post1;

      return (
        <div className='col-md-6 mb-4' key={blog._id || index}>
          <BlogItem
            image={blogImage}
            alt={blog.Alttage}
            date={blogDate}
            author={blog.author || "Unknown Author"}
            title={blog.title || "No Title"}
            excerpt={blog.excerpt || "No excerpt available"}
            blogId={blog._id}
          />
        </div>
      );
    })}
  </div>
);
