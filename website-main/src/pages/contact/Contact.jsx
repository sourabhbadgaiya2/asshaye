import React, { useEffect, useState } from "react";
import { Layout } from "../../layouts/Layout";
import contactImg from "../../assets/alec-img/contact/enquiry.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const SITE_KEY = "6LdBFVArAAAAAF4__ail1UuDTBnqlCt0UCPYVRnC";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    captchaToken: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleCaptcha = (value) => {
    setFormData((prev) => ({
      ...prev,
      captchaToken: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/contact/add",
        // "http://localhost:8000/contact/add",
        formData
      );

      console.log("API Response:", response.data);
      setSubmitStatus({
        success: true,
        message: "Your message has been sent successfully!",
      });
      toast.success("Your message has been sent successfully!");

      setFormData({
        name: "",
        email: "",
        // city: "",
        phone: "",
        message: "",
        captchaToken: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
      toast.error("Failed to send message. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout header={9} footer={1}>
      <section id='margin-top' className='contact-section py-5 bg-light'>
        <div className='container'>
          <div className='row g-4 d-flex align-items-stretch'>
            {/* Left: Contact Form */}
            <div className='col-lg-6 d-flex'>
              <div className='contact-form p-4 shadow rounded bg-white w-100 h-100'>
                <h4 className=' d-none d-sm-block td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_5 text-uppercase td_accent_color'>
                  Contact Us
                </h4>

                <form onSubmit={handleSubmit}>
                  <div className='mb-3'>
                    <label className='form-label fw-semibold'>Full Name</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter your name'
                      required
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-3'>
                    <label className='form-label fw-semibold'>Email</label>
                    <input
                      type='email'
                      className='form-control'
                      placeholder='Enter your email'
                      required
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  {/* <div className="mb-3">
                    <label className="form-label fw-semibold">City</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your phone number"
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div> */}
                  <div className='mb-3'>
                    <label className='form-label fw-semibold'>phone</label>
                    <input
                      type='number'
                      className='form-control'
                      placeholder='Enter phone'
                      required
                      name='phone'
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-3'>
                    <label className='form-label fw-semibold'>Message</label>
                    <textarea
                      className='form-control'
                      rows='4'
                      placeholder='Write your message'
                      required
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className='mb-4'>
                    <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptcha} />
                  </div>

                  <button
                    type='submit'
                    className='th-btn td_btn_in td_white_color td_accent_bg py-2 border-0 rounded w-100 fw-semibold'
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Contact Details */}
            <div className='col-lg-6 d-flex'>
              <div className='contact-details p-4 shadow-lg rounded bg-white w-100 h-100'>
                <h4 className=' d-none d-sm-block td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_5 text-uppercase td_accent_color'>
                  Get in Touch
                </h4>

                <p className='text-muted'>
                  Have questions? We'd love to hear from you. Reach out to us
                  using the details below.
                </p>

                {/* Address Box */}
                <div className='d-flex align-items-center mb-5 p-3 rounded-3 shadow-sm bg-light'>
                  <div className='icon-box d-flex align-items-center justify-content-center me-2'>
                    <FaMapMarkerAlt className='text-white fs-5' />
                  </div>
                  <div>
                    <h5 className='mb-1 fw-semibold text-dark'>Our Office</h5>
                    <p className='text-muted mb-0'>
                      3rd Floor, Radhika Heights, 284, in front of APT House,
                      Zone-II, Maharana Pratap Nagar, Bhopal, MP 462011
                    </p>
                  </div>
                </div>

                {/* Phone Box */}
                <div className='d-flex align-items-center mb-5 p-3 rounded-3 shadow-sm bg-light'>
                  <div className='icon-box d-flex align-items-center justify-content-center me-3'>
                    <FaPhoneAlt className='text-white fs-5' />
                  </div>
                  <div>
                    <h5 className='mb-1 fw-semibold text-dark'>Call Us</h5>
                    <p className='text-muted mb-0'>+91 9691073595</p>
                  </div>
                </div>

                {/* Email Box */}
                <div className='d-flex align-items-center p-3 rounded-3 shadow-sm bg-light'>
                  <div className='icon-box d-flex align-items-center justify-content-center me-3'>
                    <FaEnvelope className='text-white fs-5' />
                  </div>
                  <div>
                    <h5 className='mb-1 fw-semibold text-dark'>Email Us</h5>
                    <p className='text-muted mb-0'>management@alec.co.in</p>
                  </div>
                </div>
              </div>
            </div>

            <div className='col-lg-12 d-flex'>
              <div style={{ width: "100%" }}>
                <iframe
                  title='Google Map'
                  width='100%'
                  height='600'
                  frameBorder='0'
                  scrolling='no'
                  marginHeight='0'
                  marginWidth='0'
                  src='https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=ALEC:%20Civil%20Judge%20Coaching%20in%20Bhopal%20%7C%20Law%20Coaching%20in%20Bhopal+(Judiciary)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed'
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </Layout>
  );
};

export default Contact;
