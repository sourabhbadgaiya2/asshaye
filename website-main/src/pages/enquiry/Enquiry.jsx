// import React, { useState } from "react";
// import { Layout } from "../../layouts/Layout";
// import contactImg from "../../assets/alec-img/contact/enquiry.jpg";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import ReCAPTCHA from "react-google-recaptcha";

// // Replace this with your real site key from Google
// const SITE_KEY = "6LdBFVArAAAAAF4__ail1UuDTBnqlCt0UCPYVRnC";

// export const Enquiry = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     city: "",
//     phone: "",
//     message: "",
//     captchaToken: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleCaptcha = (value) => {
//     setFormData((prev) => ({
//       ...prev,
//       captchaToken: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     if (!formData.captchaToken) {
//       toast.error("Please verify you're not a robot.");
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/enquiry/add",
//         formData
//       );
//       console.log("API Response:", response.data);
//       setSubmitStatus({
//         success: true,
//         message: "Your message has been sent successfully!",
//       });
//       toast.success("Your message has been sent successfully!");

//       setFormData({
//         name: "",
//         email: "",
//         city: "",
//         phone: "",
//         message: "",
//         captchaToken: "",
//       });
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setSubmitStatus({
//         success: false,
//         message: "Failed to send message. Please try again later.",
//       });
//       toast.error("Failed to send message. Please try again later.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <Layout header={9} footer={1}>
//       <section id='margin-top' className='contact-section py-5 bg-light'>
//         <div className='container'>
//           <div className='row g-4 d-flex align-items-stretch'>
//             {/* Left: Contact Form */}
//             <div className='col-lg-6 d-flex'>
//               <div className='contact-form p-4 shadow rounded bg-white w-100 h-100'>
//                 <h3 className='mb-4 td_accent_color fw-bold'>Enquiry Now</h3>
//                 <form onSubmit={handleSubmit}>
//                   <div className='mb-3'>
//                     <label className='form-label fw-semibold'>Full Name</label>
//                     <input
//                       type='text'
//                       className='form-control'
//                       placeholder='Enter your name'
//                       required
//                       name='name'
//                       value={formData.name}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className='mb-3'>
//                     <label className='form-label fw-semibold'>Email</label>
//                     <input
//                       type='email'
//                       className='form-control'
//                       placeholder='Enter your email'
//                       required
//                       name='email'
//                       value={formData.email}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className='mb-3'>
//                     <label className='form-label fw-semibold'>City</label>
//                     <input
//                       type='text'
//                       className='form-control'
//                       placeholder='Enter your city'
//                       required
//                       name='city'
//                       value={formData.city}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className='mb-3'>
//                     <label className='form-label fw-semibold'>Phone</label>
//                     <input
//                       type='number'
//                       className='form-control'
//                       placeholder='Enter phone'
//                       required
//                       name='phone'
//                       value={formData.phone}
//                       onChange={handleChange}
//                     />
//                   </div>
//                   <div className='mb-3'>
//                     <label className='form-label fw-semibold'>Message</label>
//                     <textarea
//                       className='form-control'
//                       rows='4'
//                       placeholder='Write your message'
//                       required
//                       name='message'
//                       value={formData.message}
//                       onChange={handleChange}
//                     ></textarea>
//                   </div>

//                   {/* reCAPTCHA */}
//                   <div className='mb-4'>
//                     <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptcha} />
//                   </div>

//                   <button
//                     type='submit'
//                     className='th-btn td_btn_in td_white_color td_accent_bg py-2 border-0 rounded w-100 fw-semibold'
//                     disabled={isSubmitting}
//                   >
//                     {isSubmitting ? "Sending..." : "Send Message"}
//                   </button>
//                 </form>
//               </div>
//             </div>

//             {/* Right: Contact Details */}
//             <div className='col-lg-6 d-flex'>
//               <div className='contact-details p-4 shadow-lg rounded bg-white w-100'>
//                 <img
//                   src={contactImg}
//                   alt='Contact'
//                   className='img-fluid rounded'
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <ToastContainer />
//     </Layout>
//   );
// };

// export default Enquiry;
import React, { useState } from "react";
import { Layout } from "../../layouts/Layout";
import contactImg from "../../assets/alec-img/contact/enquiry.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

// Replace this with your real site key from Google
const SITE_KEY = "6LdBFVArAAAAAF4__ail1UuDTBnqlCt0UCPYVRnC";

export const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
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

    // Basic field validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.city ||
      !formData.phone ||
      !formData.message
    ) {
      toast.error("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }

    // Phone number validation
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Please enter a valid 10-digit phone number.");
      setIsSubmitting(false);
      return;
    }

    // CAPTCHA validation
    if (!formData.captchaToken) {
      toast.error("Please verify you're not a robot.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/enquiry/add",
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
        city: "",
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
                  Enquiry Now
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
                  <div className='mb-3'>
                    <label className='form-label fw-semibold'>City</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Enter your city'
                      required
                      name='city'
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mb-3'>
                    <label className='form-label fw-semibold'>Phone</label>
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

                  {/* reCAPTCHA */}
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
              <div className='contact-details p-4 shadow-lg rounded bg-white w-100'>
                <img
                  src={contactImg}
                  alt='Contact'
                  className='img-fluid rounded'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </Layout>
  );
};

export default Enquiry;
