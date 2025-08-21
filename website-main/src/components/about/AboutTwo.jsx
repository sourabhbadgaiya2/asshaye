import React from "react";
import { Link } from "react-router-dom";
import aboutImg1 from "../../assets/alec-img/why/why1.avif";
import styled from "styled-components";
import { motion } from "framer-motion";

// Styled components for better consistency
const SectionContainer = styled.section`
  padding: 4rem 0;
  background-color: #f9fafc;
`;

const StateLink = styled.a`
  color: #0563c1;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
  position: relative;
  margin-right: 0.5rem;

  &:hover {
    color: #034a8f;
    text-decoration: underline;
  }

  &::after {
    content: ",";
    position: absolute;
    right: -4px;
    color: #333;
  }

  &:last-child::after {
    content: ".";
  }
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 60px;
    height: 3px;
    background: linear-gradient(90deg, #3498db, #9b59b6);
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a5568;
  margin-bottom: 1.5rem;
`;

const Highlight = styled.strong`
  color: #ED1E24;
  font-weight: 600;
`;

const ImageContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export const AboutTwo = () => {
  const states = [
    { name: "Uttar Pradesh", url: "https://youtube.com/playlist?list=PLa1H6vWJbT7btNlVcGDj9WW9jxsH8cdOW&si=d23txZTT4LDXFyW6" },
    { name: "Madhya Pradesh", url: "https://youtu.be/mVAFWOSD3mk?si=g4mXPFiG5mwx4Zo9" },
    { name: "Jharkhand", url: "https://youtube.com/playlist?list=PLa1H6vWJbT7bSWePttwksNnrrrKJ8kH0S&si=OyzIZlkQKmOQTS9Q" },
    { name: "Bihar", url: "https://youtube.com/playlist?list=PLa1H6vWJbT7aMN8Wo7hW9R1oLC0OCEYvQ&si=t5m5CbFcmrJaLtuQ" },
    { name: "Uttarakhand", url: "https://youtu.be/reF33bg2BMI?si=2Cij-eCvLfQV06BJ" },
    { name: "Haryana", url: "https://youtube.com/playlist?list=PLa1H6vWJbT7amlmNTmaG1du3jnxPEzNEt&si=VjmQp6j3X0F8u-dt" },
    { name: "Himachal Pradesh", url: "https://youtu.be/h6ArLmeHgw8?si=VhCDuRFrhKgQG3Tb" },
    { name: "Chhattisgarh", url: "https://www.youtube.com/live/klGfF_XMNhI?si=Kd8KbEXFsWt-O5zY" },
    { name: "Delhi", url: "https://youtube.com/playlist?list=PLa1H6vWJbT7b4TBWsQMDj0A-JsD1z5Qw_&si=yv2E4DB-kAmIVk1A" },
    { name: "Rajasthan", url: "https://youtube.com/playlist?list=PLa1H6vWJbT7Zmd7AwnaIZ67IlI9tEqFFA&si=F92YupxlAy8eAkon" }
  ];

  return (
    <SectionContainer className="p-0"  id="margin-top">
      <div className="container">



        <div className="row align-items-center">
          <motion.div
            className="col-lg-6 mb-4 mb-lg-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ImageContainer>
              <img src={aboutImg1} alt="AASHAYEIN JUDICIARY" className="img-fluid" />
            </ImageContainer>
          </motion.div>

          <motion.div
            className="col-lg-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >

             <h4 className='td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_5 text-uppercase td_accent_color'>
          Why AASHAYEIN JUDICIARY (ALEC)
          </h4>
       
            <Subtitle>
              Unique is our student-centric approach. We understand that every student has different goals, ambitions, and learning needs. That's why we offer a variety of courses and personalized coaching, specifically tailored for judiciary exam preparation in <Highlight>10 Hindi-speaking states</Highlight>:
            </Subtitle>

            <div className="mb-4">
              {states.map((state, index) => (
                <StateLink
                  key={state.name}
                  href={state.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {state.name}
                </StateLink>
              ))}
            </div>

            <Subtitle>
              Education is not just about learning for its own sake; it's about shaping the future of justice. We proudly call ourselves <Highlight>AASHAYEIN JUDICIARY</Highlight> (<Highlight>ALEC</Highlight>) because we are committed to ensuring our students receive the guidance, skills, and knowledge they need to become the judiciary leaders of tomorrow.
            </Subtitle>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4"
            >
              <Link
                to="/about"
                className="btn btn-primary px-4 py-2 rounded-pill fw-medium"
              >
                Learn More About Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
};