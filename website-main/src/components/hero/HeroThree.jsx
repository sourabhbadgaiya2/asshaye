import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import axios from "axios";
import "swiper/css";
import "swiper/css/pagination";
import { useDispatch, useSelector } from "react-redux";
import { CourseName } from "../../pages/Redux/CourseThunk";
import { QueryName } from "../../pages/Redux/Query/QueryThunk";
import ReCAPTCHA from "react-google-recaptcha";

const SITE_KEY = "6LdBFVArAAAAAF4__ail1UuDTBnqlCt0UCPYVRnC";

export const HeroThree = () => {
  const dispatch = useDispatch();
  const [banners, setBanners] = useState([]);
  const DATA = useSelector((state) => state.leadsource);

  useEffect(() => {
    setBanners(DATA.courseNames);
  }, [DATA]);

  useEffect(() => {
    dispatch(CourseName());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    Name: "",
    Phone: "",
    State: "",
    Medium: "",
    message: "",
    captchaToken: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleCaptcha = (value) => {
    setFormData((prev) => ({
      ...prev,
      captchaToken: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "Phone") {
      if (/^\d{0,10}$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (!formData.captchaToken) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        captchaToken: "Please complete the CAPTCHA",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // <-- Start loading
    try {
      const result = await dispatch(QueryName(formData)).unwrap();
      console.log(result);
      alert("Query submitted successfully!");
      setFormData({
        Name: "",
        Phone: "",
        State: "",
        Medium: "",
        message: "",
        captchaToken: "",
      });
    } catch (error) {
      console.error(error);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false); // <-- Stop loading
    }
  };

  return (
    <>
      <style>{`
        .glass-slider {
          background: rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          border-radius: 25px;
          box-shadow: 0 8px 32px rgba(31, 38, 135, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        .neumorphic-form {
          background: #e0e5ec;
          border-radius: 25px;
          padding: 35px;
          box-shadow: 10px 10px 25px #c1c4cb, -10px -10px 25px #ffffff;
        }

        .form-floating {
          position: relative;
          margin-bottom: .5rem;
        }

        .form-floating input,
        .form-floating textarea {
          background: transparent;
          border: none;
          border-bottom: 2px solid #aaa;
          border-radius: 0;
          outline: none;
          width: 100%;
          padding: 20px 0px 0px 5px;
          font-size: 16px;
        }

        .form-floating label {
          position: absolute;
          top: 10px;
          left: 0;
          font-size: 14px;
          transition: 0.3s;
          color: #666;
          pointer-events: none;
        }

        .form-floating input:focus + label,
        .form-floating input:not(:placeholder-shown) + label,
        .form-floating textarea:focus + label,
        .form-floating textarea:not(:placeholder-shown) + label {
          top: -15px;
          font-size: 12px;
          color: #000;
        }

        .form-submit {
          background: linear-gradient(to right, #ED1E24, #b50004);
          color: #fff;
          border: none;
          padding: 12px;
          border-radius: 25px;
          width: 100%;
          font-weight: bold;
          font-size: 16px;
          transition: 0.3s ease;
          cursor: pointer;
        }

        .form-submit:hover {
          background: linear-gradient(to right, #b50004, #ED1E24);
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(237, 30, 36, 0.4);
        }

        .swiper-pagination-bullet {
          background: #0072ff;
          opacity: 0.6;
          transition: 0.3s;
        }

        .swiper-pagination-bullet-active {
          transform: scale(1.3);
          opacity: 1;
        }

        .form-select {
          height: 50px;
          background-color: transparent;
          color: #333;
        }

        .form-floating select {
          background: transparent;
          border: none;
          border-bottom: 2px solid #aaa;
          border-radius: 0;
          outline: none;
          width: 100%;
          padding: 20px 0px 0px 5px;
          font-size: 16px;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        .form-floating select:focus + label,
        .form-floating select:not([value=""]) + label {
          top: -15px;
          font-size: 12px;
          color: #000;
        }

        .form-floating select {
          background-image: url("data:image/svg+xml;utf8,<svg fill='gray' height='20' viewBox='0 0 24 24' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/></svg>");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 18px;
          padding-right: 30px;
        }

        @media (max-width: 768px) {
          .neumorphic-form {
            padding: 20px;
          }

          .form-floating select {
            font-size: 14px;
            padding: 16px 5px 0 5px;
            height: 42px;
            background-size: 14px;
            background-position: right 10px center;
          }

          .form-floating label {
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .form-floating select {
            font-size: 13px;
            height: 38px;
            padding-right: 24px;
          }

          .form-submit {
            font-size: 14px;
            padding: 10px;
          }
        }
      `}</style>

      <div className='td_height_60 td_height_lg_60' />
      <div className='container-fluid mt-0 px-4 ' id='contact-sec'>
        <div className='row g-4 align-items-stretch my-3'>
          {/* Slider */}
          <div className='col-12 col-xl-8'>
            <div className='glass-slider h-100'>
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                loop={true}
                style={{ borderRadius: "15px", height: "100%" }}
              >
                {banners &&
                  banners.length > 0 &&
                  banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                      <a href={banner.URL}>
                        <img
                          src={banner.images[0]}
                          alt={banner.altText}
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "15px",
                          }}
                        />
                      </a>
                    </SwiperSlide>
                  ))}
              </Swiper>
            </div>
          </div>

          {/* Form */}
          <div className='col-12 col-xl-4'>
            <div className='neumorphic-form h-100'>
              <h5 className='text-center fw-bold mb-4 td_accent_color'>
                Do you have any query? <br /> Get a call back!
              </h5>

              <form onSubmit={handleSubmit}>
                <div className='form-floating'>
                  <input
                    type='text'
                    name='Name'
                    value={formData.Name}
                    onChange={handleChange}
                    required
                    placeholder=' '
                  />
                  <label>Your Name*</label>
                </div>

                <div className='form-floating'>
                  <input
                    type='tel'
                    name='Phone'
                    value={formData.Phone}
                    onChange={handleChange}
                    inputMode='numeric'
                    maxLength='10'
                    pattern='[0-9]{10}'
                    required
                    placeholder=' '
                  />
                  <label>Phone Number*</label>
                </div>

                <div className='form-floating'>
                  {/* <select
                    className='form-select'
                    name='State'
                    value={formData.State}
                    onChange={handleChange}
                    required
                  >
                    <option value=''>Select your State</option>
                    <option value='Madhya Pradesh'>Madhya Pradesh</option>
                    <option value='Uttar Pradesh'>Uttar Pradesh</option>
                    <option value='Chhattisgarh'>Chhattisgarh</option>
                    <option value='Delhi'>Delhi</option>

                  </select> */}

                  <select
  className="form-select"
  name="State"
  value={formData.State}
  onChange={handleChange}
  required
>
  <option value="">Select your State</option>
  <option value="Madhya Pradesh">Madhya Pradesh</option>
  <option value="Himachal Pradesh">Himachal Pradesh</option>
  <option value="Uttarakhand">Uttarakhand</option>
  <option value="Delhi">Delhi</option>
  <option value="Haryana">Haryana</option>
  <option value="Rajasthan">Rajasthan</option>
  <option value="Uttar Pradesh">Uttar Pradesh</option>
  <option value="Bihar">Bihar</option>
  <option value="Jharkhand">Jharkhand</option>
  <option value="Chhattisgarh">Chhattisgarh</option>
  <option value="Gujarat">Gujarat</option>
  <option value="Other">Other</option>
</select>

                </div>

                <div className='form-floating'>
                  <select
                    name='Medium'
                    value={formData.Medium}
                    onChange={handleChange}
                    required
                    className='form-select'
                  >
                    <option value=''>Select Medium</option>
                    <option value='English'>English</option>
                    <option value='Hindi'>Hindi</option>
                  </select>
                </div>

                <div className='form-floating'>
                  <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleChange}
                    rows='2'
                    placeholder=' '
                  ></textarea>
                  <label>Your message</label>
                </div>

                <div className='mb-4'>
                  <ReCAPTCHA sitekey={SITE_KEY} onChange={handleCaptcha} />
                </div>

                <div className='mt-3'>
                  <button
                    type='submit'
                    className='form-submit'
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
