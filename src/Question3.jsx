import React, { useState, useRef, useEffect } from "react";

const OTP = ({ otpLength = 6 }) => {
  const [otpFields, setOtpFields] = useState(new Array(otpLength).fill(""));
  const ref = useRef([]);

  // Function 1: Handle the press key and fill the input box only with digit
  const onHandleKeyDown = (e, index) => {
    const key = e.key;
    console.log("Detect the pressed key: ", key);

    const copyOfOtpFields = [...otpFields];
    console.log("Copy OTP fields 1: ", copyOfOtpFields);

    // Condition 5: We should move from one input box to another input box to fucus when press the arrowRight & arrowLeft key
    if (key === "ArrowLeft") {
      if (index > 0) {
        ref.current[index - 1].focus();
        return;
      }
    }
    if (key === "ArrowRight") {
      if (index + 1 < otpFields.length) {
        ref.current[index + 1].focus();
        return;
      }
    }

    // Condition 2: We should delete the digit value when press the Backspace key
    if (key === "Backspace") {
      copyOfOtpFields[index] = "";
      console.log("Copy OTP fields 3: ", copyOfOtpFields);
      setOtpFields(copyOfOtpFields);

      // Condition 4: We should use hook "useRef" for redirecting to the previous input box when we press the backspace key
      if (index > 0) {
        ref.current[index - 1].focus();
      }
    }

    // Condition 1: We should only allow digit key value
    if (!/^\d$/.test(key)) {
      return;
    }

    copyOfOtpFields[index] = key;
    console.log("Copy OTP fields 2: ", copyOfOtpFields);
    setOtpFields(copyOfOtpFields);

    // Condition 3: We should use the hook "useRef" for redirecting to the next input box when first input is done
    if (index + 1 < otpFields.length) {
      ref.current[index + 1].focus();
    }
  };

  // Function 2: Handle the paste string and fill the input box only with digit
  const onHandlePaste = (e) => {
    e.preventDefault();

    // We have to get the pasted data through API clipboardData
    const pastedData = e.clipboardData.getData("text");
    console.log("Pasted string data: ", pastedData);

    // We just want to filter out the digit from pasted data
    const digits = pastedData.match(/\d/g);
    console.log("Filtered digits data: ", digits);

    // Condition 1: If pasted data does not contain the any digit then return from here
    if (!digits) {
      return;
    }

    // Now we have to create the nextOTP
    const nextOtp = otpFields.slice();
    console.log("Next OTP 1: ", nextOtp);

    // In our case, we will have to past data from the beginning input box always
    for (let i = 0; i < otpLength && digits.length; i++) {
      nextOtp[i] = digits[i];
    }
    setOtpFields(nextOtp);
    console.log("Next OTP 2: ", nextOtp);

    // Condition 2: We have to setup the focus for input box in case pasted data have less digits or more then digits from otpLength
    const nextFocus = digits.length < otpLength ? digits.length : otpLength - 1;
    ref.current[nextFocus]?.focus();
  };

  // We should use the hook "useEffect" for better intraction with user with focusing on first input box when user visit to this page first time or render this page first time
  useEffect(() => {
    ref.current[0]?.focus();
  }, []);

  return (
    <>
      <h1>Production Ready OTP Component</h1>
      {otpFields.map((value, index) => {
        return (
          <input
            key={index}
            value={value}
            maxLength={1}
            type="text"
            onKeyDown={(e) => {
              return onHandleKeyDown(e, index);
            }}
            ref={(currentInput) => {
              return (ref.current[index] = currentInput);
            }}
            onPaste={onHandlePaste}
          />
        );
      })}
    </>
  );
};

export default OTP;
