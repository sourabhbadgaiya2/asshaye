import React from "react";
import { Layout } from "../../layouts/Layout";
import { JudgementDetailContent } from "../../components/courses/JudgementDetailContent";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import OtherCoursesSlider from "./OtherCourses";
import { getBlogSEOById } from "../../Redux/features/blogSeo/blogSeoThunk";
import { useDispatch, useSelector } from "react-redux";

export const JudgementDetails = ({ courseId }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { state } = useLocation();

  const { currentSEO } = useSelector((state) => state.blogSeo);

  const dispatch = useDispatch();

  // Url

  useEffect(() => {
    if (product && product?.seo) {
      dispatch(getBlogSEOById(product.seo));
    }
  }, [product]);

  useEffect(() => {
    if (currentSEO) {
      // Set document title
      document.title = currentSEO.title || "Default Blog Title";

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

  useEffect(() => {
    if (courseId) {
      axios
        .get(`/judement/course/${courseId}`)
        .then((res) => {
          setCourse(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch course", err);
        });
    }
  }, [courseId]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(
          `http://localhost:8000/judement/course/${state?.blogId}`
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
  useEffect(() => {
    if (product) {
      // Set tab title

      if (product.staticUrl) {
        const slug = product.staticUrl
          .toLowerCase()
          .replace(/"/g, "")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "");

        const newUrl = `/Judgement/${slug}`;

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
    }
  }, [product]);

  if (loading) return <div className='loading'>Loading...</div>;
  if (error) return <div className='error'>{error}</div>;

  const sanitizedDescription = product.description
    ? DOMPurify.sanitize(product.description)
    : "";

  return (
    <Layout header={9} footer={1}>
      <JudgementDetailContent
        id={id}
        alt={product.altText}
        images={product.images || []}
        title={product.title || ""}
        courseId={id}
      >
        <div className='td_blog_details'>
          <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }} />
        </div>
      </JudgementDetailContent>
      <OtherCoursesSlider />
    </Layout>
  );
};

export default JudgementDetails;
