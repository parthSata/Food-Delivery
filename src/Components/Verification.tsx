import { useState } from "react";
import Logo from "../assets/Login/Logo1.png";
import Resend from "../assets/Login/Resend.png";
import image from "../assets/Login/img.png";
import { useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";

function Verification() {
  const location = useLocation();
  const { mobileNumber, callingCode } = location.state || {};
  const CallingCode = location.state?.callingCode;
  console.log(CallingCode);
  const [otp, setOtp] = useState("");

  return (
    <>
      <div className="h-screen w-screen flex flex-row justify-center items-center flex-wrap xl:flex-wrap">
        <div className="flex justify-center items-center flex-col ">
          <img src={Logo} className="h-[106px] w-[96px]" alt="" />
          <div className="">
            <p
              className="font-semibold text-[35px] md:text-[35px] lg:text-[32px]"
              style={{ fontFamily: "Bai Jamjuree" }}
            >
              Verification
            </p>
            <p
              className="font-semibold text-[#A2A3A5] text-[22px] md:text-[22px] lg:text-[25px]"
              style={{ fontFamily: "Bai Jamjuree" }}
            >
              Enter the OTP sent to{" "}
              <span className="underline font-semibold">
                {" "}
                {callingCode} {mobileNumber}
              </span>
            </p>
          </div>

          <div className="mt-5 md:shrink">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              renderInput={(props, index) => (
                <input
                  {...props}
                  key={index}
                  className="rounded-md border-2 mr-2 p-[12px] focus:outline-none font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[30px] md:text-[32px] lg:text-[34px] text-[#161A1D] border-gray-200 md:h-[70px] lg:h-[72px] lg:w-[65px] md:w-[60px] h-[72px] w-[60px]"
                  style={{ width: 50, fontFamily: "Montserrat Alternates" }}
                />
              )}
            />
          </div>
          <div className="">
            <p
              className="text-[#DF201F] text-[22px] md:text-[22px] mt-2 font-semibold"
              style={{ fontFamily: "Bai Jamjuree" }}
            >
              Sec 08
            </p>
            <span className="flex flex-row">
              <p
                className="font-semibold text-[18px] md:text-[20px]"
                style={{ fontFamily: "Montserrat Alternates" }}
              >
                Resend Otp
              </p>
              <img
                src={Resend}
                alt=""
                className="h-[34px] ml-2 w-[34px] md:h-[34px] md:w-[34px]"
              />
            </span>
          </div>
          <button
            type="submit"
            style={{
              fontFamily: "Bai Jamjuree",
              boxShadow: "2px 2px 25px 2px #DF201F80",
            }}
            className="bg-red-500 h-[60px] md:h-[60px] w-[260px] md:w-[260px] rounded-[60px] text-white text-[22px] md:text-[22px] mt-5"
          >
            VERIFICATION
          </button>
        </div>

        <div className="">
          <img
            src={image}
            alt=""
            className="h-[413px] w-[454px] md:h-[413px] ml-10 md:w-[454px]"
          />
        </div>
      </div>
    </>
  );
}

export default Verification;
