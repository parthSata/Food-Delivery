import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

import Input from "@/Components/ReusableComponent/Input";
import { t } from "i18next";
import config from "@/config/Config";

export interface Team {
  id: string;
  name: string;
  position: string;
  images: string[];
}

interface TeamAddProps {
  onClose: () => void;
  isOpen: boolean;
}

const TeamAdd: React.FC<TeamAddProps> = ({ onClose, isOpen }) => {
  const navigate = useNavigate();
  const { updateId } = useParams();
  const [errors, setErrors] = useState<Partial<Team>>({});
  const [members, setMembers] = useState<Team>({
    id: "",
    name: "",
    position: "",
    images: [],
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (!isOpen) return null;

  const isFieldEmpty = (value: string | number) => {
    return value === "" || value === null || value === undefined;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const updatedCoupons: any = { ...members };
    updatedCoupons[name] = value;

    setMembers(updatedCoupons);
  };

  useEffect(() => {
    if (updateId) {
      fetchMemberData();
    }
  }, [updateId]);

  const fetchMemberData = async () => {
    try {
      const response = await fetch(
        `${config.firebaseDatabaseUrl}/team/${updateId}.json`
      );
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      } else {
        console.error("Failed to fetch member data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching member data:", error);
    }
  };

  const handleUpdateMember = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Team> = {};

    if (isFieldEmpty(members.name)) newErrors.name = "Name is required";
    if (isFieldEmpty(members.position))
      newErrors.position = "Position is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    let imageUrl =
      members.images && members.images.length > 0 ? members.images[0] : "";

    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    }

    const updatedMember: Team = {
      ...members,
      images: [imageUrl],
    };

    try {
      const response = await fetch(
        `${config.firebaseDatabaseUrl}/team/${updateId}.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedMember),
        }
      );

      if (response.ok) {
        toast.success("Member successfully updated");
        navigate(`/team`);
      } else {
        toast.warn("Failed to update member!");
      }
    } catch (error) {
      toast.error("Error updating member.");
    }
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Team> = {};

    if (isFieldEmpty(members.name)) newErrors.name = "Name is required";
    if (isFieldEmpty(members.position))
      newErrors.position = "Position is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    let imageUrl = "";
    if (imageFile) {
      imageUrl = await uploadImageToCloudinary(imageFile);
    }

    const newMember: Team = {
      ...members,
      images: [imageUrl],
      id: uuidv4(),
    };

    try {
      const response = await fetch(`${config.firebaseDatabaseUrl}/team.json`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMember),
      });

      if (response.ok) {
        toast.success("Member added successfully");
        navigate(`/team`);
      } else {
        toast.warn("Failed to add member!");
      }
    } catch (error) {
      toast.error("Error adding member.");
    }

    setMembers({
      id: "",
      name: "",
      position: "",
      images: [],
    });
    onClose();
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

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", config.cloudinaryPresetKey);
    formData.append("cloud_name", config.cloudinaryCloudName);
    formData.append("folder", "Our Team");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${config.cloudinaryCloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        return data.secure_url;
      } else {
        toast.error("Failed to upload image.");
        return "";
      }
    } catch (error) {
      toast.error("Error uploading image.");
      return "";
    }
  };
  return (
    <div className="fixed  inset-0 flex  items-center px-4 justify-center bg-black bg-opacity-70">
      <div className="bg-white w-[500px] h-[420px]  gap-2 rounded-[30px] shadow-lg p-6 relative">
        <button
          className="absolute -top-8 right-[14px]  text-white bg-red-500 rounded-full w-10 h-6 flex items-center justify-center"
          onClick={onClose}
        >
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
        <form className="space-y-4 ">
          <div className="flex flex-col justify-center items-center font-semibold gap-1">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Selected"
                className="w-32 h-32  rounded-lg"
              />
            ) : (
              <Input
                type="file"
                accept="image/*"
                className="border-2 text-[#A2A3A5] mt-2 p-2 text-xl focus:outline-none rounded-lg w-full"
                onChange={handleImageChange}
              />
            )}
            {errors.images && (
              <span
                className={`text-red-600 text-sm ${
                  members.images ? "" : "hidden"
                }}`}
              >
                {errors.images}
              </span>
            )}
          </div>
          <div className="flex flex-col  font-semibold gap-1">
            <label className="self-start">{t("productAdd.nameLabel")}</label>
            <Input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={members.name}
              className="w-full  p-3 border rounded-[10px] text-md placeholder:text-[#A2A3A5] focus:outline-none border-gray-300 "
            />
            {errors.name && (
              <span
                className={`text-red-600 text-sm ${
                  members.name ? "" : "hidden"
                }}`}
              >
                {errors.name}
              </span>
            )}
          </div>
          <div className="flex flex-col  font-semibold gap-1">
            <label className="self-start">{t("ourTeam.positionLabel")}</label>
            <Input
              type="text"
              placeholder="Position"
              name="position"
              onChange={handleChange}
              value={members.position}
              className="w-full  p-3 border rounded-[10px] text-md placeholder:text-[#A2A3A5] focus:outline-none border-gray-300 "
            />
            {errors.position && (
              <span
                className={`text-red-600 text-sm ${
                  members.position ? "" : "hidden"
                }}`}
              >
                {errors.position}
              </span>
            )}
          </div>
          {updateId ? (
            <button
              type="submit"
              className="w-full text-xl bg-[#DF201F] h-full text-white py-2 rounded-[60px] shadow-couponAdd"
              onClick={handleUpdateMember}
            >
              {t("ourTeam.updateButton")}
            </button>
          ) : (
            <button
              type="submit"
              className="w-full text-xl bg-[#DF201F] h-full text-white py-2 rounded-[60px] shadow-couponAdd"
              onClick={handleAddMember}
            >
              {t("couponAdd.saveButton")}
            </button>
          )}
          <ToastContainer
            position="top-right"
            autoClose={1000}
            pauseOnFocusLoss={false}
            limit={1}
          />
        </form>
      </div>
    </div>
  );
};

export default TeamAdd;
