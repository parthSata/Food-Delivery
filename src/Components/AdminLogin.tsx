import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, Online, Phone, flag, uk, us, united, uruguay, } from './Config/images'
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import { auth } from "../Firebase/firebase";
import { db } from '../Firebase/firebase';
import { ref, get, child } from 'firebase/database';
import { ToastContainer, toast } from "react-toastify";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


function AdminLogin() {
    const navigate = useNavigate();
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [callingCode, setCallingCode] = useState<string>("+91");
    const [isValid, setIsValid] = useState<boolean>(true);
    const [errorMessage] = useState<string>(
        "Please enter a valid 10-digit phone number."
    );
    const [otp, setOtp] = useState("");
    const [passcode, setPasscode] = useState<string>("");



    useEffect(() => {
        ConfigureCaptcha()
    }, []);

    const ConfigureCaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
                // @ts-ignoreF
                callback: (response: any) => {
                    console.log("reCAPTCHA solved");
                    // @ts-ignore
                    handleLogin()
                },
                'expired-callback': () => {
                    console.log("reCAPTCHA expired");
                }
            });
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const number = e.target.value;
        const mobileNumberPattern = /^\d{10}$/;
        setIsValid(mobileNumberPattern.test(number));
        setMobileNumber(number);
    };


    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        ConfigureCaptcha()
        if (isValid && passcode !== "") {
            const phoneNumber = `${callingCode}${mobileNumber}`;
            const appVerifier = window.recaptchaVerifier
            try {
                // Verify phone number with OTP
                var confirmationResult;
                // @ts-ignore
                const result: any = await signInWithPhoneNumber(auth, phoneNumber, appVerifier).then((confirmationResult) => {
                    toast.success("Otp Send Successfully")
                })


                // Check if the user exists in the database
                const userDataRef = ref(db, 'users');
                const snapshot = await get(child(userDataRef, `${mobileNumber}`));

                if (snapshot.exists()) {
                    const userData = snapshot.val();

                    if (userData.passcode === passcode) {
                        toast.success("Login successful!");
                        navigate("/verification", { state: { mobileNumber, callingCode, confirmationResult } }); // Redirect to verification page after successful login
                    } else {
                        toast.warn("Invalid passcode. Please try again.");
                    }
                } else {
                    toast.warn("User not found. Please register first.");
                }
            } catch (error) {
                toast.error("An error occurred. Please try again.");
            }
        } else {
            toast.warn("Invalid inputs. Please check your mobile number and passcode.");
        }
    };


    const handlePasscodeChange = (otp: string | null) => {
        if (otp !== null && otp !== undefined) {
            setOtp(otp);
            setPasscode(otp);
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
                    onSubmit={handleLogin}
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
                                        onChange={handlePasscodeChange}
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
                            <ToastContainer
                                position="top-right"
                                autoClose={1000}
                                pauseOnFocusLoss={false}
                                limit={1}
                            />
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
