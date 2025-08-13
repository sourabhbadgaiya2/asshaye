import React, { useState, useEffect } from "react";
import sampleImage from "../../assets/alec-img/blogs/eight.jpg";
import brochure from "../../assets/alec-img/blogs/eight.jpg";
import { Layout } from "../../layouts/Layout";
import { useLocation, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DOMPurify from "dompurify";
import SEO from "../../common/Seo";

const DetailSection = () => {
  const { id } = useParams();
  const [whatsNew, setWhatsNew] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { state } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://backend.aashayeinjudiciary.com/whatsnew/${state}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.success) {
          setWhatsNew(data.data);
        } else {
          throw new Error(data.message || "Data not found");
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
        toast.error(`Error loading details: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state]);

  const handleDownload = () => {
    if (whatsNew?.PDFbrochure) {
      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = whatsNew.PDFbrochure;
      link.download = whatsNew.PDFbrochure.split("/").pop() || "brochure.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Brochure download started");
    } else {
      toast.warning("No brochure available for download");
    }
  };

  // ! url
  useEffect(() => {
    if (whatsNew && whatsNew.staticUrl) {
      const slug = whatsNew.staticUrl
        .toLowerCase()
        .replace(/"/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");

      const newUrl = `/whats-new-detail/${slug}`;
      const currentPath = window.location.pathname;

      if (!currentPath.includes(slug)) {
        window.history.replaceState(null, "", newUrl);
      }
    }
  }, [whatsNew]);

  if (loading) {
    return (
      <Layout header={9} footer={1}>
        <div className='td_height_120 td_height_lg_60' />
        <div className='container py-5 text-center'>
          <div className='spinner-border text-primary' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <p className='mt-3'>Loading details...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout header={9} footer={1}>
        <div className='td_height_120 td_height_lg_60' />
        <div className='container py-5 text-center'>
          <div className='alert alert-danger'>
            <p>Error: {error}</p>
            <button
              className='btn btn-primary'
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  if (!whatsNew) {
    return (
      <Layout header={9} footer={1}>
        <div className='td_height_120 td_height_lg_60' />
        <div className='container py-5 text-center'>
          <div className='alert alert-warning'>
            <p>No details found for this item</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout header={9} footer={1}>
      <SEO
        title={whatsNew?.metaTitle}
        description={whatsNew?.metaDescription}
        keywords={whatsNew?.metaKeywords}
        canonical={whatsNew?.metaCanonical}
      />
      <ToastContainer position='top-right' autoClose={3000} />
      <div className='td_height_120 td_height_lg_60' />
      <section className='py-5 bg-light'>
        <div className='container'>
          <div className='row align-items-center'>
            {/* Left Side Image */}
            <div className='col-md-6 mb-4 mb-md-0'>
              <img
                src={whatsNew.images || sampleImage}
                alt={DOMPurify.sanitize(whatsNew.altText) || "Course Image"}
                className='img-fluid rounded shadow'
                style={{ maxHeight: "500px", objectFit: "cover" }}
              />
            </div>

            {/* Right Side Content */}
            <div className='col-md-6'>
              <h4
                className='mb-3 text-danger'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(whatsNew.Coursename),
                }}
              />
              <div className='d-flex align-items-center text-muted small fw-semibold mb-3'>
                <span
                  className='material-icons me-2'
                  style={{ fontSize: "16px" }}
                >
                  calendar_today
                </span>
                {new Date(whatsNew.createdAt).toLocaleDateString()}
              </div>
              {/* <p
                className="lead text-muted"
                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(whatsNew.CourseDescription || 'No description available') }}
              /> */}
              <p
                className='lead text-muted'
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(
                    (
                      whatsNew.CourseDescription || "No description available"
                    ).replace(/<img[^>]*>/g, "") // Remove all <img> tags
                  ),
                }}
              />
              {/* Download PDF Button */}
              <button
                onClick={handleDownload}
                className='btn btn-danger mt-4'
                disabled={!whatsNew.PDFbrochure}
              >
                <i className='fas fa-file-pdf me-2'></i>
                {whatsNew.PDFbrochure
                  ? "Download Brochure"
                  : "Brochure Not Available"}
              </button>

              {/* Additional details can be added here */}
              {whatsNew.additionalDetails && (
                <div className='mt-4'>
                  <h5 className='text-secondary'>Additional Information</h5>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(whatsNew.additionalDetails),
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DetailSection;
