import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


export interface Gallary {
    id: string,
    images: string[],
    title: string

}


interface GallaryAddProps {
    onClose: () => void;
    isOpen: boolean;
}


const GallaryModelAdd: React.FC<GallaryAddProps> = ({ onClose, isOpen }) => {
    const { updateId } = useParams()
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [restaurantImages, setRestaurantImages] = useState<string[]>([]);
    const [gallary, setGallary] = useState<Gallary>({
        id: '',
        images: [],
        title: ''

    });
    const presetKey = "ml_default";
    const cloudName = "dwxhjomtn";
    const apiUrl = "http://localhost:3000/gallary";

    const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", presetKey);
            data.append("cloud_name", cloudName);
            data.append("folder", "Restaurants");

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: data,
            });

            const imgData = await response.json();
            return imgData.url;
        } catch (error) {
            return null;
        }

    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (!e.target.files) return;
        const file = e.target.files[0];
        setImageFile(file)
        if (file) {
            const imageUrl: any = await uploadImageToCloudinary(file);
            if (imageUrl) {
                const newImages = [...restaurant.images];
                newImages[index] = imageUrl;
                setRestaurant((prevState) => ({
                    ...prevState,
                    images: newImages
                }));
                setRestaurantImages((prevImages) => {
                    const updatedImages = [...prevImages];
                    // @ts-ignore
                    updatedImages[index] = imageUrl;
                    return updatedImages;
                });
                setPreviewImage(imageUrl);
                e.target.disabled = true;
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedRestaurants: any = { ...restaurant }
        updatedRestaurants[name] = value

        setRestaurant(updatedRestaurants)
    };
    return (
        <div>
            <div className="fixed rounded-[10px] z-10 inset-0 overflow-x-hidden bg-red">
                <div className="flex items-center justify-center h-full ">
                    <div
                        className="fixed inset-0 transition-opacity "
                        aria-hidden="true"
                    >
                        <div className="absolute inset-0 bg-[#161A1D] opacity-75"></div>
                    </div>

                    <div className="bg-white rounded-lg shadow-xl transform transition-all p-6 relative m-8">
                        <button
                            type="button"
                            className={`text-white p-[2px] bg-[#DF201F]  rounded-2xl absolute top-[-10px] right-[-10px]
                   mt-0`}
                        // onClick={closeAddCategoryDialog}
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

                    </div>
                </div>
            </div>
        </div>
    )
}

export default GallaryModelAdd
