import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import aboutImg1 from "../../assets/alec-img/about-img/about-ins.jpg";
import aboutImg2 from "../../assets/alec-img/about-img/about-direct.jpg";
import circleText from "../../assets/img/home_1/about_circle_text.svg";
import { VideoPlayer } from "../videos/VideoPlayer";
import { useSelector } from "react-redux";

export const AboutOne = () => {
  // const { currentSEO } = useSelector((state) => state.blogSeo);

  // console.log(currentSEO, "hello");

  // useEffect(() => {
  //   if (currentSEO) {
  //     // Set document title
  //     document.title = currentSEO.title || "Default Blog Title";

  //     // Set or update meta description
  //     const metaDescription = document.querySelector(
  //       "meta[name='description']"
  //     );
  //     if (metaDescription) {
  //       metaDescription.setAttribute("content", currentSEO.description || "");
  //     } else {
  //       const descTag = document.createElement("meta");
  //       descTag.name = "description";
  //       descTag.content = currentSEO.description || "";
  //       document.head.appendChild(descTag);
  //     }

  //     // Set or update meta keywords
  //     const metaKeywords = document.querySelector("meta[name='keywords']");
  //     if (metaKeywords) {
  //       metaKeywords.setAttribute("content", currentSEO.keywords || "");
  //     } else {
  //       const keywordTag = document.createElement("meta");
  //       keywordTag.name = "keywords";
  //       keywordTag.content = currentSEO.keywords || "";
  //       document.head.appendChild(keywordTag);
  //     }
  //   }
  // }, [currentSEO]);

  return (
    <section id='margin-top' className=''>
      <div className=' mt-4' />
      <div className='td_about td_style_1'>
        <div className='container'>
          <div className='row  td_gap_y_40'>
           <div style={{display:"flex",alignItems:"start",justifyContent:"start"}}
  className='col-lg-6 wow fadeInLeft '
  data-wow-duration='1s'
  data-wow-delay='0.25s'
>
  <div className='td_about_thumb_wrap'>
    <div className='td_about_thumb_1'>
      <img src={aboutImg1} alt='About' />
    </div>
  </div>
</div>

            <div
              className='col-lg-6 wow fadeInUp'
              data-wow-duration='1s'
              data-wow-delay='0.3s'
            >
              <div className='td_section_heading td_style_1 td_mb_30'>
                <h4 className='td_section_subtitle_up td_fs_24 td_semibold td_spacing_1 td_mb_5 text-uppercase td_accent_color'>
                  About the institute
                </h4>
                {/* <p className='td_section_title td_fs_20 mb-0'>
                  {" "}
                  About Aashayein Judiciary:
                </p> */}

                <p className='td_section_subtitle td_fs_18 mb-0'>
                  In today's increasingly complex legal landscape, the demand
                  for more judges and law officers has never been greater.As the
                  number of legal cases grows, the limited avallability of
                  courts and judges has created an urgent need for skilled
                  professionals. Aashayein Judiaciary (ALEC) was founded to
                  address this demand, guiding law students who are now more
                  motivated than ever to pursue competitive examinations and
                  contribute to societal development.{" "}
                </p>
                <p className='td_section_subtitle td_fs_18 mb-0'>
                  In today's increasingly complex legal landscape, the demand
                  for more judges and law officers has never been greater.As the
                  number of legal cases grows, the limited avallability of
                  courts and judges has created an urgent need for skilled
                  professionals. Aashayein Judiaciary (ALEC) was founded to
                  address this demand, guiding law students who are now more
                  motivated than ever to pursue competitive examinations and
                  contribute to societal development.{" "}
                </p>

                <h4 className='td_section_title td_fs_28 mt-3  '>Our Vision</h4>
                <p
                  style={{ marginTop: "0 !important" }}
                  className='td_section_subtitle td_fs_18 mb-0'
                >
                  In today's increasingly complex legal landscape, the demand
                  for more judges and law officers has never been greater.As the
                  number of legal cases grows, the limited avallability of
                  courts and judges has created an urgent need for skilled
                  professionals. Aashayein Judiaciary (ALEC) was founded to
                  address this demand, guiding law students who are now more
                  motivated than ever to pursue competitive examinations and
                  contribute to societal development.{" "}
                </p>
              </div>

              <Link
                to='/about'
                className='td_btn td_style_1 td_radius_10 td_medium'
              ></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
