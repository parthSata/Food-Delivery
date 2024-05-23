import DashboardHeader from '../Dashboard/Menu';
// import ImagePng from '../../assets/Products/Image.png';
import { useState } from 'react';
import { Cloudinary } from 'cloudinary-core';

interface Product {
    name: string;
    price: number;
    discountPrice: number;
    weight: number;
    unit: string;
    packagingCharges: number;
    description: string;
    images: string[];
    categoryId: number,
}

function ProductAdd() {
    const presetKey = "ml_default";
    const cloudName = "dwxhjomtn";
    const apiUrl = "http://localhost:3000/products";

    const [product, setProduct] = useState<Product>({
        name: '',
        price: 0,
        discountPrice: 0,
        weight: 0,
        unit: '',
        packagingCharges: 0,
        description: '',
        images: [],
        categoryId: 1,
    });

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [productImages, setProductImages] = useState([]);

    const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
        try {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", presetKey);

            const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: data,
            });

            const imgData = await response.json();
            return imgData.url;
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
            return null;
        }
    };

    // const handleImageUpload = async(e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    //     if (!e.target.files) return;

    //     const file = e.target.files[0];
    //     if (file) {
    //         const imageUrl = await uploadImageToCloudinary(file);
    //         if (imageUrl) {
    //             const newImages = [...product.images];
    //             newImages[index] = imageUrl;
    //             setProduct((prevState) => ({
    //                 ...prevState,
    //                 images: newImages
    //             }));
    //             setPreviewImage(imageUrl);
    //             e.target.disabled = true; // Disable input after selecting an image
    //         }
    //     }
    // };
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (!e.target.files) return;

        const file = e.target.files[0];
        if (file) {
            const imageUrl = await uploadImageToCloudinary(file);
            if (imageUrl) {
                const newImages = [...product.images];
                newImages[index] = imageUrl;
                setProduct((prevState) => ({
                    ...prevState,
                    images: newImages
                }));
                setProductImages((prevImages) => {
                    const updatedImages = [...prevImages];
                    updatedImages[index] = imageUrl;
                    return updatedImages;
                });
                setPreviewImage(imageUrl);
                e.target.disabled = true; // Disable input after selecting an image
            }
        }
    };

    // const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    //     const files = e.target.files;
    //     if (files && files.length > 0) {
    //         const imageUrl = await uploadImageToCloudinary(files[0]);
    //         if (imageUrl) {
    //             const newImages = [...product.images];
    //             newImages[index] = imageUrl;
    //             setProduct((prevState) => ({
    //                 ...prevState,
    //                 images: newImages
    //             }));
    //             setPreviewImage(imageUrl);
    //             e.target.disabled = true; // Disable input after selecting an image
    //         }
    //     }
    // };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
            const result = await response.json();
            console.log('Product saved:', result);
            // Reset the form or handle successful submission
        } catch (error) {
            console.error('Error saving the product:', error);
        }
    };
    return (
        <>
            <div className="">
                <DashboardHeader />
                <div className="flex flex-wrap lg:flex-nowrap xl:flex-nowrap flex-row ">
                    {/* Upload Product Image */}
                    <div className="flex   flex-wrap-reverse sm:flex-wrap-reverse md:flex-nowrap lg:flex-nowrap xl:flex-nowrap mt-4 ">
                        <div className="flex  flex-wrap">
                            <div className="flex -order-1 justify-center flex-wrap sm:flex-row md:flex-col xl:flex-row w-auto flex-row mb-10 font-semibold" style={{ fontFamily: "Bai Jamjuree" }}>
                                {[0, 1, 2, 3].map((index) => (
                                    <div
                                        key={index}
                                        className={`border-dotted rounded-[15px] border-4 h-[120px] m-6 flex-col gap-2 text-md w-[150px] flex justify-center items-center ${productImages[index] ? 'border-[#DF201F]' : 'border-[#161A1D]'}`}
                                    >
                                        {productImages[index] ? (
                                            <div
                                                className="relative h-full w-full flex justify-center items-center rounded-[15px] overflow-hidden cursor-pointer"
                                                onClick={() => setPreviewImage(productImages[index])}
                                            >
                                                <img src={productImages[index]} alt={`Preview ${index}`} className="h-full w-full object-cover" />
                                            </div>
                                        ) : (
                                            <>
                                                <div className="relative bg-[#DF201F] h-12 w-12 flex justify-center rounded-full">
                                                    <label className='flex'>
                                                        <span className="flex self-center">
                                                            <i className="fa-duotone fa-plus fa-2xl" style={{ color: "#e8eaed" }}></i>
                                                        </span>
                                                        <input type="file" onChange={(e) => handleImageUpload(e, index)} style={{ display: 'none' }} />
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
                        <div className="flex items-center w-full order-1" style={{ fontFamily: "Bai Jamjuree" }}>
                            <div className="flex justify-center  font-semibold flex-col text-md items-center m-4 h-[420px] w-[480px]" style={{ boxShadow: "2px 2px 20px 2px #FFE9D066" }}>
                                <div className="border-dotted bg-[#F5F5F5] rounded-[15px] border-4 h-[380px] flex-col gap-2 text-md w-full flex justify-center items-center border-[border: 2px solid #161A1D]">
                                    {previewImage ? (
                                        <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <p>No image uploaded</p>
                                    )}
                                    <p className="text-[#A4A1A1] text-[16px] font-semibold">Supported files PNG, JPEG, SVG, WEBP</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="w-full flex flex-row flex-wrap items-center">
                        <div className="flex   w-full ">
                            <form className="w-full flex flex-wrap  justify-center font-semibold" style={{ fontFamily: "Montserrat Alternates" }}>
                                <div className="flex flex-wrap  mb-6 w-full">
                                    <div className="w-full px-3 mb-6">
                                        <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Name
                                        </label>
                                        <input
                                            className="appearance-none w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8]  py-3 px-4 leading-tight hover:outline-none hover:border-[#9ad219] focus:outline-[#99c928] rounded-md bg-white"
                                            type="text"
                                            placeholder="name"
                                            name="name"
                                            value={product.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="w-full  md:w-1/2 px-3 mb-6">
                                        <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Price
                                        </label>
                                        <input
                                            className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                                            type="number"
                                            placeholder="0"
                                            name="price"
                                            value={product.price}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="w-full md:w-1/2 px-3 mb-6">
                                        <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Discount Price
                                        </label>
                                        <input
                                            className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                                            type="number"
                                            placeholder="0"
                                            name="discountPrice"
                                            value={product.discountPrice}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className=" w-1/2 sm:w-1/2 md:w-1/2 px-3 mb-6">
                                        <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Weight
                                        </label>
                                        <input
                                            className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                                            type="number"
                                            placeholder="0"
                                            name="weight"
                                            value={product.weight}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="w-1/2 sm:w-1/2 md:w-1/2 px-3 mb-6">
                                        <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Unit
                                        </label>
                                        <input
                                            className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                                            type="text"
                                            placeholder="0"
                                            name="unit"
                                            value={product.unit}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="w-full   px-3 mb-6">
                                        <label className="flex justify-self-start uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                            Packaging Charges
                                        </label>
                                        <input
                                            className="appearance-none block w-full h-[60px] text-[#A2A3A5] border border-[2px solid #E8E8E8] rounded py-3 px-4 leading-tight hover:border-[#9ad219] focus:outline-[#99c928] bg-white"
                                            type="number"
                                            placeholder="0"
                                            name="packagingCharges"
                                            value={product.packagingCharges}
                                            onChange={handleChange}
                                        />
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
                                            value={product.description}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <button
                                    className="rounded-[60px] text-xl ml-5 text-[#FFFFFF] bg-[#DF201F] h-[70px] w-full"
                                    style={{
                                        boxShadow: "2px 2px 20px 2px #DF201F66",
                                        fontFamily: "Bai Jamjuree",
                                    }}
                                    onClick={handleSubmit}
                                >
                                    SAVE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductAdd;