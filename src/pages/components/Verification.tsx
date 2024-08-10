import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { Logo, Resend, image } from "@/assets";
import { toast } from "react-toastify";
import Loader from "../../Components/ReusableComponent/Loader";
import { useAuth } from "../../context/AuthContext";
import { child, get, ref } from "firebase/database";
import { auth, db } from "@/config/Firebase/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

function Verification() {
  const location = useLocation();
  const { login } = useAuth();
  const { mobileNumber, callingCode } = location.state as {
    mobileNumber: string;
    callingCode: string;
  };
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [resendEnabled, setResendEnabled] = useState(false);
  const [timer, setTimer] = useState(60);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;
      toast.success("User is verified");

      if (user) {
        const userDataRef = ref(db, "users");
        const snapshot = await get(child(userDataRef, `${mobileNumber}`));

        if (snapshot.exists()) {
          const userData = snapshot.val();

          const firebaseUser = auth.currentUser;
          if (firebaseUser) {
            // @ts-ignore
            const token = await firebaseUser.getIdToken(true);
            const idTokenResult = await firebaseUser.getIdTokenResult();
            const role = (idTokenResult.claims.role ||
              userData.role ||
              "customer") as "admin" | "seller" | "customer";

            const user = {
              uid: firebaseUser.uid,
              role: role,
            };

            login(user);
            navigate(
              role === "admin"
                ? "/admin"
                : role === "seller"
                  ? "/seller"
                  : "/customer",
              { state: { mobileNumber, callingCode } }
            );
          }
        }
      }
    } catch (error) {
      console.error("Error during OTP verification", error);
      setError("Invalid OTP!!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(countdown);
    } else {
      setResendEnabled(true);
    }
  }, [timer]);

  const configureCaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
        // @ts-ignore
        callback: (response: any) => {
          toast.success("Otp Resend Successfully")
        },
        "expired-callback": () => {
          toast.warning("reCAPTCHA expired");
        },
      });
    }
  };

  const handleResendOtp = async () => {
    if (resendEnabled) {
      setIsLoading(true);
      try {
        configureCaptcha();
        const appVerifier = window.recaptchaVerifier;
        const phoneNumber = `${callingCode}${mobileNumber}`;

        const result = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
        window.confirmationResult = result;
        toast.success("OTP resent successfully");
        setResendEnabled(false);
        setTimer(60);
      } catch (error) {
        console.error("Error during OTP resend:", error);
        toast.error("An error occurred while resending OTP. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }
  };
  
  return (
    <>
      <Loader isLoading={isLoading}>
        <div className="h-screen w-full flex flex-row justify-center items-center flex-wrap xl:flex-wrap">
          <div className="flex justify-center items-center flex-col ">
            <img src={Logo} className="h-[106px] w-[96px]" alt="" />
            <div className="">
              <p
                className="font-semibold text-[35px] md:text-[35px] lg:text-[32px]"
                style={{
                  fontFamily: "Bai Jamjuree",
                }}
              >
                Verification
              </p>
              <p
                className="font-semibold text-[#A2A3A5] text-[22px] md:text-[22px] lg:text-[25px]"
                style={{
                  fontFamily: "Bai Jamjuree",
                }}
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
                numInputs={6}
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
            {error && <p className="text-red-500">{error}</p>}
            <div className="">
              <p
                className="text-[#DF201F] text-[22px] md:text-[22px] mt-2 font-semibold "
                style={{
                  fontFamily: "Bai Jamjuree",
                }}
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
                  className="h-[34px] ml-2 w-[34px] md:h-[34px] md:w-[34px] cursor-pointer"
                  onClick={handleResendOtp}
                />
              </span>
            </div>
            <button
              type="submit"
              className="bg-red-500 h-[60px] shadow-adminbtn md:h-[60px] w-[260px] md:w-[260px] rounded-[60px] text-white text-[22px] md:text-[22px] mt-5"
              style={{
                fontFamily: "Bai Jamjuree",
              }}
              onClick={handleSubmit}
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
      </Loader>
    </>
  );
}

export default Verification;
