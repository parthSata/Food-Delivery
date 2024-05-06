import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Login/Logo1.png";
import Online from "../assets/Login/OnlineShoping.png";
import Phone from "../assets/Login/Phone.png";
import flag from "../assets/Login/Flag.png";
import uk from "../assets/Login/uk.png";
import us from "../assets/Login/us.png";
import united from "../assets/Login/united.png";
import uruguay from "../assets/Login/uruguay.png";
import "react-phone-input-2/lib/style.css";

function Login() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [callingCode, setCallingCode] = useState<string>("+91");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage] = useState<string>(
    "Please enter a valid 10-digit phone number."
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    const mobileNumberPattern = /^\d{10}$/;
    setIsValid(mobileNumberPattern.test(number));
    setMobileNumber(number);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid) {
      navigate("/Verification", { state: { mobileNumber, callingCode } });
    }
  };

  const handleCallingCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCallingCode = e.target.value;
    sessionStorage.setItem("callingCode", selectedCallingCode);
    setCallingCode(selectedCallingCode);
  };

  const renderFlag = (callingCode: string) => {
    switch (callingCode) {
      case "+91":
        return flag;
      case "+1":
        return us;
      case "+971":
        return united;
      case "+44":
        return uk;
      case "+598":
        return uruguay;
      default:
        return flag;
    }
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center h-screen w-screen flex-wrap xl:flex-wrap">
        {/* Login */}
        <form onSubmit={handleSubmit}>
          <div className="border-black flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center ">
              <img className="h-[80px] w-[80px]" src={Logo} alt="" />
              <p
                className="text-[30px] font-semibold"
                style={{ fontFamily: "Bai Jamjuree" }}
              >
                Welcome Back!
              </p>
              <p
                className="text-[#A2A3A5] mt-0  text-[16px] font-semibold"
                style={{ fontFamily: "Bai Jamjuree" }}
              >
                Login Account
              </p>

              {/* Country dropdown */}
              <div className="flex mt-5 border-b-2 ">
                <div className="flex justify-center items-center">
                  <img src={renderFlag(callingCode)} className="h-8 w-8" />
                  <select
                    onChange={handleCallingCodeChange}
                    className="rounded-lg px-1 py-1  cursor-pointer outline-none bg-white"
                    style={{ fontFamily: "Bai Jamjuree" }}
                    value={callingCode}
                  >
                    <option className="h-8 w-8" value="+91">
                      +91
                    </option>
                    <option className="h-8 w-8" value="+1">
                      +1
                    </option>
                    <option className="h-8 w-8" value="+971">
                      +971
                    </option>
                    <option className="h-8 w-8" value="+44">
                      +44
                    </option>
                    <option className="h-8 w-8" value="+598">
                      +598
                    </option>
                  </select>
                </div>
                <div className="flex items-center justify-center">
                  <input
                    type="number"
                    placeholder="Mobile Number"
                    className="ml-2 p-6 text-[14px] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-[50px] w-50 border-l hover:border-0 font-semibold"
                    style={{ fontFamily: "Montserrat Alternates" }}
                    value={mobileNumber}
                    onChange={handleChange}
                  />
                  <img src={Phone} className="h-[24px] ml-2 w-[24px]" alt="" />
                </div>
              </div>
              {!isValid && <p className="text-red-600">{errorMessage}</p>}
              <button
                type="submit"
                style={{
                  fontFamily: "Bai Jamjuree",
                  boxShadow: " 2px 2px 25px 2px #DF201F80",
                }}
                className={`bg-red-600 h-[50px] w-[247px] rounded-3xl text-white text-[18px] md:text-[22px] mt-5 ${
                  isValid ? "" : "cursor-not-allowed opacity-50"
                }`}
                disabled={!isValid}
              >
                GET OTP
              </button>
            </div>
          </div>
        </form>

        {/* image */}

        <div className="flex justify">
          <img
            src={Online}
            className="h-[358px] mt-10 w-[425px] md:w-[435px] md:h-[400px]"
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Login;
