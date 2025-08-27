import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import aboutImg1 from "../../assets/alec-img/about-img/about-direct.jpg";

// Styled Components
const MessageSection = styled.section`
  padding: 5rem 0;
  background-color: #f8fafc;
  position: relative;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
`;

const ContentRow = styled.div`

  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: 3rem;
`;

const ImageColumn = styled(motion.div)`
  flex: 1 1 45%;
  min-width: 300px;

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

const ImageContainer = styled.div`
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: auto;
    display: block;
  object-fit: cover;
  }
`;

const MessageColumn = styled(motion.div)`
  flex: 1 1 45%;
  min-width: 300px;

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 2rem;
  position: relative;
  line-height: 1.3;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #ED1E24, #9b59b6);
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Salutation = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #ED1E24;
  margin-bottom: 1.5rem;
`;

const MessageText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a5568;
  margin-bottom: 1.5rem;
`;

const SectionSubtitle = styled.p`
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #ED1E24;
  margin: 2rem 0 1rem 0;
`;

const List = styled.ul`
  margin-left: 1rem;
  padding-left: 1rem;
`;

const ListItem = styled.li`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a5568;
   list-style:none;
  margin-bottom: 0.8rem;
  position: relative;
  padding-left: 1.5rem;

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0.7rem;
    width: 8px;
    height: 8px;
    background-color: #ED1E24;
    border-radius: 50%;
  }
`;

const Signature = styled.div`
  margin-top: 3rem;
  border-top: 1px solid #e2e8f0;
  padding-top: 1.5rem;
`;

const SignatureName = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  color: #ED1E24;
  margin-bottom: 0.5rem;
`;

const SignatureTitle = styled.p`
  font-size: 1rem;
  color: #718096;
  margin-bottom: 0;
`;

export const AboutFour = () => {
  return (
    <MessageSection  id="margin-top">
      <Container>
        <ContentRow>
          <ImageColumn
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ImageContainer>
              <img src={aboutImg1} alt="Director Nitesh Choubey" />
            </ImageContainer>
          </ImageColumn>

          <MessageColumn
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
             <h4 className='td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_5 text-uppercase td_accent_color'>
            Director's Message
          </h4>
          <p className='td_section_title td_fs_20 mb-0'>Dear Students,
</p>


            <MessageText>
              This passage is about preparing for competitive exams to become a judge.
            </MessageText>

            <SectionSubtitle>Here's a simpler explanation:</SectionSubtitle>

            <SectionSubtitle>Good news:</SectionSubtitle>
            <List>
              <ListItem>There's a shortage of judges, so more law students are taking the exams.</ListItem>
              <ListItem>This brings a wider range of qualified people to the job, making the judiciary stronger.</ListItem>
            </List>

            <SectionSubtitle>Bad news:</SectionSubtitle>
            <List>
              <ListItem>Many students give up before even trying, or after failing once.</ListItem>
              <ListItem>Some students blindly join coaching institutes without being sure they even want to be judges.</ListItem>
            </List>

            <SectionSubtitle>Tips:</SectionSubtitle>
            <List>
              <ListItem>Before you start preparing, ask yourself if you have the commitment and focus to succeed.</ListItem>
              <ListItem>Coaching institutes aren't mandatory, but they can help navigate the tough competition and changing exam patterns.</ListItem>
              <ListItem>Be careful when choosing a coaching institute - there are some bad ones out there. Try a class before you enroll.</ListItem>
            </List>

            <MessageText>
              Overall, think carefully about whether you want to be a judge before diving into intense preparation.
            </MessageText>

            <Signature>
              <MessageText>Regards,</MessageText>
              <SignatureName>Nitesh Mohan Choubey</SignatureName>
              <SignatureTitle>Director, AASHAYEIN LAW EDUCATION CENTER</SignatureTitle>
            </Signature>
          </MessageColumn>
        </ContentRow>
      </Container>
    </MessageSection>
  );
};