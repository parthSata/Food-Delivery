import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import apiUrl from "../Config/apiUrl";

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
  const { updateId } = useParams();
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

  if (!isOpen) return null;
  const uploadImageToCloudinary = async (
    file: File
  ): Promise<string | null> => {
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
    }
  };

  const isFieldEmpty = (value: string | number) => {
    return value === "" || value === null || value === undefined;
  };

  const handleUpdate = async (e: React.FormEvent) => {
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
    }

    const updatedGallary = { ...gallary, imageUrl };

    try {
      const response = await fetch(`${apiUrl}/gallary/${updateId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedGallary),
      });

      if (response.status === 200) {
        // @ts-ignore
        const data = await response.json();
        toast.success("Gallary successfully updated");
      } else {
        toast.warn("Failed to update!");
      }
    } catch (error) {
      toast.error("Error updating Gallary.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Partial<Gallary> = {};

    if (isFieldEmpty(gallary.title)) newErrors.title = "Title is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    let imageUrl: string | string[] = gallary.images;
    if (imageFile) {
      // @ts-ignore
      imageUrl = await uploadImageToCloudinary(imageFile);
      if (!imageUrl) {
        toast.error("Error uploading image.");
        return;
      }
    }

    const newGallary: Gallary = {
      ...gallary,
      id: uuidv4(),
      images: Array.isArray(imageUrl) ? imageUrl : [imageUrl],
    };

    try {
      const response = await fetch(`${apiUrl}/gallary`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGallary),
      });

      if (response.ok) {
        toast.success("Title added successfully!");
        setGallary(newGallary);
      } else {
        toast.error("Failed to add Title.");
      }
    } catch (error) {
      toast.error("Error adding Title.");
    }
    setGallary({
      id: "",
      images: [],
      title: "",
    });
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
              {!updateId ? (
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
              ) : (
                <button
                  type="submit"
                  className={`rounded-[60px] ml-5 text-[#FFFFFF] bg-[#94CD00] h-[40px] w-[140px] `}
                  style={{
                    boxShadow: "2px 2px 25px 2px #94CD0099",
                    fontFamily: "Bai Jamjuree",
                  }}
                  onClick={handleUpdate}
                >
                  Update
                </button>
              )}
              <ToastContainer
                position="top-right"
                autoClose={1000}
                pauseOnFocusLoss={false}
                limit={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GallaryModelAdd;
