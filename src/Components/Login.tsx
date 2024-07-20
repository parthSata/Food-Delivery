import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Logo,
  Online,
  Phone,
  flag,
  uk,
  us,
  united,
  uruguay,
  Store,
  Person,
} from "@/assets";
import "react-phone-input-2/lib/style.css";
import OtpInput from "react-otp-input";
import { auth, db } from "../Firebase/firebase";
import { ref, get, child } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useAuth } from "./AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import config from "../Config";
// import Loader from "./Loader";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [callingCode, setCallingCode] = useState<string>("+91");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage] = useState<string>(
    "Please enter a valid 10-digit phone number."
  );
  const [otp, setOtp] = useState<string>("");
  const [passcode, setPasscode] = useState<string>("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [role, setRole] = useState("");
  // const [isLoading, setIsLoading] = useState(false)

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  useEffect(() => {
    ConfigureCaptcha();
  }, []);

  const ConfigureCaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            setRecaptchaToken(response);
          },
          "expired-callback": () => {
            toast.warning("reCAPTCHA expired");
          },
        }
      );
    }
  };

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
    e?.preventDefault();
    ConfigureCaptcha();

    if (isValid && passcode !== "") {
      const phoneNumber = `${callingCode}${mobileNumber}`;
      const appVerifier = window.recaptchaVerifier;

      try {
        const result = await signInWithPhoneNumber(
          auth,
          phoneNumber,
          appVerifier
        );
        window.confirmationResult = result;
        toast.success("Otp Send Successfully");

        const userDataRef = ref(db, "users");
        const snapshot = await get(child(userDataRef, `${mobileNumber}`));

        if (snapshot.exists()) {
          const userData = snapshot.val();

          if (userData.passcode === passcode) {
            toast.success("Login successful!");

            const firebaseUser = auth.currentUser;
            if (firebaseUser) {
              const token = await firebaseUser.getIdToken(true);
              const idTokenResult = await firebaseUser.getIdTokenResult();
              const role = (idTokenResult.claims.role ||
                userData.role ||
                "customer") as "admin" | "seller" | "customer";
              console.log("🚀 ~ handleLogin ~ role:", role);

              const user = {
                uid: firebaseUser.uid,
                role: role,
              };

              localStorage.setItem("accessToken", token);
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
      toast.warn(
        "Invalid inputs. Please check your mobile number and passcode."
      );
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
      {/* <Loader isLoading={isLoading}> */}
      <div className="flex flex-row justify-center items-center gap-5 h-full w-full flex-wrap-reverse xl:flex-wrap">
        {/* Login */}
        <form
          onSubmit={handleLogin}
          style={{ fontFamily: "Montserrat Alternates" }}
        >
          <div className="border-black flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center">
              <img className="h-[80px] w-[80px]" src={Logo} alt="" />
              <p
                className="text-[30px] font-semibold"
                style={{ fontFamily: "Bai Jamjuree" }}
              >
                Login
              </p>
              <p
                className="text-[#A2A3A5] mt-0 text-[16px] font-semibold"
                style={{ fontFamily: "Bai Jamjuree" }}
              >
                Welcome Back!
              </p>

              {/* Country dropdown */}
              <div className="flex mt-5 border-b-2">
                <div className="flex justify-center items-center">
                  <img src={renderFlag(callingCode)} className="h-8 w-8" />
                  <select
                    onChange={handleCallingCodeChange}
                    className="rounded-lg px-1 py-1 cursor-pointer outline-none bg-white"
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

              <div className="mt-5 md:shrink flex flex-col gap-2">
                <div className="flex justify-start gap-6">
                  <label className="font-semibold">Passcode:</label>
                </div>
                <div className="flex">
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
                <p className="font-semibold text-[#DF201F] self-end">
                  Forgot Passcode
                </p>
                <div className="flex  flex-col ">
                  <div className="flex items-center justify-center flex-col gap-6">
                    <div className="flex mt-2 justify-between gap-1 item-center sm:justify-around font-semibold">
                      <div className="flex flex-row gap-3 items-center">
                        <input
                          type="radio"
                          value="customer"
                          checked={role === "customer"}
                          onChange={handleRoleChange}
                          className="hidden"
                          id="customer-role"
                        />
                        <label
                          htmlFor="customer-role"
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <div
                            className={`flex justify-center items-center rounded-full ${
                              role === "customer"
                                ? "bg-[#E23635]"
                                : "bg-[#A2A3A5]"
                            } h-10 w-10`}
                          >
                            <img src={Person} alt="" className="h-5" />
                          </div>
                          Customer
                        </label>
                      </div>
                      <div className="flex flex-row gap-3 items-center">
                        <input
                          type="radio"
                          value="seller"
                          checked={role === "seller"}
                          onChange={handleRoleChange}
                          className="hidden"
                          id="seller-role"
                        />
                        <label
                          htmlFor="seller-role"
                          className="flex items-center gap-3 cursor-pointer"
                        >
                          <div
                            className={`flex justify-center items-center rounded-full ${
                              role === "seller"
                                ? "bg-[#E23635]"
                                : "bg-[#A2A3A5]"
                            } h-10 w-10`}
                          >
                            <img src={Store} alt="" className="h-5" />
                          </div>
                          Seller
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center flex-col m-4">
                <ReCAPTCHA
                  sitekey={config.reCaptchkey}
                  onChange={onRecaptchaChange}
                />
                <button
                  type="submit"
                  style={{
                    fontFamily: "Bai Jamjuree",
                    boxShadow: "2px 2px 25px 2px #DF201F80",
                  }}
                  className={`bg-red-600 h-[50px] w-[247px] rounded-3xl text-white text-[18px] md:text-[22px] mt-5 ${
                    isValid ? "" : "cursor-not-allowed opacity-50"
                  }`}
                  disabled={!isValid || !recaptchaToken}
                >
                  LOGIN
                </button>
              </div>
              <ToastContainer
                position="top-right"
                autoClose={1000}
                pauseOnFocusLoss={false}
                limit={1}
              />
            </div>
            <div className="mt-4">
              <p className="text-gray-400 text-lg">
                Don’t Have an account?
                <span className="text-[#161A1D] font-semibold">
                  <Link to="/register"> Register now?</Link>
                </span>
              </p>
            </div>
          </div>
        </form>

        {/* image */}
        <div className="flex justify">
          <img
            src={Online}
            className="h-full w-[425px] md:w-[435px] md:h-[400px]"
            alt=""
          />
        </div>

        <div id="recaptcha-container"></div>
      </div>
      {/* </Loader> */}
    </>
  );
};

export default Login;
