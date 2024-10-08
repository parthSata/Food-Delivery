import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Logo, Online, Email, Person } from "@/assets";
import "react-phone-input-2/lib/style.css";
import { auth } from "@/config/Firebase/firebase";
import { db } from "@/config/Firebase/firebase";
import { ref, get } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth, } from "@/context/AuthContext";
import { t } from "i18next";
import { Button, Input, Loader } from "@/Components/index";

function AdminLogin() {
  const navigate = useNavigate();
  const { login, fetchUserRole } = useAuth();
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token && auth.currentUser) {
      const checkUserRole = async () => {
        const user = auth.currentUser;
        if (user) {
          const role = await fetchUserRole(user.uid);
          if (role) {
            navigate(
              role === "admin" ? "/admin" :
                role === "seller" ? "/seller" :
                  "/customer"
            );
          }
        }
      };
      checkUserRole();
    }
  }, [navigate, fetchUserRole]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    setIsValidEmail(validateEmail(enteredEmail));
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleForgotPassword = () => {
    if (!email) {
      return;
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
    ) {
      toast.warn("Please write a valid email");
      return;
    }

    // Send a password reset email
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Please check your email for password reset instructions");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleLogin = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setIsLoading(true);

    const newErrors: { [key: string]: string } = {};
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Password is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0 && isValidEmail) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
          toast.warn("Please verify your email");
          setIsLoading(false);
          return;
        }

        const userDataRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userDataRef);

        if (snapshot.exists()) {
          const userData = snapshot.val();

          const token = await user.getIdToken(true);
          const idTokenResult = await user.getIdTokenResult();
          const role = (idTokenResult.claims.role || userData.role || "customer") as "admin" | "seller" | "customer";

          const currentUser = {
            uid: user.uid,
            role: role,
          };

          localStorage.setItem("accessToken", token);
          login(currentUser);
          toast.success("Login successful!");


          navigate(
            role === "admin" ? "/admin" :
              role === "seller" ? "/seller" :
                "/customer"
          );
        } else {
          toast.warn("User not found. Please register first.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error("Failed to login. Please check your email and password.");
      }
    } else {
      toast.warn("Invalid inputs. Please check your email and password.");
      setIsLoading(false);
    }
  };
  return (
    <>
      {/* Admin Login */}
      <Loader isLoading={isLoading}>

        <div className="flex flex-row justify-center items-center gap-5 h-screen w-full overflow-x-auto flex-wrap-reverse xl:flex-wrap">
          {/* Login */}
          <form
            onSubmit={handleLogin}
            style={{ fontFamily: "Montserrat Alternates" }}
          >
            <div className="border-black flex flex-col justify-center items-center">
              <div className="flex flex-col justify-center items-center">
                <div className="border-black flex flex-col justify-center items-center">
                  <div className="flex flex-col justify-center items-center">
                    <img className="h-[80px] w-[80px]" src={Logo} alt="" />
                    <p className="text-[30px] font-semibold" style={{ fontFamily: "Bai Jamjuree" }}>{t("login.adminLogin")}
                    </p>
                    <p className="text-[#A2A3A5] mt-0 text-[16px] font-semibold" style={{ fontFamily: "Bai Jamjuree" }}>{t("login.welcomeMessage")}
                    </p>

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

                  <div className="flex items-center border-b">
                    <Input
                      type="password"
                      value={password}
                      placeholder="Password"
                      className="ml-2 p-6 text-[14px] focus:outline-none h-[50px] w-[320px] hover:border-0 font-semibold"
                      style={{ fontFamily: "Montserrat Alternates" }}
                      onChange={handlePasswordChange}
                    />
                    <img src={Person} className="h-[24px] ml-2 w-[24px]" alt="" />
                  </div>
                  {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}

                  <p className="font-semibold text-[#DF201F] self-end" onClick={handleForgotPassword}>
                    Forgot Password
                  </p>

                  <div className="flex justify-center flex-col m-4">
                    <Button
                      style={{ fontFamily: "Bai Jamjuree", boxShadow: "2px 2px 25px 2px #DF201F80" }}
                      className={`bg-red-600 h-[50px] w-[247px] rounded-3xl text-white text-[18px] md:text-[22px] mt-5 ${isValidEmail ? "" : "cursor-not-allowed opacity-50"}`}
                      disabled={!isValidEmail || isLoading}
                    >
                      LOGIN
                    </Button>
                  </div>
                  <ToastContainer position="top-right" autoClose={1000} pauseOnFocusLoss={false} limit={1} />
                </div>
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
        </div>
      </Loader >
    </>
  );
}

export default AdminLogin;
