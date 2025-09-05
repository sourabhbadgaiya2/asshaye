import React, { useEffect, useState } from "react";
import { Layout } from "../../layouts/Layout";
import { BlogContainer } from "../../components/blogs/BlogContainer";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";

import blogDetails1 from "../../assets/alec-img/blogs/one.jpg";
import avatar1 from "../../assets/alec-img/testi/aryan.jpg";
import OtherCoursesSlider from "../course/OtherCourses";
import MarqueeStrike from "../../components/popup/MarqueeStrike";
import { useDispatch, useSelector } from "react-redux";
import { getBlogSEOById } from "../../Redux/features/blogSeo/blogSeoThunk";
import SEO from "../../common/Seo";

export const BlogDetails = ({ courseId }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { routesData, loading: routesLoading } = useSelector(
    (state) => state.routes
  );

  const blogRoute = routesData.find((route) => route.element === "BlogDetails");

  const { currentSEO } = useSelector((state) => state.blogSeo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (product && product?.seo) {
      dispatch(getBlogSEOById(product.seo));
    }
  }, [product]);

  useEffect(() => {
    if (courseId) {
      axios
        .get(`/blog/display/${courseId}`)
        .then((res) => {
          setProduct(res.data);
        })
        .catch((err) => {
          setError("Failed to load course details");
          console.error(err);
        });
    }
  }, [courseId]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `https://asshaye.onrender.com/blog/${state.blogId}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product", err);
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  // ! url
  // useEffect(() => {
  //   if (product) {
  //     // Set tab title
  //     document.title = product.title || "Your Default Title";

  //     if (product.blogUrl) {
  //       const slug = product.blogUrl
  //         .toLowerCase()
  //         .replace(/"/g, "")
  //         .replace(/[^a-z0-9]+/g, "-")
  //         .replace(/(^-|-$)+/g, "");

  //       const newUrl = `/blog-details/${slug}`;

  //       const currentPath = window.location.pathname;

  //       if (!currentPath.includes(slug)) {
  //         window.history.replaceState(null, "", newUrl);
  //       }
  //     }
  //   }
  // }, [product]);

  useEffect(() => {
    if (product) {
      // Set tab title
      document.title = product.title || "Your Default Title";

      if (product.blogUrl) {
        const slug = product.blogUrl
          .toLowerCase()
          .replace(/"/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

        const newUrl = `/blog/${slug}`;

        const currentPath = window.location.pathname;

        if (!currentPath.includes(slug)) {
          window.history.replaceState(null, "", newUrl);
        } // ✅ नया Canonical URL लॉजिक यहाँ से शुरू होता है

        const canonicalUrl = window.location.origin + newUrl;
        let link = document.querySelector("link[rel='canonical']");

        if (!link) {
          link = document.createElement("link");
          link.setAttribute("rel", "canonical");
          document.head.appendChild(link);
        }
        link.setAttribute("href", canonicalUrl); // ✅ Canonical URL लॉजिक यहाँ खत्म होता है
      }
    }
  }, [product]);

  function cleanCKEditorHtml(html) {
    return html
      .replace(/<p>(&nbsp;|\s|<br\s*\/?>)*<\/p>/gi, "") // removes <p>&nbsp;</p>, <p> <br> </p>, etc.
      .replace(/&nbsp;/g, " "); // optional: replace remaining &nbsp; with space
  }

  if (loading) {
    return (
      <Layout header={9} footer={1}>
        <BlogContainer>
          <div className='td_center'>Loading...</div>
        </BlogContainer>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout header={9} footer={1}>
        <BlogContainer>
          <div className='td_center td_error'>{error}</div>
        </BlogContainer>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout header={9} footer={1}>
        <BlogContainer>
          <div className='td_center'>No blog found</div>
        </BlogContainer>
      </Layout>
    );
  }

  return (
    <Layout header={9} footer={1}>
      <SEO
        title={currentSEO?.title}
        description={currentSEO?.description}
        keywords={currentSEO?.keywords}
        canonical={currentSEO?.canonical}
      />
      {/* <MarqueeStrike /> */}
      <BlogContainer>
        <div className='td_blog_details_head td_mb_40'>
          {product.URL ? (
            <div
              className='embed-responsive embed-responsive-16by9 td_radius_10 '
              style={{ padding: 0 }}
            >
              <iframe
                className='embed-responsive-item'
                src={product.URL}
                allowFullScreen
                style={{ marginTop: 0, border: "none" }}
              ></iframe>
            </div>
          ) : (
            <div className='td_radius_10 td_mb_40' style={{ padding: 0 }}>
              <img
                className='w-100 h-auto'
                src={
                  Array.isArray(product.images)
                    ? product.images[0]
                    : product.images
                }
                alt={product.Alttage || "Blog image"}
                style={{
                  objectFit: "cover",
                  width: "100%",
                  height: "100%",
                  display: "block",
                }}
              />
            </div>
          )}

          <div className='td_blog_details_head_meta'>
            <div className='td_blog_details_avatar'>
              <img
                src={
                  Array.isArray(product.images)
                    ? product.images[0]
                    : product.images
                }
                alt='Avatar'
              />
              <p className='mb-0 td_heading_color td_bold'>
                <span className='td_normal td_opacity_5'>By</span>{" "}
                {product.author || "Unknown Author"}
              </p>
            </div>

            <ul className='td_blog_details_head_meta_list td_mp_0 td_heading_color'>
              <li>
                <div className='td_icon_btns'>
                  <span className='td_icon_btn td_center td_heading_color'>
                    <svg
                      width='13'
                      height='15'
                      viewBox='0 0 13 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M3.4375 0.75C3.65625 0.75 3.875 0.96875 3.875 1.1875V2.5H9.125V1.1875C9.125 0.96875 9.31641 0.75 9.5625 0.75C9.78125 0.75 10 0.96875 10 1.1875V2.5H10.875C11.832 2.5 12.625 3.29297 12.625 4.25V13C12.625 13.9844 11.832 14.75 10.875 14.75H2.125C1.14062 14.75 0.375 13.9844 0.375 13V4.25C0.375 3.29297 1.14062 2.5 2.125 2.5H3V1.1875C3 0.96875 3.19141 0.75 3.4375 0.75Z'
                        fill='currentColor'
                      />
                    </svg>
                  </span>
                </div>
                {dayjs(product.LastDate).format("DD MMM YYYY") ||
                  "Unknown date"}
              </li>
            </ul>
          </div>
        </div>

        <div className='td_blog_details'>
          {product.Description && (
            <div
              dangerouslySetInnerHTML={{
                __html: cleanCKEditorHtml(product.Description),
              }}
            />
          )}
        </div>
      </BlogContainer>
      <OtherCoursesSlider />
    </Layout>
  );
};
