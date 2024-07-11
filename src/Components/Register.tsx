import React, { useState } from "react";
import { Person, Shop, Store, Email, Phone, flag, uk, us, united, uruguay } from "./Config/images";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { db } from '../Firebase/firebase';
import { ref, set } from 'firebase/database';
import Strings from "./Config/Strings";
import Input from "./ReusableComponent.tsx/Input";

function Register() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [callingCode, setCallingCode] = useState<string>("+91");
  const [isValidMobileNumber, setIsValidMobileNumber] = useState<boolean>(true);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [email, setEmail] = useState("");
  const [passcode, setPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [selectedState, setSelectedState] = useState<string>("Gujrat");
  const [name, setName] = useState("");
  const [role, setRole] = useState<string>("customer");

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleStateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = e.target.value;
    const mobileNumberPattern = /^\d{10}$/;
    setIsValidMobileNumber(mobileNumberPattern.test(number));
    setMobileNumber(number);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    setIsValidEmail(validateEmail(enteredEmail));
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = "Name is required.";
    if (!mobileNumber) newErrors.mobileNumber = "Mobile number is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!passcode) newErrors.passcode = "Passcode is required.";
    if (!confirmPasscode) newErrors.confirmPasscode = "Confirm passcode is required.";
    if (passcode !== confirmPasscode) newErrors.confirmPasscode = "Passcode and Confirm Passcode must match.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && isValidMobileNumber && isValidEmail) {
      const userData = {
        name,
        mobileNumber,
        email,
        role,
        passcode,
        state: selectedState,
        id: uuidv4(),
      };

      try {
        // @ts-ignore
        const dbRef = ref(db);
        await set(ref(db, 'users/' + mobileNumber), userData);
        toast.success("Registration successful!");
        navigate("/login");
      } catch (error) {
        console.error("Error storing user data:", error);
        toast.error("Failed to register user. Please try again.");
      }
    } else {
      if (!isValidMobileNumber) toast.warn("Enter valid number");
      if (!isValidEmail) toast.warn("Enter valid email");
      toast.warn("Please fill out all fields.");
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
    <div>
      <div className="flex flex-row px-10 justify-center items-center gap-20 h-full w-full flex-wrap-reverse md:flex-nowrap xl:flex-wrap">
        <form style={{ fontFamily: "Montserrat Alternates" }} onSubmit={handleSubmit}>
          <div className="border-black flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center ">
              <p className="text-[30px] font-semibold" style={{ fontFamily: "Bai Jamjuree" }}>Register </p>
              <p className="text-[#A2A3A5] mt-0 text-[16px] font-semibold" style={{ fontFamily: "Bai Jamjuree" }}>
                {Strings.register.createSeller}
              </p>
              <div className="flex mt-5  ">
                <div className="flex items-center justify-center flex-col gap-6">
                  <div className="flex mt-2 justify-between gap-1 item-center sm:justify-around font-semibold">
                    <div className="flex flex-row gap-3 items-center">
                      <Input
                        type="radio"
                        value="customer"
                        checked={role === "customer"}
                        onChange={handleRoleChange}
                        className="hidden"
                        id="customer-role"
                      />
                      <label htmlFor="customer-role" className="flex items-center gap-3 cursor-pointer">
                        <div className={`flex justify-center items-center rounded-full ${role === "customer" ? "bg-[#E23635]" : "bg-[#A2A3A5]"} h-10 w-10`}>
                          <img src={Person} alt="" className="h-5" />
                        </div>
                        {Strings.login.customerRole}
                      </label>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                      <Input
                        type="radio"
                        value="seller"
                        checked={role === "seller"}
                        onChange={handleRoleChange}
                        className="hidden"
                        id="seller-role"
                      />
                      <label htmlFor="seller-role" className="flex items-center gap-3 cursor-pointer">
                        <div className={`flex justify-center items-center rounded-full ${role === "seller" ? "bg-[#E23635]" : "bg-[#A2A3A5]"} h-10 w-10`}>
                          <img src={Store} alt="" className="h-5" />
                        </div>
                        {Strings.login.sellerRole}
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center border-b">
                    <Input
                      type="text"
                      value={name}
                      placeholder="Name"
                      className="ml-2 p-6 text-[14px] focus:outline-none h-[50px] w-[320px] hover:border-0 font-semibold"
                      style={{ fontFamily: "Montserrat Alternates" }}
                      onChange={handleNameChange}
                    />
                    <img src={Person} className="h-[24px] ml-2 w-[24px]" alt="" />
                  </div>
                  {errors.name && <p className="text-red-600 text-xs">{errors.name}</p>}

                  <div className="flex items-center border-b w-[350px]">
                    <div className="flex">
                      <img src={renderFlag(callingCode)} className="h-8 w-8" />
                      <select
                        onChange={handleCallingCodeChange}
                        className="rounded-lg px-1 py-1 cursor-pointer outline-none bg-white"
                        style={{ fontFamily: "Bai Jamjuree" }}
                        value={callingCode}
                      >
                        <option className="h-8 w-8" value="+91">+91</option>
                        <option className="h-8 w-8" value="+1">+1</option>
                        <option className="h-8 w-8" value="+971">+971</option>
                        <option className="h-8 w-8" value="+44">+44</option>
                        <option className="h-8 w-8" value="+598">+598</option>
                      </select>
                    </div>
                    <Input
                      type="number"
                      placeholder="Mobile Number"
                      className="ml-2 p-6 text-[14px] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-[50px] w-50 border-l hover:border-0 placeholder:font-extrabold font-semibold"
                      style={{ fontFamily: "Montserrat Alternates" }}
                      onChange={handleChange}
                      value={mobileNumber}
                    />
                    <img src={Phone} className="h-[24px] ml-2 w-[24px]" alt="" />
                  </div>
                  {errors.mobileNumber && <p className="text-red-600 text-xs ">{errors.mobileNumber}</p>}

                  <div className="flex items-center">
                    <Input
                      type="email"
                      placeholder="Email Id"
                      className="ml-2 p-6 text-[14px] focus:outline-none h-[50px] w-[320px] border-b hover:border-0 font-semibold"
                      style={{ fontFamily: "Montserrat Alternates" }}
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <img src={Email} className="h-[24px] ml-2 w-[24px]" alt="" />
                  </div>
                  {errors.email && <p className="text-red-600 text-xs">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-5 md:shrink flex flex-col gap-2">
                <div className="flex justify-start gap-6">
                  <label className="font-semibold">{Strings.register.passCode}</label>
                </div>
                <div className="flex">
                  <OtpInput
                    value={passcode}
                    onChange={setPasscode}
                    numInputs={6}
                    inputType="password"
                    renderInput={(props, index) => (
                      <Input
                        {...props}
                        key={index}
                        accept="*"
                        className="rounded-md font-semibold text-lg border-2 mr-2 p-[12px] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[30px] md:text-[32px] lg:text-[34px] text-[#161A1D] border-gray-200 md:h-[50px] lg:h-[50px] lg:w-[65px] md:w-[60px] h-[50px] w-[60px]"
                        style={{ width: 50, fontFamily: "Montserrat Alternates" }}
                      />
                    )}
                  />
                </div>
                {errors.passcode && <p className="text-red-600 text-xs">{errors.passcode}</p>}

                <div className="mt-5 md:shrink flex flex-col gap-2">
                  <div className="flex justify-start gap-6">
                    <label className="font-semibold">{Strings.register.confirmPasscode}</label>
                  </div>
                  <div className="flex">
                    <OtpInput
                      value={confirmPasscode}
                      onChange={setConfirmPasscode}
                      numInputs={6}
                      inputType="password"
                      renderInput={(props, index) => (
                        <Input
                          {...props}
                          key={index}
                          className="rounded-md font-semibold text-lg border-2 mr-2 p-[12px] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[30px] md:text-[32px] lg:text-[34px] text-[#161A1D] border-gray-200 md:h-[50px] lg:h-[50px] lg:w-[65px] md:w-[60px] h-[50px] w-[60px]"
                          style={{ width: 50, fontFamily: "Montserrat Alternates" }}
                        />
                      )}
                    />
                  </div>
                </div>
                {errors.confirmPasscode && <p className="text-red-600 text-xs">{errors.confirmPasscode}</p>}

                <select
                  className="rounded-lg px-1 py-1 cursor-pointer outline-none mt-2 border-b-4 bg-white"
                  style={{ fontFamily: "Bai Jamjuree" }}
                  value={selectedState}
                  onChange={handleStateSelect}
                >
                  <option className="h-8 w-8" value="Gujrat">Gujrat</option>
                  <option className="h-8 w-8" value="Maharashtra">Maharashtra</option>
                  <option className="h-8 w-8" value="Himachal">Himachal</option>
                  <option className="h-8 w-8" value="Jharkhand">Jharkhand</option>
                </select>

                <div className="flex flex-row mt-4 justify-start gap-2 items-center">
                  <Input type="checkbox" className="bg-red-600 h-[30px] w-[20px]" />
                  <p className="text-[#161A1D] font-semibold text-lg">{Strings.register.agreeTerms}</p>
                </div>
              </div>

              <button
                type="submit"
                style={{ fontFamily: "Bai Jamjuree", boxShadow: "2px 2px 25px 2px #94CD0099" }}
                className={`bg-[#94CD00] h-[50px] uppercase w-[247px] rounded-3xl text-white text-[18px] md:text-[22px] mt-5 ${isValidMobileNumber && isValidEmail && passcode === confirmPasscode ? "" : "cursor-not-allowed opacity-50"}`}
                disabled={!isValidMobileNumber || !isValidEmail || passcode !== confirmPasscode}
              >
                {Strings.register.registerButton}
              </button>
              <ToastContainer position="top-right" autoClose={1000} pauseOnFocusLoss={false} limit={1} />
            </div>
          </div>
        </form>

        <div className="flex justify-center">
          <img
            src={Shop}
            className="h-[600px] w-[500px] sm:h-[600px] sm:w-[550px] md:w-[600px] md:h-[600px] lg:h-[700px] lg:w-[700px] xl:h-[700px] xl:w-[650px]"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
