import React from "react";
import "./style.css";
// import Question1 from './Question1'; // Filter
// import Question2 from './Question2'; // Pagination
import Question3 from "./Question3"; // Production Ready OTP Component

export default function App() {
  return (
    <div>
      {/* <Question1 /> */}
      {/* <Question2 /> */}
      <Question3 otpLength={6} />
    </div>
  );
}
