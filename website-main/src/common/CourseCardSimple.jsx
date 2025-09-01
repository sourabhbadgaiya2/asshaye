import React, { useState } from "react";

import { Card, Button, Modal, Badge } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CourseCardSimple = ({ course, currentFilter }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDemoUrl, setSelectedDemoUrl] = useState("");
  const [selectedDemoTitle, setSelectedDemoTitle] = useState("");

  const handleOpenDemo = (url, title) => {
    setSelectedDemoUrl(url);
    setSelectedDemoTitle(title);
    setShowModal(true);
  };

  const handleCloseDemo = () => setShowModal(false);

  const img = Array.isArray(course.images)
    ? course.images[0]
    : typeof course.images === "string"
    ? course.images
    : null;

  const { routesData } = useSelector((state) => state.routes);

  const { path } = routesData.find((route) => route.element === "CouresesFull");

  return (
    <Card className='h-100 border-0 shadow-sm rounded-4 overflow-hidden hover-effect'>
      <div className='position-relative'>
        <Card.Img
          variant='top'
          src={img}
          alt={course.subCategory?.name || "Course"}
          className='img-fluid'
        />
        <Badge
          bg='danger'
          className='position-absolute top-0 end-0 m-2 text-uppercase'
        >
          {course.category?.name || "N/A"}
        </Badge>
      </div>

      <Card.Body className='p-3'>
        <h5 className='text-center fw-bold mb-3'>
          {course.subCategory?.name || "Course Title"}
        </h5>
        <div className='small'>
          <CourseDetail
            label='Judiciary:'
            value={course?.subsubCategory?.name}
          />
          <CourseDetail label='Price:' value={`₹ ${course.Price}`} />
          <CourseDetail label='Duration:' value={course.Durations} />
          <CourseDetail label='Faculty:' value={course.TrainerName} />
        </div>
      </Card.Body>

      <Card.Footer className='bg-white border-0 p-3 pt-0'>
        <div className='d-flex gap-2 justify-content-center'>
          {course.URL && (
            <Button
              variant='outline-danger'
              className='w-50 btn-sm'
              onClick={() => handleOpenDemo(course.URL, course.Coursename)}
            >
              Free Demo
            </Button>
          )}
          <Link to={`${path}`} state={{ id: course._id }} className='w-50'>
            <Button variant='outline-dark' className='w-100 btn-sm'>
              Explore
            </Button>
          </Link>
        </div>
        <Link
          to={`${path}`}
          state={{ id: course._id, filter: currentFilter }}
          className='btn btn-sm w-100 fw-semibold mt-2'
          style={{ backgroundColor: "#C81A1E", color: "white" }}
        >
          View Details
        </Link>
      </Card.Footer>

      {/* Demo Video Modal */}
      <Modal show={showModal} onHide={handleCloseDemo} size='lg' centered>
        <Modal.Header closeButton>
          <Modal.Title>Free Demo: {selectedDemoTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDemoUrl ? (
            <div className='ratio ratio-16x9'>
              <iframe
                src={selectedDemoUrl}
                title='Demo Video'
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className='text-center text-muted'>
              No demo video available for this course.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseDemo}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default CourseCardSimple;

const CourseDetail = ({ label, value }) => (
  <div className='d-flex justify-content-between py-1 border-bottom'>
    <span className='fw-semibold'>{label}</span>
    <span>{value || "N/A"}</span>
  </div>
);
