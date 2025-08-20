import React, { useEffect, useState } from "react";
import image1 from "../../assets/alec-img/blogs/one.jpg";
import image2 from "../../assets/alec-img/blogs/two.jpg";
import image3 from "../../assets/alec-img/blogs/three.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiDownload } from "react-icons/fi"; // ✅ Download icon
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const fallbackImages = [image1, image2, image3]; // Fallback carousel images

const Card = ({ date, content, images, PDFbrochure, id }) => {
  const navigate = useNavigate();

  const handleDownload = async (e) => {
    e.stopPropagation(); // Prevent triggering the card click
    try {
      // Download image
      if (images && typeof images === "string") {
        const response = await fetch(images);
        if (!response.ok) throw new Error("Failed to fetch image");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = images.split("/").pop() || "whatsnew-image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }

      // Download PDF
      if (PDFbrochure && typeof PDFbrochure === "string") {
        const response = await fetch(PDFbrochure);
        if (!response.ok) throw new Error("Failed to fetch PDF");
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = PDFbrochure.split("/").pop() || "whatsnew-brochure.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }

      if (!images && !PDFbrochure) {
        toast.error("No files available to download");
      } else {
        toast.success("Files downloaded successfully");
      }
    } catch (error) {
      console.error("Download error:", error);
      toast.error(`Error downloading files: ${error.message}`);
    }
  };

  const handleWhatsnew = () => {
    navigate(`/whats-new-detail/${id}`);
  };

  const { routesData } = useSelector((state) => state.routes);

  const { path } = routesData.find(
    (route) => route.element === "DetailSection"
  );

  console.log(path, "known");

  return (
    <div
      className='border-bottom py-3 d-flex justify-content-between align-items-center'
      // onClick={handleWhatsnew}
      style={{ cursor: "pointer" }}
    >
      <Link to={`${path}`} state={id}>
        <div>
          <div className='d-flex align-items-center text-muted small fw-semibold mb-1'>
            <span className='material-icons me-2' style={{ fontSize: "16px" }}>
              calendar_today
            </span>
            {date}
          </div>
          <p className='fst-italic mb-0 text-dark'>
            <span className='text-decoration-none text-dark'>{content}</span>
          </p>
        </div>

        {/* Download Icon */}
      </Link>
      {/* <FiDownload
          size={20}
          className='text-danger fw-bolder ms-2'
          title='Download'
          onClick={handleDownload}
        /> */}

      <FiDownload
        size={20}
        className='text-danger fw-bolder ms-2'
        title='Download'
        onClick={handleDownload}
      />
    </div>
  );
};

export default function RecentUpdates() {
  const [whatsNew, setWhatsNew] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch WhatsNew data
  useEffect(() => {
    const fetchWhatsNew = async () => {
      try {
        const response = await fetch(
          "https://backend.aashayeinjudiciary.com/whatsnew/alldisplay"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch WhatsNew entries");
        }
        const data = await response.json();
        const whatsNewArray = Array.isArray(data.data) ? data.data : [];
        setWhatsNew(whatsNewArray);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
        toast.error(`Error fetching WhatsNew entries: ${err.message}`);
        setLoading(false);
      }
    };
    fetchWhatsNew();
  }, []);

  // Auto-slide carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex + 1) % (whatsNew.length || fallbackImages.length)
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [whatsNew.length]);

  // Get carousel images (use API images or fallback)
  const carouselImages = whatsNew
    .filter((item) => item.images)
    .map((item) => item.images)
    .concat(fallbackImages)
    .slice(
      0,
      Math.max(
        whatsNew.filter((item) => item.images).length,
        fallbackImages.length
      )
    );

  if (loading) {
    return (
      <div className='bg-white  px-3 px-md-5 text-center'>
        <p className='text-gray-700'>Loading WhatsNew entries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='bg-white py-5 px-3 px-md-5 text-center'>
        <p className='text-danger'>Error: {error}</p>
      </div>
    );
  }

  return (
    <div className='bg-white py-5 px-3 px-md-5'>
      <ToastContainer position='top-right' autoClose={3000} />
      <h4 className='td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_10 text-uppercase td_accent_color text-center'>
       Latest Updates from Aashayein Judiciary

      </h4>
       <p className='td_section_title text-center td_fs_20 mb-4'> Stay informed with our newest announcements, exam updates, and study materials.
</p>



      <div className='row g-4' style={{ minHeight: "400px" }}>
        {/* Left image carousel */}
        <div className='col-md-6 d-flex align-items-center justify-content-center'>
          <img
            src={carouselImages[currentImageIndex] || fallbackImages[0]}
            alt='Recent Updates'
            className='img-fluid rounded shadow'
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>

        {/* Right updates section */}
        <div className='col-md-6 d-flex flex-column'>
          <div
            className='px-4 py-3 text-white fw-semibold d-flex align-items-center'
            style={{
              background: "linear-gradient(to right, #ED1E24, #b50004)",
            }}
          >
            <span className='material-icons me-2' style={{ fontSize: "18px" }}>
              Star
            </span>
            नया क्या है?
          </div>
          <div className='px-4 py-3 flex-grow-1 scrollable-area bg-light'>
            {whatsNew.length > 0 ? (
              whatsNew.map((item, idx) => (
                <Card
                  key={idx}
                  id={item._id} // Pass the ID to the
                  date={
                    item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString()
                      : "N/A"
                  }
                  content={item.Coursename || item._id}
                  images={item.images}
                  PDFbrochure={item.PDFbrochure}
                />
              ))
            ) : (
              <p>No WhatsNew entries found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Add custom scrollable area styles
const styles = `
  .scrollable-area {
    overflow-y: auto;
    max-height: 340px;
  }
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
