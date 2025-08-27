import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { Layout } from "../../layouts/Layout";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import OtherCoursesSlider from "../course/OtherCourses";
import { Helmet } from "react-helmet";

export const SyllabusDownload = () => {
  const [syllabusData, setSyllabusData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categorySEO, setCategorySEO] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);

  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
  });

  const { slug } = useParams();
  const { state } = useLocation();

  // console.log(syllabusData, "syllabus data");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://backend.aashayeinjudiciary.com/syllabus/category/${state?.id}`
        );
        setSyllabusData(res.data); // 👈 ensure array
        // Assuming category info is inside each syllabus item, we take the first one
        if (res.data.length > 0 && res.data[0].category) {
          const category = res.data[0].category;
          setCategorySEO({
            name: category.name,
            metaDescription: category.metaDescription,
            metaKeywords: category.metaKeywords,
            title: category.title,
            staticUrl: category.staticUrl,
            updatedAt: category.updatedAt,
          });
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [state]);

  const handleShowModal = (syllabus) => {
    setSelectedSyllabus({
      ...syllabus,
      pdfUrl: syllabus.PDFbrochure,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: "", email: "", phone: "", city: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDownloadPdf = (pdfUrl, courseName) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `${courseName}.pdf`;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await axios.post(
        "https://backend.aashayeinjudiciary.com/register/add",
        formData
      );
      if (selectedSyllabus?.pdfUrl) {
        handleDownloadPdf(selectedSyllabus.pdfUrl, selectedSyllabus.Coursename);
      }
      alert(`Syllabus Download SuccessFully`);
      handleCloseModal();
    } catch (err) {
      alert("Error submitting form. Please try again.");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingView />;
  if (error) return <ErrorView error={error} />;
  if (!syllabusData.length) return <EmptyView />;
  const canonicalUrl = window.location.href;

  return (
    <>
      {categorySEO && (
        <Helmet>
          <title>{categorySEO.title || categorySEO.name}</title>
          <meta
            name='description'
            content={categorySEO.metaDescription || ""}
          />
          <meta
            name='keywords'
            content={
              categorySEO.metaKeywords
                ? categorySEO.metaKeywords.join(", ")
                : ""
            }
          />
          <link rel='canonical' href={canonicalUrl} />
        </Helmet>
      )}
      <Layout header={9} footer={1}>
        <section className='ptb py-2'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-12' style={{ marginTop: "100px" }}>
                <div className='cart_wrapper'>
                  <SyllabusTable
                    syllabusData={syllabusData}
                    onDownloadClick={handleShowModal}
                  />
                </div>
              </div>
            </div>

            <DownloadModal
              show={showModal}
              onHide={handleCloseModal}
              onSubmit={handleSubmit}
              formData={formData}
              onInputChange={handleInputChange}
              courseName={selectedSyllabus?.Coursename}
              submitting={submitting}
            />
          </div>
        </section>
        <OtherCoursesSlider />
      </Layout>
    </>
  );
};

const SyllabusTable = ({ syllabusData, onDownloadClick }) => (
  <div className='table-responsive text-center'>
    <div className='cart_wrapper'>
      <h4 className=' d-none d-sm-block td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_5 text-uppercase td_accent_color'>
        Download the Syllabus for Judicial Services
      </h4>

      <Table striped bordered>
        <thead className='bg-dark text-white'>
          <tr>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Download PDF</th>
          </tr>
        </thead>
        <tbody>
          {syllabusData.map((item) => (
            <tr key={item._id}>
              <td>{item.Coursename}</td>
              <td>
                <Button
                  className='th-btn td_btn_in td_white_color td_accent_bg py-2 border-0 rounded  fw-semibold'
                  onClick={() => onDownloadClick(item)}
                >
                  Download
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  </div>
);

const DownloadModal = ({
  show,
  onHide,
  onSubmit,
  formData,
  onInputChange,
  courseName,
  submitting,
}) => (
  <Modal show={show} onHide={onHide} backdrop='static'>
    <Modal.Header closeButton>
      <Modal.Title>Download {courseName} Syllabus</Modal.Title>
    </Modal.Header>
    <Form onSubmit={onSubmit}>
      <Modal.Body>
        <Form.Group className='mb-3'>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type='text'
            name='name'
            value={formData.name}
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            name='email'
            value={formData.email}
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type='tel'
            name='phone'
            value={formData.phone}
            onChange={onInputChange}
            required
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            name='city'
            value={formData.city}
            onChange={onInputChange}
            required
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={onHide}>
          Close
        </Button>
        <Button variant='primary' type='submit' disabled={submitting}>
          {submitting ? "Processing..." : "Download"}
        </Button>
      </Modal.Footer>
    </Form>
  </Modal>
);

const LoadingView = () => (
  <Layout header={9} footer={1}>
    <section className='ptb ptb-xs-60 py-5'>
      <div className='container text-center'>
        <h4>Loading...</h4>
      </div>
    </section>
  </Layout>
);

const ErrorView = ({ error }) => (
  <Layout header={9} footer={1}>
    <section className='ptb ptb-xs-60 py-5'>
      <div className='container text-center'>
        <h4>Error: {error}</h4>
      </div>
    </section>
  </Layout>
);

const EmptyView = () => (
  <Layout header={9} footer={1}>
    <section className='ptb ptb-xs-60 py-5'>
      <div className='container text-center'>
        <h4>No syllabus available to download.</h4>
      </div>
    </section>
  </Layout>
);
