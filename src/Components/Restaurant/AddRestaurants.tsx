import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { db } from '../../Firebase/firebase';
import { set, ref, onValue, update } from 'firebase/database';
import Container from "../Container";

export interface Restaurant {
  id: string;
  restaurantName: string;
  address: string;
  mobilenumber: number | string;
  ratings: number | string;
  description: string;
  images: string[];
  latitude: number | string;
  longitude: number | string;
}

function AddRestaurants() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [restaurantImages, setRestaurantImages] = useState<string[]>([]);
  const navigate = useNavigate();
  const { updateId } = useParams();
  const presetKey = "ml_default";
  const cloudName = "dwxhjomtn";
  const [errors, setErrors] = useState<Partial<Restaurant>>({});
  const [restaurant, setRestaurant] = useState<Restaurant>({
    id: "",
    restaurantName: "",
    address: "",
    mobilenumber: 0,
    ratings: 0,
    description: "",
    images: [],
    latitude: "",
    longitude: "",
  });

  const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", presetKey);
      data.append("cloud_name", cloudName);
      data.append("folder", "Products");

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
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const imageUrl = await uploadImageToCloudinary(file);
      if (imageUrl) {
        const newImages = [...restaurant.images];
        newImages[index] = imageUrl;
        setRestaurant((prevState) => ({
          ...prevState,
          images: newImages,
        }));
        setRestaurantImages(newImages);
        setPreviewImage(imageUrl);
        e.target.disabled = true;
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRestaurant((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const isFieldEmpty = (value: string | number) => {
    return value === "" || value === null || value === undefined;
  };

  const validateFields = (): Partial<Restaurant> => {
    const newErrors: Partial<Restaurant> = {};

    if (isFieldEmpty(restaurant.restaurantName))
      newErrors.restaurantName = "Restaurant Name is required";
    if (isFieldEmpty(restaurant.address))
      newErrors.address = "Address is required";
    if (isFieldEmpty(restaurant.latitude))
      newErrors.latitude = "Latitude is required";
    if (isFieldEmpty(restaurant.longitude))
      newErrors.longitude = "Longitude is required";
    if (isFieldEmpty(restaurant.mobilenumber))
      newErrors.mobilenumber = "Mobile Number is required";
    if (isFieldEmpty(restaurant.ratings))
      newErrors.ratings = "Ratings is required";
    if (isFieldEmpty(restaurant.description))
      newErrors.description = "Description is required";

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const newRestaurant: Restaurant = {
      ...restaurant,
      id: uuidv4(),
    };

    try {
      const restaurantRef = ref(db, `restaurants/${newRestaurant.id}`);
      await set(restaurantRef, newRestaurant);

      toast.success("Restaurant Added");
      navigate(`/restaurants`);
      setRestaurant({
        id: "",
        restaurantName: "",
        address: "",
        mobilenumber: 0,
        ratings: 0,
        description: "",
        images: [],
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      console.error("Error adding restaurant:", error);
      toast.error("Error adding restaurant");
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateFields();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const updatedRestaurant = { ...restaurant };

    try {
      const restaurantRef = ref(db, `restaurants/${updateId}`);
      await update(restaurantRef, updatedRestaurant);

      toast.success("Restaurant updated successfully");
      navigate(`/restaurants`);
    } catch (error) {
      console.error("Error updating restaurant:", error);
      toast.error("Error updating restaurant");
    }
  };

  useEffect(() => {
    if (updateId) {
      fetchRestaurantData(updateId);
    }
  }, [updateId]);

  const fetchRestaurantData = async (id: string) => {
    const restaurantRef = ref(db, `restaurants/${id}`);
    onValue(restaurantRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRestaurant(data);
        setRestaurantImages(data.images || []);
        if (data.images && data.images.length > 0) {
          setPreviewImage(data.images[0]);
        }
      }
    });
  };

  return (
    <div>
      <Container>
        <div className="flex flex-wrap lg:flex-nowrap xl:flex-nowrap flex-row px-10">
          {/* Upload Restaurant Image */}
          <div className="flex   flex-wrap-reverse sm:flex-wrap-reverse md:flex-nowrap lg:flex-nowrap xl:flex-nowrap mt-4 ">
            <div className="flex  flex-wrap">
              <div
                className="flex -order-1 justify-center flex-wrap sm:flex-row md:flex-col xl:flex-row w-auto flex-row mb-10 font-semibold"
                style={{ fontFamily: "Bai Jamjuree" }}
              >
                {[0].map((index) => (
                  <div
                    key={index}
                    className={`border-dotted rounded-[15px] border-4 h-[120px] m-6 flex-col gap-2 text-md w-[150px] flex justify-center items-center ${restaurantImages[index]
                      ? "border-[#DF201F]"
                      : "border-[#161A1D]"
                      }`}
                  >
                    {restaurantImages[index] ? (
                      <div
                        className="relative h-full w-full flex justify-center items-center rounded-[15px] overflow-hidden cursor-pointer"
                        onClick={() => setPreviewImage(restaurantImages[index])}
                      >
                        <img
                          src={restaurantImages[index]}
                          alt={`Preview ${index}`}
                          className="h-auto w-auto object-cover "
                        />
                        <button
                          type="button"
                          className={`text-white p-[2px] bg-[#DF201F]  rounded-2xl absolute   top-[2px] left-[110px] `}
                          onClick={(e) => {
                            e.stopPropagation();
                            // onCloseDelete(restaurantImages[index], index)
                          }}
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
                    ) : (
                      <>
                        <div className="relative bg-[#DF201F] h-12 w-12 flex justify-center rounded-full">
                          <label className="flex">
                            <span className="flex self-center cursor-pointer">
                              <i
                                className="fa-solid fa-plus fa-2xl"
                                style={{ color: "#e8eaed" }}
                              ></i>
                            </span>
                            <input
                              type="file"
                              onChange={(e) => handleImageUpload(e, index)}
                              style={{ display: "none" }}
                            />
                          </label>
                        </div>
                        <p>Upload New</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {/* Preview Image */}
            <div
              className="flex items-center w-full order-1"
              style={{ fontFamily: "Bai Jamjuree" }}
            >
              <div
                className="flex justify-center  font-semibold flex-col text-md items-center m-4 h-[420px] w-[480px]"
                style={{ boxShadow: "2px 2px 20px 2px #FFE9D066" }}
              >
                <div className="border-dotted bg-[#F5F5F5] rounded-[15px] border-4 h-[380px] flex-col gap-2 text-md w-full flex justify-center items-center border-[border: 2px solid #161A1D]">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-[250px] w-full object-cover"
                    />
                  ) : (
                    <p>No image uploaded</p>
                  )}
                  <p className="text-[#A4A1A1] text-[16px] font-semibold">
                    Supported files PNG, JPEG, SVG, WEBP
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="w-full flex flex-row flex-wrap items-center">
            <div className="flex   w-full ">
              <form
                className="w-full flex flex-wrap  justify-center font-semibold"
                style={{ fontFamily: "Montserrat Alternates" }}
              >
                <div className="flex flex-wrap  mb-6 w-full">
                  <div className="w-full px-3 mb-6">
                    <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Restaurant Name
                    </label>
                    <input
                      className="appearance-none w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8]  py-3 px-4 leading-tight hover:outline-none hover:border-[#9ad219] focus:outline-[#99c928] rounded-md bg-white"
                      type="text"
                      placeholder="Restaurant Name"
                      name="restaurantName"
                      value={restaurant?.restaurantName}
                      onChange={handleChange}
                    />
                    {errors.restaurantName && (
                      <span
                        className={`text-red-600 text-sm ${restaurant?.restaurantName ? "" : "hidden"
                          }}`}
                      >
                        {errors.restaurantName}
                      </span>
                    )}
                  </div>
                  <div className="w-full  md:w-full px-3 mb-6">
                    <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Address
                    </label>
                    <input
                      className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                      type="text"
                      placeholder="Address"
                      name="address"
                      value={restaurant?.address}
                      onChange={handleChange}
                    />
                    {errors.address && (
                      <span
                        className={`text-red-600 text-sm ${restaurant?.address ? "" : "hidden"
                          }}`}
                      >
                        {errors.address}
                      </span>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6">
                    <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Latitude
                    </label>
                    <input
                      className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      placeholder="Latitude"
                      name="latitude"
                      value={restaurant?.latitude}
                      onChange={handleChange}
                    />
                    {errors.latitude && (
                      <span
                        className={`text-red-600 text-sm ${restaurant?.latitude ? "" : "hidden"
                          }}`}
                      >
                        {errors.latitude}
                      </span>
                    )}
                  </div>
                  <div className="w-full md:w-1/2 px-3 mb-6">
                    <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Longitude
                    </label>
                    <input
                      className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      placeholder="Longitude"
                      name="longitude"
                      value={restaurant?.longitude}
                      onChange={handleChange}
                    />
                    {errors.longitude && (
                      <span
                        className={`text-red-600 text-sm ${restaurant?.longitude ? "" : "hidden"
                          }}`}
                      >
                        {errors.longitude}
                      </span>
                    )}
                  </div>
                  <div className="w-full md:w-full px-3 mb-6">
                    <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Mobile Number
                    </label>
                    <input
                      className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      type="number"
                      placeholder="Mobile Number"
                      name="mobilenumber"
                      maxLength={10}
                      value={restaurant?.mobilenumber}
                      onChange={handleChange}
                    />
                    {errors.mobilenumber && (
                      <span
                        className={`text-red-600 text-sm ${restaurant?.mobilenumber ? "" : "hidden"
                          }}`}
                      >
                        {errors.mobilenumber}
                      </span>
                    )}
                  </div>
                  <div className=" w-1/2 sm:w-1/2 md:w-1/2 px-3 mb-6 flex flex-col gap-2">
                    <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Ratings
                    </label>
                    {/* <input
                                        className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                                        type="number"
                                        placeholder="Ratings"
                                        name="ratings"
                                        value={restaurant?.ratings}
                                        onChange={handleChange}
                                    /> */}
                    <div className="flex items-center justify-start">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <React.Fragment key={rating}>
                          <input
                            type="radio"
                            name="ratings"
                            value={rating}
                            checked={Number(restaurant?.ratings) === rating}
                            onChange={handleChange}
                            className="hidden"
                            id={`star${rating}`}
                          />
                          <label htmlFor={`star${rating}`}>
                            <svg
                              className={`h-8 w-8 cursor-pointer ${Number(restaurant?.ratings) >= rating
                                ? "text-yellow-400"
                                : "text-gray-400"
                                }`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </label>
                        </React.Fragment>
                      ))}
                    </div>
                    {errors.ratings && (
                      <span
                        className={`text-red-600 text-sm ${restaurant?.ratings ? "" : "hidden"
                          }}`}
                      >
                        {errors.ratings}
                      </span>
                    )}
                  </div>

                  <div className="w-full px-3 mb-6">
                    <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                      Description
                    </label>
                    <textarea
                      className="appearance-none block w-full text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white resize-none"
                      placeholder="Type Here..."
                      rows={5}
                      name="description"
                      value={restaurant?.description}
                      onChange={handleChange}
                    />
                    {errors.description && (
                      <span
                        className={`text-red-600 text-sm ${restaurant?.description ? "" : "hidden"
                          }}`}
                      >
                        {errors.description}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex w-full">
                  <button
                    className="rounded-[60px] text-md ml-5 text-[#FFFFFF] bg-[#DF201F] h-[50px] w-full"
                    style={{
                      boxShadow: "2px 2px 20px 2px #DF201F66",
                      fontFamily: "Bai Jamjuree",
                    }}
                    onClick={handleSubmit}
                  >
                    Add Restaurant
                  </button>
                  <button
                    className="rounded-[60px] text-md ml-5 text-[#FFFFFF] bg-[#DF201F] h-[50px] w-full"
                    style={{
                      boxShadow: "2px 2px 20px 2px #DF201F66",
                      fontFamily: "Bai Jamjuree",
                    }}
                    onClick={handleUpdate}
                  >
                    Update Restaurant
                  </button>
                  <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    pauseOnFocusLoss={false}
                    limit={1}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AddRestaurants;
