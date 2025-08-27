import React from "react";
import { Link } from "react-router-dom";

import calendarIcon from "../../assets/img/icons/calendar.svg";
import userIcon from "../../assets/img/icons/user.svg";

// export const BlogOneItem = ({
//   src,
//   date,
//   author,
//   title,
//   description,
//   blogId,
//   link = "/blog-details",
// }) => {

//   return (
//     <div className='td_post td_style_1'>
//       <Link to={`${link}/${blogId}`}>
//         <div id='block-section' className='td_post_thumb d-block'>
//           <img src={src} alt='blog post' />
//           <i className='fa-solid fa-link'></i>
//         </div>

//         <div className='td_post_info'>
//           <div className='td_post_meta td_fs_14 td_medium td_mb_20'>
//             <span>
//               <img src={calendarIcon} alt='calendar icon' />
//               {date}
//             </span>
//             <span>
//               <img src={userIcon} alt='user icon' />
//               {author}
//             </span>
//           </div>

//           <h2 className='td_post_title td_fs_24 td_medium td_mb_16'></h2>

//           <p className='td_post_subtitle td_mb_24 td_heading_color td_opacity_7'>
//             {description}
//           </p>

//           <div
//             to='/blog-details'
//             className='td_btn td_style_1 td_type_3 td_radius_30 td_medium'
//           >
//             <span className='td_btn_in td_accent_color'>
//               <span>Read More</span>
//             </span>
//           </div>
//         </div>
//       </Link>
//     </div>
//   );
// };

export const BlogOneItem = ({
  src,
  date,
  author,
  title,
  description,
  link,
  state,
}) => {
  // console.log(state, "state ");

  return (
    <div className='td_post td_style_1'>
      <Link to={link} state={state}>
        <div id='block-section' className='td_post_thumb d-block'>
          <img
            style={{ height: "320 !important" }}
            id='imaging'
            src={src}
            alt='blog post'
          />
          <i className='fa-solid fa-link'></i>
        </div>

        <div className='td_post_info'>
          <div className='td_post_meta td_fs_14 td_medium td_mb_20'>
            <span>
              <img src={calendarIcon} alt='calendar icon' />
              {date}
            </span>
            <span>
              <img src={userIcon} alt='user icon' />
              {author}
            </span>
          </div>

          <h2 className='td_post_title td_fs_14 td_medium td_mb_16'>{title}</h2>
          {/*
          <p className='td_post_subtitle td_mb_24 td_heading_color td_opacity_7'>
            {description.slice(0, 100)}
          </p> */}

          {description && (
            <div
              className='td_post_subtitle td_mb_24 td_heading_color td_opacity_7'
              dangerouslySetInnerHTML={{ __html: description.slice(0, 80) }}
            ></div>
          )}

          <div className='td_btn td_style_1 td_type_3 td_radius_30 td_medium'>
            <span className='td_btn_in td_accent_color'>
              <span>Read More</span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};
