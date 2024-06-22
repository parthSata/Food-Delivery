import firebase from "firebase/compat/app";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, Online, Phone, flag, uk, us, united, uruguay, } from './Config/images'
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import React from "react";

function AdminLogin() {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [callingCode, setCallingCode] = useState<string>("+91");
    const [isValid, setIsValid] = useState<boolean>(true);
    const [errorMessage] = useState<string>(
        "Please enter a valid 10-digit phone number."
    );
    const [otp, setOtp] = useState("");
    // @ts-ignore
    const [confirmationResult, setConfirmationResult] = useState(null);


    useEffect(() => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha - container", {
                size: 'invisible',
                // @ts-ignore
                callback: (response: any) => {
                    console.log("reCAPTCHA solved");
                },
                'expired-callback': () => {
                    console.log("reCAPTCHA expired");
                }
            });
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = e.target.value;
        const mobileNumberPattern = /^\d{10}$/;
        setIsValid(mobileNumberPattern.test(number));
        setMobileNumber(number);
    };

    const handleSignIn = async (e: any) => {
        e.preventDefault();
        if (isValid) {
            const phoneNumber = `${callingCode}${mobileNumber}`;
            try {
                const result: any = await firebase.auth().signInWithPhoneNumber(phoneNumber, window.recaptchaVerifier);
                setConfirmationResult(result);
                navigate("/Verification", { state: { mobileNumber, callingCode } });
            } catch (error) {
                console.error("Error during signInWithPhoneNumber", error);
            }
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
            {/* Admin Login */}
            <div className="flex flex-row  justify-center items-center gap-5 h-screen w-full flex-wrap-reverse xl:flex-wrap">
                {/* Login */}
                <form
                    onSubmit={handleSignIn}
                    style={{ fontFamily: "Montserrat Alternates" }}
                >
                    <div className="border-black flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center ">
                            <img className="h-[80px] w-[80px]" src={Logo} alt="" />
                            <p
                                className="text-[30px] font-semibold"
                                style={{ fontFamily: "Bai Jamjuree" }}
                            >
                                Admin  Login
                            </p>
                            <p
                                className="text-[#A2A3A5] mt-0  text-[16px] font-semibold"
                                style={{ fontFamily: "Bai Jamjuree" }}
                            >
                                Welcome Back!
                            </p>

                            {/* Country dropdown */}
                            <div className="flex mt-5 border-b-2 ">
                                <div className="flex justify-center items-center w-full">
                                    <img src={renderFlag(callingCode)} className="h-8 w-8" />
                                    <select
                                        onChange={handleCallingCodeChange}
                                        className="rounded-lg px-1 py-1  cursor-pointer outline-none bg-white w-full"
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
                                <div className="flex items-center justify-center w-full">
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

                            <div className="mt-5 md:shrink flex flex-col gap-2">
                                <div className="flex justify-start  gap-6">
                                    <label className="font-semibold">Passcode:</label>
                                </div>
                                <div className="flex ">
                                    <OtpInput
                                        value={otp}
                                        onChange={setOtp}
                                        numInputs={6}
                                        inputType="password"
                                        renderInput={(props, index) => (
                                            <input
                                                {...props}
                                                key={index}
                                                className="rounded-md border-2 mr-2 p-[12px] focus:outline-none font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[30px] md:text-[32px] lg:text-[34px] text-[#161A1D] border-gray-200 md:h-[70px] lg:h-[72px] lg:w-[65px] md:w-[60px] h-[72px] w-[60px]"
                                                style={{
                                                    width: 50,
                                                    fontFamily: "Montserrat Alternates",
                                                }}
                                            />
                                        )}
                                    />
                                </div>

                            </div>
                            <button
                                type="submit"
                                style={{
                                    fontFamily: "Bai Jamjuree",
                                    boxShadow: " 2px 2px 25px 2px #DF201F80",
                                }}
                                className={`bg-red-600 h-[50px] w-[247px] rounded-3xl text-white text-[18px] md:text-[22px] mt-5 ${isValid ? "" : "cursor-not-allowed opacity-50"
                                    }`}
                                disabled={!isValid}
                            >
                                LOGIN
                            </button>
                        </div>
                    </div>
                </form>

                {/* image */}

                <div className="flex justify ">
                    <img
                        src={Online}
                        className="h-full  w-[425px] md:w-[435px] md:h-[400px]"
                        alt=""
                    />
                </div>

                <div id="recaptcha-container"></div>
            </div>
        </>
    )
}

export default AdminLogin
