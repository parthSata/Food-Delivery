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
import { useAuth } from "./AuthContext";
import Strings from "./Config/Strings";
import Input from "./ReusableComponent/Input";
import Button from "./ReusableComponent/Button";
import ReCAPTCHA from "react-google-recaptcha";
import config from "../Config";
import Loader from "./ReusableComponent/Loader";
import { useLanguageContext } from "./LanguageContext";


function AdminLogin() {
    const { t } = useLanguageContext();
    const navigate = useNavigate();
    const { login } = useAuth();
    const [mobileNumber, setMobileNumber] = useState<string>("");
    const [callingCode, setCallingCode] = useState<string>("+91");
    const [isValid, setIsValid] = useState<boolean>(true);
    const [errorMessage] = useState<string>(
        "Please enter a valid 10-digit phone number."
    );
    const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
    const [otp, setOtp] = useState("");
    const [passcode, setPasscode] = useState<string>("");
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        ConfigureCaptcha()
    }, []);

    const ConfigureCaptcha = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
                callback: (response: any) => {
                    setRecaptchaToken(response);
                },
                'expired-callback': () => {
                    toast.warning("reCAPTCHA expired");
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

    const onRecaptchaChange = (token: string | null) => {
        setRecaptchaToken(token);
    };

    const handleLogin = async (e?: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true)

        e?.preventDefault();
        ConfigureCaptcha();

        if (isValid && passcode !== "") {
            const phoneNumber = `${callingCode}${mobileNumber}`;
            const appVerifier = window.recaptchaVerifier;

            try {
                const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
                window.confirmationResult = result;
                toast.success("Otp Send Successfully");

                const userDataRef = ref(db, 'users');
                const snapshot = await get(child(userDataRef, `${mobileNumber}`));

                if (snapshot.exists()) {
                    const userData = snapshot.val();

                    if (userData.passcode === passcode) {
                        toast.success("Login successful!");

                        const firebaseUser = auth.currentUser;
                        if (firebaseUser) {
                            const token = await firebaseUser.getIdToken(true);
                            const idTokenResult = await firebaseUser.getIdTokenResult();
                            const role = (idTokenResult.claims.role || userData.role || 'customer') as 'admin' | 'seller' | 'customer';

                            const user = {
                                uid: firebaseUser.uid,
                                role: role,
                            };

                            localStorage.setItem('accessToken', token);
                            login(user);
                        }
                        navigate("/verification", { state: { mobileNumber, callingCode } });
                    } else {
                        toast.warn("Invalid passcode. Please try again.");
                    }
                } else {
                    toast.warn("User not found. Please register first.");
                }
            } catch (error) {
                console.error("Error during login:", error);
                toast.error("An error occurred. Please try again.");
            }

        } else {
            toast.warn("Invalid inputs. Please check your mobile number and passcode.");
            setIsLoading(false)
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
            <Loader isLoading={isLoading}>
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
                                    className="text-[30px] font-semibold "
                                    style={{ fontFamily: "Bai Jamjuree" }}
                                >
                                    {t(Strings.login.adminLogin)}
                                </p>
                                <p
                                    className="text-[#A2A3A5] mt-0  text-[16px] font-semibold "
                                    style={{ fontFamily: "Bai Jamjuree" }}                            >
                                    {t(Strings.login.welcomeMessage)}
                                </p>

                                {/* Country dropdown */}
                                <div className="flex mt-5 border-b-2 ">
                                    <div className="flex justify-center items-center w-full">
                                        <img src={renderFlag(callingCode)} className="h-8 w-8" />
                                        <select
                                            onChange={handleCallingCodeChange}
                                            className="rounded-lg px-1 py-1  cursor-pointer outline-none bg-white w-full" style={{ fontFamily: "Bai Jamjuree" }}
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
                                        <Input
                                            type="number"
                                            placeholder="Mobile Number"
                                            className="ml-2 p-6 text-[14px] focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none h-[50px] w-50 border-l hover:border-0 font-semibold" style={{ fontFamily: "Montserrat Alternates" }}

                                            value={mobileNumber}
                                            onChange={handleChange}
                                        />
                                        <img src={Phone} className="h-[24px] ml-2 w-[24px]" alt="" />
                                    </div>
                                </div>
                                {!isValid && <p className="text-red-600">{errorMessage}</p>}

                                <div className="mt-5 md:shrink flex flex-col gap-2">
                                    <div className="flex justify-start  gap-6">
                                        <label className="font-semibold">{t(Strings.register.passCode)}</label>
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
                                                    type="password"
                                                    key={index}
                                                    className="rounded-md border-2 mr-2 p-[16px] focus:outline-none font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-[30px] md:text-[32px] lg:text-[34px] text-[#161A1D] border-gray-200 md:h-[70px] lg:h-[72px] lg:w-[65px] md:w-[60px] h-[72px] w-[60px]"
                                                    style={{
                                                        width: 50, fontFamily: "Montserrat Alternates",

                                                    }}
                                                />
                                            )}
                                        />
                                    </div>

                                </div>
                                <ReCAPTCHA
                                    sitekey={config.reCaptchkey}
                                    onChange={onRecaptchaChange}
                                />
                                <Button
                                    style={{
                                        fontFamily: "Bai Jamjuree",
                                    }}
                                    className={`bg-red-600  h-[50px] w-[247px] shadow-adminbtn rounded-3xl text-white text-[18px] md:text-[22px] mt-5 ${isValid ? "" : "cursor-not-allowed opacity-50"
                                        }`}
                                    disabled={!isValid || !recaptchaToken}
                                >
                                    {t(Strings.login.loginButton)}
                                </Button>
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
            </Loader>
        </>
    )
}

export default AdminLogin
