import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

export interface Team {
    id: string,
    name: string,
    position: string,
    images: string[]
}

interface TeamAddProps {
    onClose: () => void;
    isOpen: boolean;
}


const TeamAdd: React.FC<TeamAddProps> = ({ onClose, isOpen }) => {
    const apiUrl = "http://localhost:3000/team";
    const presetKey = "ml_default";
    const cloudName = "dwxhjomtn";
    const navigate = useNavigate()
    const { updateId } = useParams()
    const [errors, setErrors] = useState<Partial<Team>>({})
    const [members, setMembers] = useState<Team>({
        id: "",
        name: "",
        position: "",
        images: []
    })
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    if (!isOpen) return null;

    const isFieldEmpty = (value: string | number) => {
        return value === "" || value === null || value === undefined;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedCoupons: any = { ...members }
        updatedCoupons[name] = value

        setMembers(updatedCoupons)
    }

    useEffect(() => {
        if (updateId) {
            fetchMemberData()
        }
    }, [updateId])

    const fetchMemberData = async () => {
        try {
            const response = await fetch(`${apiUrl}/${updateId}`);
            if (response.ok) {
                const data = await response.json();
                setMembers(data);
            }
        } catch (error) {

        }
    }

    const handleUpdateMember = async (e: React.FormEvent) => {
        e.preventDefault();

        const newErrors: Partial<Team> = {};

        if (isFieldEmpty(members.name)) newErrors.name = "Name is required";
        if (isFieldEmpty(members.position)) newErrors.position = "Position is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        let imageUrl = "";
        if (imageFile) {
            imageUrl = await uploadImageToCloudinary(imageFile);
        }

        const updatedCoupon = { ...members, imageUrl, id: members.id };

        try {
            const response = await fetch(`${apiUrl}/${updateId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedCoupon)
            });

            if (response.status === 200) {
                // @ts-ignore
                const data = await response.json();
                toast.success('Coupon successfully updated');
                navigate(`/coupons`)
            } else {
                toast.warn('Failed to update!');
            }
        } catch (error) {
            toast.error("Error updating members.");
        }
    }

    const handleAddMember = async (e: React.FormEvent) => {
        e.preventDefault()

        const newErrors: Partial<Team> = {};

        if (isFieldEmpty(members.name)) newErrors.name = "Name is required";
        if (isFieldEmpty(members.position)) newErrors.position = "Position is required";



        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});

        let imageUrl = "";
        if (imageFile) {
            imageUrl = await uploadImageToCloudinary(imageFile);
        }


        const newCoupon: Team = {
            ...members,

            id: uuidv4(),
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCoupon),
            });
            const result = await response.json();
            toast.success("Member Added", result)
        } catch (error) {
        }
        navigate(`/team`)
        setMembers({
            id: "",
            name: '',
            position: "",
            images: []
        });
        onClose()
    }

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
        formData.append("upload_preset", presetKey);
        formData.append("cloud_name", cloudName);
        formData.append("folder", "Our Team")

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: "POST",
                body: formData,
            });

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
        <div className="fixed  inset-0 flex  items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white w-[400px] h-[570px] sm:w-[500px] sm:h-auto md:w-[500px] md:h-[] lg:w-[] lg:h-[]  xl:w-[500px] xl:h-[560px] gap-2 rounded-[30px] shadow-lg p-6 relative">
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
                            <img src={imagePreview} alt="Selected" className="w-32 h-32  rounded-lg" />
                        ) : (
                            <input
                                type="file"
                                accept="image/*"
                                className="border-2 text-[#A2A3A5] mt-2 p-2 text-xl focus:outline-none rounded-lg w-full"
                                onChange={handleImageChange}
                            />
                        )}
                        {/* {errors.offerCode && (
                            <span
                                className={`text-red-600 text-sm ${members.offerCode ? "" : "hidden"
                                    }}`}
                            >
                                {errors.offerCode}
                            </span>
                        )} */}
                    </div>
                    <div className="flex flex-col  font-semibold gap-1">
                        <label className="self-start">Name</label>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            onChange={handleChange}
                            value={members.name}
                            className="w-full  p-3 border rounded-[10px] text-md placeholder:text-[#A2A3A5] focus:outline-none border-gray-300 "
                        />
                        {errors.name && (
                            <span
                                className={`text-red-600 text-sm ${members.name ? "" : "hidden"
                                    }}`}
                            >
                                {errors.name}
                            </span>
                        )}
                    </div>
                    <div className="flex flex-col  font-semibold gap-1">
                        <label className="self-start">Position</label>
                        <input
                            type="text"
                            placeholder="Position"
                            name="position"
                            onChange={handleChange}
                            value={members.position}
                            className="w-full  p-3 border rounded-[10px] text-md placeholder:text-[#A2A3A5] focus:outline-none border-gray-300 "
                        />
                        {errors.position && (
                            <span
                                className={`text-red-600 text-sm ${members.position ? "" : "hidden"
                                    }}`}
                            >
                                {errors.position}
                            </span>
                        )}
                    </div>
                    {updateId ? (

                        <button
                            type="submit"
                            className="w-full text-xl bg-[#DF201F] h-full text-white py-2 rounded-[60px] "
                            style={{ boxShadow: "2px 2px 20px 2px #DF201F66" }}
                            onClick={handleUpdateMember}
                        >
                            Update
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="w-full text-xl bg-[#DF201F] h-full text-white py-2 rounded-[60px] "
                            style={{ boxShadow: "2px 2px 20px 2px #DF201F66" }}
                            onClick={handleAddMember}
                        >
                            Save
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
    )
}

export default TeamAdd
