import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "../../layouts/Layout";
import errorImg from "../../assets/img/others/error.svg";

// Loader Component
const FullPageLoader = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(255,255,255,0.9)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div className='spinner-border text-primary' role='status'>
      <span className='visually-hidden'>Loading...</span>
    </div>
  </div>
);

export const Error = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1 second
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <FullPageLoader />;

  return (
    <Layout>
      <section>
        <div className='td_height_120 td_height_lg_80' />
        <div className='container'>
          <div className='td_error text-center'>
            <img src={errorImg} alt='404 Error' />
            <div className='td_height_90 td_height_lg_40' />
            <h2 className='td_fs_48 td_mb_27'>OOPS! Nothing Was Found</h2>
            <p className='td_mb_35'>
              Yourn Internet has been lost
              <br />
              been moved or deleted. Back To Home
            </p>
            <Link to='/' className='td_btn td_style_1 td_radius_10 td_medium'>
              <span className='td_btn_in td_white_color td_accent_bg'>
                <span>Go Back To Home</span>
                <svg
                  width='19'
                  height='20'
                  viewBox='0 0 19 20'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path
                    d='M15.1575 4.34302L3.84375 15.6567'
                    stroke='currentColor'
                  />
                  <path
                    d='M15.157 11.4142C15.157 11.4142 16.0887 5.2748 15.157 4.34311C14.2253 3.41142 8.08594 4.34314 8.08594 4.34314'
                    stroke='currentColor'
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        <div className='td_height_120 td_height_lg_80' />
      </section>
    </Layout>
  );
};
