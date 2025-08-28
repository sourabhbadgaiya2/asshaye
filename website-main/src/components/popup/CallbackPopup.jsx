// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "bootstrap/dist/css/bootstrap.min.css";

// export const CallbackPopup = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Show popup after 10 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsOpen(true);
//     }, 10000);
//     return () => clearTimeout(timer);
//   }, []);

//   const closePopup = () => {
//     setIsOpen(false);
//   };

//   const submitCallback = () => {
//     if (!name || !phone) {
//       alert("Please fill out both fields.");
//       return;
//     }

//     // Phone validation: 10 digit number
//     if (!/^\d{10}$/.test(phone)) {
//       alert("Please enter a valid 10-digit phone number.");
//       return;
//     }

//     setIsSubmitting(true);

//     const api = "http://localhost:8000/Callback/add";
//     const data = { name, phone };

//     axios
//       .post(api, data)
//       .then(() => {
//         alert("Thank you! We will call you soon.");
//         closePopup();
//       })
//       .catch((error) => {
//         console.error("Error submitting callback:", error);
//         alert("There was an error. Please try again later.");
//       })
//       .finally(() => {
//         setIsSubmitting(false);
//       });
//   };

//   return (
//     <>
//       {isOpen && (
//         <div
//           className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
//           style={{ zIndex: 1050 }}
//         >
//           <div
//             id="callback"
//             className="bg-light p-4 rounded shadow-lg text-center position-relative"
//           >
//             <button
//               onClick={closePopup}
//               className="btn-close position-absolute top-0 end-0 m-2"
//             ></button>

//             <h4 className="fw-bold mb-3 text-primary">
//               📞 REQUEST A CALL BACK
//             </h4>
//             <p className="text-muted mb-3">
//               We will give you a call between <b>10:00 AM to 6:00 PM</b>
//             </p>

//             <div className="mb-4 text-start">
//               <label className="form-label fw-semibold">Full Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Enter your full name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             <div className="mb-3 text-start">
//               <label className="form-label fw-semibold">Phone Number</label>
//               <input
//                 type="tel"
//                 className="form-control"
//                 placeholder="Enter your phone number"
//                 value={phone}
//                 onChange={(e) => setPhone(e.target.value)}
//               />
//             </div>

//             <button
//               onClick={submitCallback}
//               className="td_btn_in td_white_color td_accent_bg w-100 border-0 mt-4 py-2 fw-semibold"
//               style={{ borderRadius: "8px" }}
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Submitting..." : "Request Call"}
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export const CallbackPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Auto-open popup after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000); // 10 seconds
    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  const submitCallback = () => {
    // Validate name and phone
    if (!name || !phone) {
      alert("Please fill out both fields.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    setIsSubmitting(true);

    const api = "http://localhost:8000/Callback/add";
    const data = { name, phone };

    axios
      .post(api, data)
      .then(() => {
        alert("Thank you! We will call you soon.");
        closePopup();
        setName("");
        setPhone("");
      })
      .catch((error) => {
        console.error("Error submitting callback:", error);
        alert("There was an error. Please try again later.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <>
      {isOpen && (
        <div
          className='position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center'
          style={{ zIndex: 1050 }}
        >
          <div
            id='callback'
            className='bg-light p-4 rounded shadow-lg text-center position-relative'
          >
            {/* Close Button */}
            <button
              onClick={closePopup}
              className='btn-close position-absolute top-0 end-0 m-2'
              aria-label='Close'
            ></button>

            {/* Title & Subtext */}
            <h4 className='fw-bold mb-3 text-primary'>
              📞 REQUEST A CALL BACK
            </h4>
            <p className='text-muted mb-3'>
              We will give you a call between <b>10:00 AM to 6:00 PM</b>
            </p>

            {/* Name Input */}
            <div className='mb-4 text-start'>
              <label className='form-label fw-semibold'>Full Name</label>
              <input
                type='text'
                className='form-control'
                placeholder='Enter your full name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Phone Input */}
            <div className='mb-3 text-start'>
              <label className='form-label fw-semibold'>Phone Number</label>
              <input
                type='tel'
                className='form-control'
                placeholder='Enter your phone number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={submitCallback}
              className='td_btn_in td_white_color td_accent_bg w-100 border-0 mt-4 py-2 fw-semibold'
              style={{ borderRadius: "8px" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Request Call"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
