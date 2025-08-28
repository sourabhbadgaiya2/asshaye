// import React from "react";
// // import "./MarqueeStrike.css";

// export const MarqueeStrike = () => {z
//   return (
//     <div className="marquee-container">
//     <marquee className="marquee-text" scrollamount="20">
//       <span className="strike-text">🔥 Flat 50% Off on Himachal Sectional and Mock Test Series 🔥</span>
//       <span className="strike-text">🔥Himachal Sectional Test Series Flat 50% OFF🔥</span>
//       <span className="strike-text">🔥 Limited-Time Offer! Enroll Now & Get 50% Off! 🔥</span>
//       <span className="strike-text">🔥 Limited-Time Offer! Enroll Now & Get 50% Off! 🔥</span>
//     </marquee>
//   </div>

//   );
// };

// export default MarqueeStrike;

import React, { useState, useEffect } from "react";
import axios from "axios";
// import "./MarqueeStrike.css";

export const MarqueeStrike = () => {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/discount/display"
        );
        setDiscounts(response.data.data || []);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch discounts");
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, []);

  if (loading) return <div>Loading discounts...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!discounts.length) return <div>No discounts available</div>;

  return (
    <div className='marquee-container'>
      <marquee className='marquee-text' scrollamount='8'>
        {discounts.map((discount, index) => (
          <span key={index} className='strike-text' alt={discount.altText}>
            🔥 {discount.title} 🔥
          </span>
        ))}
      </marquee>
    </div>
  );
};

export default MarqueeStrike;
