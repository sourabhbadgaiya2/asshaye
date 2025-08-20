import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import aboutShape1 from "../../assets/img/home_3/about_shape_1.svg";
import aboutShape2 from "../../assets/img/home_3/about_shape_2.svg";
import aboutImg1 from "../../assets/alec-img/about-img/about-direct.jpg";
import aboutImg2 from "../../assets/alec-img/about-img/aboutalec-director.jpg";
import reviewImg from "../../assets/img/home_3/review_img.png";
import awardIcon from "../../assets/img/home_2/cs_award_box_icon.svg";

// Styled Components
const AboutSection = styled.section`
  position: relative;
  padding: 5rem 0;
  background-color: #f8fafc;
  overflow: hidden;
`;

const Shape = styled(motion.div)`
  position: absolute;
  z-index: 0;
  opacity: 0.15;

  &:nth-child(1) {
    top: 10%;
    left: 5%;
  }

  &:nth-child(2) {
    bottom: 10%;
    right: 5%;
  }

  img {
    width: 100%;
    height: auto;
  }
`;

const ImageGrid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MainImage = styled(motion.div)`
  grid-column: 1 / 3;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
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

const SecondaryImage = styled(motion.div)`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
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

const ReviewBadge = styled(motion.div)`
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, #ed1e24, #9b59b6);
  color: white;
  padding: 1rem 2rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 10px 25px rgba(52, 152, 219, 0.3);
  z-index: 2;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 2px solid white;
  }

  h3 {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    opacity: 0.8;
    font-size: 0.9rem;
  }
`;

const DirectorBadge = styled(motion.div)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  text-align: center;
  z-index: 2;

  h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #2c3e50;
  }

  p {
    margin: 0;
    color: #7f8c8d;
    font-size: 0.9rem;
  }
`;

const AwardBadge = styled(motion.div)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: white;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  z-index: 2;

  img {
    width: 30px;
    height: 30px;
  }
`;

const ContentSection = styled.div`
  position: relative;
  z-index: 1;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #ed1e24;
  margin-bottom: 1rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 60px;
    height: 4px;
    background: linear-gradient(90deg, #ed1e24, #9b59b6);
    border-radius: 2px;
  }
`;

const SectionText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a5568;
  margin-bottom: 1.5rem;
`;

export const AboutThree = () => {
  return (
    <AboutSection id='margin-top'>
      <Shape
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img src={aboutShape1} alt='Decorative shape' />
      </Shape>

      <Shape
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.15, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <img src={aboutShape2} alt='Decorative shape' />
      </Shape>

      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-6 mb-5 mb-lg-0'>
            <ImageGrid>
              <MainImage
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <img src={aboutImg1} alt='AASHAYEIN JUDICIARY' />
              </MainImage>

              <ReviewBadge
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <img src={reviewImg} alt='Review' />
                <div>
                  <h3>30k+</h3>
                  <p>Positive Reviews</p>
                </div>
              </ReviewBadge>

              <DirectorBadge
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h3>Mr. Nitesh Choubey</h3>
                <p>Director</p>
              </DirectorBadge>
              {/*
              <AwardBadge
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <img src={awardIcon} alt="Award" />
              </AwardBadge> */}
            </ImageGrid>
          </div>

          <div className='col-lg-6'>
            <ContentSection>
              <SectionSubtitle
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                About us
              </SectionSubtitle>

              <SectionTitle
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                About the Director
              </SectionTitle>

              <SectionText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Hailing from the city of Hoshangabad (M.P.) and being an alumnus
                of one of India's premier educational institutes, Faculty of
                law, Banaras Hindu University, Mr. Nitesh earned the degree of
                LLM, and is a complete man of immense diligence, outstanding
                enthusiasm and utmost calibre.
              </SectionText>

              <SectionText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Ever since he graduated in 2013 and although being a bright
                student, he instead of availing or craving onto becoming a Judge
                or establishing a career in litigation, law firms or corporate
                sector, which all similar aspirants hanker for, he went the
                extra mile and embarked his career aiming to do something
                exceptional in academic field by providing quality guidance and
                thereby helping students in pursuing their aim of becoming a
                Judge.
              </SectionText>

              <SectionText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                His deep inclination and ardour for teaching was so lofty, that
                he commenced experimenting legal pedagogy since his graduation
                days itself. As yet, he possesses more than 6 years of enriching
                experience in educating law, jointly in some prestigious
                coaching institutes and his own ambitious vocation Aashayein
                Judiciary 'ALEC' - for Judicial Services Examination stationed
                in the central Indian state of Madhya Pradesh city, Bhopal.
              </SectionText>

              <SectionText
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                His classes reflect his untiring commitment towards imparting
                legal knowledge, legal proficiency and lucid pedagogy. His
                efforts and dynamism can easily be seen in his classes and notes
                personally prepared and continuously updated by him.
              </SectionText>
            </ContentSection>
          </div>
        </div>
      </div>
    </AboutSection>
  );
};
