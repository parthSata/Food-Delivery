import "react-toastify/dist/ReactToastify.css";
import {
  Email,
  RestaurantImg,
  CloudUpload,
  ImageOfRestaurant,
  BuisnessName,
  Owner,
  Address,
  uploadDocument,
  Attach,
} from "@/assets";
import { ToastContainer, toast } from "react-toastify";
import { db, storage } from "@/config/Firebase/firebase"; // Import storage from firebase
import { ref as dbRef, set } from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Button from "@/Components/ReusableComponent/Button";
import Input from "@/Components/ReusableComponent/Input";
import { useLanguageContext } from "@/context/LanguageContext";
// import { loadStripe } from '@stripe/stripe-js';
// import config from "@/config/Config";
// const stripePromise = loadStripe(`${config.stripeKey}`);

interface BusinessDetails {
  id: string;
  images: string[];
  businessName: string;
  ownerName: string;
  address: string;
  gstNo: string;
  email: string;
  uploadDocument: string[];
}

function BusinessDetails() {
  const { t } = useLanguageContext();
  // const presetKey = "ml_default";
  // const cloudName = "dwxhjomtn";
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isValidEmail, setIsValidEmail] = useState<boolean>(true);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Partial<BusinessDetails>>({});
  const [businessData, setBusinessData] = useState<BusinessDetails>({
    id: "",
    uploadDocument: [],
    businessName: "",
    ownerName: "",
    address: "",
    gstNo: "",
    email: "",
    images: [],
  });
  const [uploadedDocuments, setUploadedDocuments] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setBusinessData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredEmail = e.target.value;
    setEmail(enteredEmail);
    setIsValidEmail(validateEmail(enteredEmail));
    handleChange(e);
  };

  const validateEmail = (email: string) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isFieldEmpty = (value: string | number) => {
    return value === "" || value === null || value === undefined;
  };

  const validateFields = (): Partial<BusinessDetails> => {
    const newErrors: Partial<BusinessDetails> = {};

    if (isFieldEmpty(businessData.businessName))
      newErrors.businessName = "Business Name is required";
    if (isFieldEmpty(businessData.ownerName))
      newErrors.ownerName = "Owner Name is required";
    if (isFieldEmpty(businessData.address))
      newErrors.address = "Address is required";
    if (isFieldEmpty(businessData.gstNo))
      newErrors.gstNo = "GST NO is required";
    if (isFieldEmpty(businessData.email)) newErrors.email = "Email is required";

    return newErrors;
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setUploadedDocuments((prevDocs) => [...prevDocs, file]);
  };

  const uploadFileToFirebase = async (
    file: File,
    folder: string
  ): Promise<string> => {
    const fileRef = storageRef(storage, `${folder}/${file.name}`);
    await uploadBytes(fileRef, file);
    return getDownloadURL(fileRef);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("Button Clicked")
    e.preventDefault();

    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    try {
      const imageUrls: string[] = [];
      const documentUrls: string[] = [];

      if (imageFile) {
        const imageUrl = await uploadFileToFirebase(
          imageFile,
          "business_image"
        );
        imageUrls.push(imageUrl);
      }

      for (const doc of uploadedDocuments) {
        const docUrl = await uploadFileToFirebase(doc, "business_documents");
        documentUrls.push(docUrl);
      }

      const businessDetails = {
        ...businessData,
        images: imageUrls,
        uploadDocument: documentUrls,
        id: uuidv4(),
      };

      const newBusinessRef = dbRef(
        db,
        "businessDetails/" + new Date().getTime()
      );
      await set(newBusinessRef, businessDetails);

      toast.success("Business details saved successfully!");
      setBusinessData({
        id: "",
        uploadDocument: [],
        businessName: "",
        ownerName: "",
        address: "",
        gstNo: "",
        email: "",
        images: [],
      });

      // const response = await fetch(`create-checkout-session`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({}),
      // });

      // if (!response.ok) {
      //   throw new Error(`Server error: ${response.status}`);
      // }

      // const session = await response.json();
      // const stripe = await stripePromise;



      // if (!stripe) {
      //   throw new Error("Stripe not initialized");
      // }

      // await stripe.redirectToCheckout({ sessionId: session.id });
      // navigate("seller/create-checkout-session")
    } catch (error) {
      toast.error("Failed to save business details.");
      if (error instanceof TypeError) {
        toast.error("Failed to fetch. Is the server running?");
      } else {
        toast.error("Failed to save business details.");
      }
      console.error("Error saving business details:", error);
    }
  };

  return (
    <div>
      <div className="flex flex-row py-4 justify-center  items-center gap-20 h-full w-full flex-wrap md:flex-nowrap xl:flex-wrap">
        {/* Form */}

        <form
          style={{ fontFamily: "Montserrat Alternates" }}
          onSubmit={handleSubmit}
        >
          <div className="border-black flex flex-col  justify-center items-center">
            <div className="flex flex-col justify-center items-center ">
              <p
                className="text-[30px] font-semibold"
                style={{ fontFamily: "Bai Jamjuree" }}
              >
                {t("businessDetail.title")}{" "}
              </p>

              <div
                className=" mx-auto relative bg-white mt-10     border-gray-300 border-none rounded-full "
                style={{
                  boxShadow: " 0px 0px 10px 0px #00000026",
                }}
              >
                <div className="p-4 h-36 w-36 flex flex-col items-center justify-center text-center cursor-pointer">
                  {imageFile ? (
                    <img
                      src={URL.createObjectURL(imageFile) || RestaurantImg}
                      alt=""
                      className="h-full w-full rounded-full"
                    />
                  ) : (
                    <label
                      htmlFor="chooseFile"
                      className="flex items-center flex-col"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-11 mb-2 fill-gray-500"
                        viewBox="0 0 32 32"
                      >
                        <path
                          d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                          data-original="#000000"
                        />
                        <path
                          d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                          data-original="#000000"
                        />
                      </svg>
                      <span className="text-xs">
                        {t("businessDetail.uploadImage")}
                      </span>

                      <Input
                        type="file"
                        id="chooseFile"
                        className="h-full w-full hidden rounded-full"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>

                <div className="absolute border-none rounded-full top-16 left-28 border-black">
                  <Button className="h-10 flex justify-center items-center w-10 rounded-full bg-white shadow-cloud">
                    <img src={CloudUpload} alt="" className="full" />
                  </Button>
                </div>
              </div>

              {/* Country dropdown */}
              <div className="flex mt-5  ">
                <div className="flex items-center justify-center flex-col gap-6">
                  {/* Name */}

                  <div className="flex items-center border-b">
                    <Input
                      type="text"
                      placeholder="Business Name"
                      name="businessName"
                      onChange={handleChange}
                      className="ml-2 p-6 text-[14px] focus:outline-none placeholder:text-[#161A1D] text-[#161A1D] h-[50px] w-[320px]  hover:border-0 font-semibold"
                      style={{ fontFamily: "Montserrat Alternates" }}
                    />
                    <img
                      src={BuisnessName}
                      className="h-[24px]  ml-2 w-[24px]"
                      alt=""
                    />
                  </div>
                  {errors.businessName && (
                    <span
                      className={`text-red-600 text-sm ${businessData.businessName ? "" : "hidden"
                        }}`}
                    >
                      {errors.businessName}
                    </span>
                  )}

                  <div className="flex items-center border-b">
                    <Input
                      type="text"
                      placeholder="Owner Name"
                      className="ml-2 p-6 text-[14px] focus:outline-none placeholder:text-[#161A1D] text-[#161A1D] h-[50px] w-[320px]  hover:border-0 font-semibold"
                      style={{ fontFamily: "Montserrat Alternates" }}
                      name="ownerName"
                      onChange={handleChange}
                    />
                    <img
                      src={Owner}
                      className="h-[24px]  ml-2 w-[24px]"
                      alt=""
                    />
                  </div>
                  {errors.ownerName && (
                    <span
                      className={`text-red-600 text-sm ${businessData.ownerName ? "" : "hidden"
                        }}`}
                    >
                      {errors.ownerName}
                    </span>
                  )}

                  <div className="flex items-center border-b">
                    <textarea
                      className="ml-2 p-6  text-[14px] focus:outline-none placeholder:text-[#161A1D] text-[#161A1D] h-[50px] w-[320px]  hover:border-0 font-semibold resize-none overflow-hidden"
                      rows={4}
                      placeholder="Address"
                      style={{ fontFamily: "Montserrat Alternates" }}
                      name="address"
                      onChange={handleChange}
                    ></textarea>

                    <img
                      src={Address}
                      className="h-[24px]  ml-2 w-[24px]"
                      alt=""
                    />
                  </div>
                  {errors.address && (
                    <span
                      className={`text-red-600 text-sm ${businessData.address ? "" : "hidden"
                        }}`}
                    >
                      {errors.address}
                    </span>
                  )}

                  <div className="flex items-center border-b">
                    <Input
                      type="text"
                      placeholder="GST No"
                      className="ml-2 p-6 text-[14px] focus:outline-none placeholder:text-[#161A1D] text-[#161A1D] h-[50px] w-[320px]  hover:border-0 font-semibold"
                      style={{ fontFamily: "Montserrat Alternates" }}
                      name="gstNo"
                      onChange={handleChange}
                    />
                    <img
                      src={BuisnessName}
                      className="h-[24px]  ml-2 w-[24px]"
                      alt=""
                    />
                  </div>
                  {errors.gstNo && (
                    <span
                      className={`text-red-600 text-sm ${businessData.gstNo ? "" : "hidden"
                        }}`}
                    >
                      {errors.gstNo}
                    </span>
                  )}

                  <div className="flex items-center">
                    <Input
                      type="email"
                      placeholder="Email"
                      className="ml-2 p-6 text-[14px] focus:outline-none placeholder:text-[#161A1D] text-[#161A1D]  h-[50px] w-[320px] border-b font-semibold"
                      style={{ fontFamily: "Montserrat Alternates" }}
                      name="email"
                      onChange={handleEmailChange}
                      value={email}
                    />
                    <img
                      src={Email}
                      className="h-[24px] ml-2 w-[24px]"
                      alt=""
                    />
                  </div>
                  {isValidEmail && (
                    <span
                      className={`text-red-600 text-sm ${businessData.email ? "" : "hidden"
                        }}`}
                    >
                      {errors.email}
                    </span>
                  )}

                  <div className="flex gap-4">
                    <div className="">
                      <label
                        htmlFor="uploadDocument"
                        className="bg-[#FFF3E5] flex h-10 rounded-md w-40 gap-2 text-sm font-semibold justify-center items-center cursor-pointer"
                      >
                        <img
                          src={uploadDocument}
                          alt=""
                          className="h-4 w-4"
                          style={{ fontFamily: "Bai Jamjuree" }}
                        />
                        {t("businessDetail.uploadLabel")}
                      </label>
                      <Input
                        type="file"
                        id="uploadDocument"
                        className="hidden"
                        onChange={handleDocumentUpload}
                      />
                      {/* <Button className="bg-[#FFF3E5] flex h-10 rounded-md w-40 gap-2 text-sm font-semibold justify-center items-center"><img src={uploadDocument} alt="" className="h-4 w-4" style={{ fontFamily: "Bai Jamjuree" }} /> Upload </Button> */}
                    </div>
                    <div className="flex gap-2">
                      <div className="flex-col gap-2">
                        {uploadedDocuments.map((doc, index) => (
                          <div
                            key={index}
                            className="flex gap-1 items-center justify-center text-xs font-semibold"
                          >
                            <img src={Attach} alt="" className="h-4 w-4" />
                            <label>{doc.name}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                style={{
                  fontFamily: "Bai Jamjuree",
                }}
                className={`bg-[#94CD00] uppercase h-[50px] w-[247px] rounded-3xl text-white text-lg  mt-5 cursor-pointer shadow-registerBtn`}
                onClick={handleSubmit}
              >
                {t("businessDetail.saveAndContinueButton")}
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

        {/* Image */}
        <div className="flex justify-center order-2 ">
          <img
            src={ImageOfRestaurant}
            className="h-[500px] w-[500px] "
            // sm:h-[600px] sm:w-[550px] md:w-[600px] md:h-[600px] lg:h-[700px] lg:w-[700px] xl:h-[500px] xl:w-[0px]
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default BusinessDetails;
