import React, { useState } from "react";
import {
  Person,
  Shop,
  Store,
  Email,
} from "@/assets";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { auth, db } from "@/config/Firebase/firebase";
import { ref, set } from "firebase/database";
import { useLanguageContext } from "../context/LanguageContext";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import Input from "./ReusableComponent/Input";

function Register() {
  const { t } = useLanguageContext();
  const navigate = useNavigate();
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedState, setSelectedState] = useState<string>("Gujarat");
  const [name, setName] = useState("");
  const [role, setRole] = useState<string>("customer");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleStateSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
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
  // @ts-ignore
  const SignupWithEmail = async () => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
        .then((result) => {
          toast.success("User Created Successfully.");

          updateProfile(result.user, {
            displayName: name,
          });

          sendEmailVerification(result.user).then(() => {
            alert("Please check your email and verify your account");
          });
        })
        .catch((error) => setErrors(error.message));
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Failed to Create User");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!password) newErrors.password = "Passcode is required.";
    if (!confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required.";
    if (password !== confirmPassword)
      newErrors.confirmPassword = "Passcode and Confirm Passcode must match.";

    setErrors(newErrors);

    if (
      Object.keys(newErrors).length === 0 &&
      isValidEmail
    ) {
      const userData = {
        name,
        email,
        role,
        password,
        confirmPassword,
        state: selectedState,
        id: uuidv4(),
      };
      await SignupWithEmail()

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        const user = userCredential.user;

        // @ts-ignore
        const dbRef = ref(db);
        await set(ref(db, `users/${user.uid}`), userData);
        toast.success("Registration successful!");
        navigate("/login");
      } catch (error) {
        console.error("Error storing user data:", error);
        toast.error("Failed to register user. Please try again.");
      }
    } else {
      if (!isValidEmail) toast.warn("Enter valid email");
      toast.warn("Please fill out all fields.");
    }
  };


  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };



  return (
    <div>
      <div className="flex flex-row px-10 justify-center items-center gap-20 h-full w-full flex-wrap-reverse md:flex-nowrap xl:flex-wrap">
        <form
          style={{ fontFamily: "Montserrat Alternates" }}
          onSubmit={handleSubmit}
        >
          <div className="border-black flex flex-col justify-center items-center">
            <div className="flex flex-col justify-center items-center ">
              <p
                className="text-[30px] font-semibold "
                style={{
                  fontFamily: "Bai Jamjuree",
                }}
              >
                Register{" "}
              </p>
              <p
                className="text-[#A2A3A5] mt-0 text-[16px] font-semibold "
                style={{
                  fontFamily: "Bai Jamjuree",
                }}
              >
                {t("register.createSeller")}
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
                        name="role"
                        id="customer-role"
                      />
                      <label
                        htmlFor="customer-role"
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <div
                          className={`flex justify-center items-center rounded-full ${role === "customer"
                            ? "bg-[#E23635]"
                            : "bg-[#A2A3A5]"
                            } h-10 w-10`}
                        >
                          <img src={Person} alt="" className="h-5" />
                        </div>
                        {t("login.customerRole")}
                      </label>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                      <Input
                        type="radio"
                        value="seller"
                        checked={role === "seller"}
                        onChange={handleRoleChange}
                        className="hidden"
                        name="role"
                        id="seller-role"
                      />
                      <label
                        htmlFor="seller-role"
                        className="flex items-center gap-3 cursor-pointer"
                      >
                        <div
                          className={`flex justify-center items-center rounded-full ${role === "seller" ? "bg-[#E23635]" : "bg-[#A2A3A5]"
                            } h-10 w-10`}
                        >
                          <img src={Store} alt="" className="h-5" />
                        </div>
                        {t("login.sellerRole")}
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center border-b">
                    <Input
                      type="text"
                      value={name}
                      placeholder="Name"
                      className="ml-2 p-6 text-[14px] focus:outline-none h-[50px] w-[320px] hover:border-0 font-semibold "
                      style={{ fontFamily: "Montserrat Alternates" }}
                      onChange={handleNameChange}
                    />
                    <img
                      src={Person}
                      className="h-[24px] ml-2 w-[24px]"
                      alt=""
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-600 text-xs">{errors.name}</p>
                  )}

                  <div className="flex items-center">
                    <Input
                      type="email"
                      placeholder="Email Id"
                      className="ml-2 p-6 text-[14px] focus:outline-none h-[50px] w-[320px] border-b hover:border-0 font-semibold"
                      style={{ fontFamily: "Montserrat Alternates" }}
                      value={email}
                      onChange={handleEmailChange}
                    />
                    <img
                      src={Email}
                      className="h-[24px] ml-2 w-[24px]"
                      alt=""
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-xs">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mt-5 md:shrink flex flex-col gap-2">
                <div className="flex justify-start gap-6">
                  <label className="font-semibold">
                    {t("register.password")}
                  </label>
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

                <div className="mt-5 md:shrink flex flex-col gap-2">
                  <div className="flex justify-start gap-6">
                    <label className="font-semibold">
                      {t("register.confirmPassword")}
                    </label>
                  </div>
                  <div className="flex items-center border-b">
                    <Input
                      type="password"
                      value={confirmPassword}
                      placeholder="Password"
                      className="ml-2 p-6 text-[14px] focus:outline-none h-[50px] w-[320px] hover:border-0 font-semibold"
                      style={{ fontFamily: "Montserrat Alternates" }}
                      onChange={handleConfirmPasswordChange}
                    />
                    <img src={Person} className="h-[24px] ml-2 w-[24px]" alt="" />
                  </div>
                  {errors.password && <p className="text-red-600 text-xs">{errors.password}</p>}

                  <select
                    className="rounded-lg px-1 py-1 cursor-pointer outline-none mt-2 border-b-4 bg-white"
                    value={selectedState}
                    style={{
                      fontFamily: "Bai Jamjuree",
                    }}
                    onChange={handleStateSelect}
                  >
                    <option className="h-8 w-8" value="Gujrat">
                      Gujrat
                    </option>
                    <option className="h-8 w-8" value="Maharashtra">
                      Maharashtra
                    </option>
                    <option className="h-8 w-8" value="Himachal">
                      Himachal
                    </option>
                    <option className="h-8 w-8" value="Jharkhand">
                      Jharkhand
                    </option>
                  </select>

                  <div className="flex flex-row mt-4 justify-start gap-2 items-center">
                    <Input
                      type="checkbox"
                      className="bg-red-600 h-[30px] w-[20px]"
                    />
                    <p className="text-[#161A1D] font-semibold text-lg">
                      {t("register.agreeTerms")}
                    </p>
                  </div>
                </div>

              </div>
              <button
                type="submit"
                className={`bg-[#94CD00] shadow-registerBtn h-[50px] uppercase w-[247px] rounded-3xl text-white text-[18px] md:text-[22px] mt-5 ${isValidEmail &&
                  password === confirmPassword
                  ? ""
                  : "cursor-not-allowed opacity-50"
                  }`}
                style={{
                  fontFamily: "Bai Jamjuree",
                }}
                disabled={
                  !isValidEmail ||
                  password !== confirmPassword
                }
              >
                {t("register.registerButton")}
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
