import React from "react";
import { Layout } from "../../layouts/Layout";
import { JudgementDetailContent } from "../../components/courses/JudgementDetailContent";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import OtherCoursesSlider from "./OtherCourses";
import SEO from "../../common/Seo";

export const JudgementDetails = ({ courseId }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { state } = useLocation();

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
          `https://backend.aashayeinjudiciary.com/judement/course/${state?.blogId}`
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

        const newUrl = `/Judgement-Details/${slug}`;

        const currentPath = window.location.pathname;

        if (!currentPath.includes(slug)) {
          window.history.replaceState(null, "", newUrl);
        }
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
      <SEO
        title={product?.metaTitle}
        description={product?.metaDescription}
        keywords={product?.metaKeywords}
        canonical={product?.metaCanonical}
      />
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
