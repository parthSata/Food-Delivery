import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { db } from '../../Firebase/firebase';
import { set, ref } from 'firebase/database';
import Loader from "../Loader";

export interface Gallary {
  id: string;
  images: string[];
  title: string;
}

interface AddProps {
  onClose: () => void;
  isOpen: boolean;
}

const GallaryModelAdd: React.FC<AddProps> = ({ onClose, isOpen }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [gallary, setGallary] = useState<Gallary>({
    id: "",
    images: [],
    title: "",
  });
  const [errors, setErrors] = useState<Partial<Gallary>>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const presetKey = "ml_default";
  const cloudName = "dwxhjomtn";
  const [isLoading, setisLoading] = useState(false)

  if (!isOpen) return null;
  const uploadImageToCloudinary = async (
    file: File
  ): Promise<string | null> => {
    setisLoading(true)
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", presetKey);
      data.append("cloud_name", cloudName);
      data.append("folder", "Gallary");

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      const imgData = await response.json();
      return imgData.url;
    } catch (error) {
      return null;
    } finally {
      setisLoading(true)
    }

  };

  const isFieldEmpty = (value: string | number) => {
    return value === "" || value === null || value === undefined;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setisLoading(true)

    e.preventDefault();
    const newErrors: Partial<Gallary> = {};

    if (isFieldEmpty(gallary.title)) newErrors.title = "Title is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    let imageUrl: any = gallary.images;
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
      if (!imageUrl) {
        toast.error("Error uploading image.");
        return;
      }
    }

    const newGallary: Gallary = {
      ...gallary,
      id: gallary.id || uuidv4(),
      images: Array.isArray(imageUrl) ? imageUrl : [imageUrl],
    };

    try {
      const gallaryRef = ref(db, `gallary/${newGallary.id}`);
      await set(gallaryRef, newGallary);
      toast.success("Gallery item saved successfully!");
      setGallary(newGallary);
    } catch (error) {
      toast.error("Failed to save gallery item.");
      console.error("Error saving gallery item:", error);
    }
    setisLoading(false)
    setGallary({
      id: "",
      images: [],
      title: "",
    });
    setImageFile(null);
    setImagePreview(null);
    onClose();
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedTitle: any = { ...gallary };
    updatedTitle[name] = value;

    setGallary(updatedTitle);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="fixed rounded-[10px] z-10 inset-0 overflow-x-hidden bg-red">
        <div className="flex items-center justify-center h-full ">
          <div className="fixed inset-0 transition-opacity " aria-hidden="true">
            <div className="absolute inset-0 bg-[#161A1D] opacity-75"></div>
          </div>
          <Loader isLoading={isLoading}>
            <div className="bg-white rounded-lg shadow-xl transform transition-all p-6 relative m-8">
              <button
                type="button"
                className={`text-white p-[2px] bg-[#DF201F]  rounded-2xl absolute top-[-10px] right-[-10px]
                   mt-0`}
                onClick={onClose}
              >
                <span className="sr-only ">Close</span>
                <svg
                  className="h-[26px] w-[26px] p-[4px]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>

              <div
                className={`flex justify-center gap-2  mt-[250px] sm:mt-[200px] md:mt-[20px] lg:mt-[20px]  xl:mt-[5px]  lg:flex-nowrap flex-wrap`}
              >
                {/* image */}
                <div
                  className={`flex flex-col items-center relative mt-[2px] sm:mt-[60px] md:mt-[10px] lg:mt-[10px] `}
                >
                  <span
                    className="font-semibold"
                    style={{ fontFamily: "Montserrat Alternates" }}
                  >
                    Gallary Image
                  </span>

                  <div className="">
                    <div className="flex justify-center items-starts flex-col ">
                      {imagePreview ? (
                        <img
                          src={imagePreview}
                          alt="Selected"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                      ) : (
                        <input
                          type="file"
                          accept="image/*"
                          className="border-2 text-[#A2A3A5] mt-2 p-2 text-xl focus:outline-none rounded-lg w-full"
                          onChange={handleImageChange}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="w-full max-w-lg">
                  <form
                    className="w-full flex flex-row font-semibold "
                    style={{ fontFamily: "Montserrat Alternates" }}
                  >
                    <div className="flex flex-wrap mb-6">
                      <div className="w-full px-3 mb-6">
                        <label className="flex justify-self-start  uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Title
                        </label>
                        <input
                          className={` appearance-none w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] ro unded py-3 px-4 leading-tight hover:outline-none hover:border-[#9ad219]    focus:outline-[#99c928] rounded-md bg-white`}
                          type="text"
                          placeholder="Title"
                          name="title"
                          onChange={handleChange}
                          value={gallary.title}
                        />
                        {errors.title && (
                          <span
                            className={`text-red-600 text-sm ${gallary.title ? "" : "hidden"
                              }}`}
                          >
                            {errors.title}
                          </span>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="rounded-[60px] ml-5 text-[#FFFFFF] bg-[#94CD00] h-[40px] w-[140px]"
                  style={{
                    boxShadow: "2px 2px 25px 2px #94CD0099",
                    fontFamily: "Bai Jamjuree",
                  }}
                  onClick={handleSubmit}
                >
                  Save
                </button>
                <ToastContainer
                  position="top-right"
                  autoClose={1000}
                  pauseOnFocusLoss={false}
                  limit={1}
                />
              </div>
            </div>
          </Loader>
        </div>
      </div>
    </div >
  );
};

export default GallaryModelAdd;
