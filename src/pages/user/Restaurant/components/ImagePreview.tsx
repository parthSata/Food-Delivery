import { Logo } from "@/assets";

interface AddProps {
    onClose: () => void;
    isOpen: boolean;
    images: string[];  // Add a prop to pass the array of images
    currentImageIndex: number;  // Add a prop to track the current image index
    onPrevImage: () => void;  // Add a prop to navigate to the previous image
    onNextImage: () => void;  // Add a prop to navigate to the next image
}

const ImagePreview: React.FC<AddProps> = ({ onClose, isOpen, images, currentImageIndex, onPrevImage, onNextImage }) => {
    if (!isOpen) return null;

    const totalImages = images.length;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
            <button
                className="absolute top-4 right-4 text-white bg-red-500 rounded-full w-10 h-10 flex items-center justify-center"
                onClick={onClose}
            >
                <svg
                    className="h-6 w-6"
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

            <button
                className="absolute left-24 top-1/2 transform -translate-y-1/2 text-white b  bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
                onClick={onPrevImage}
            >
                <svg
                    className="h-16 w-16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div className="flex relative flex-col  ">
                <div className="absolute -top-20  text-white text-xs font-bold py-1 px-3 rounded">
                    <div className="flex items-center flex-row">
                        <img src={Logo} className="ml-2 mr-2 h-10 w-10" alt="" />
                        <span className="text-xl sm:text-2xl md:text-lg font-bold">
                            Food Delivery
                        </span>
                    </div>
                </div>
                <div className="relative">
                    <img
                        src={images[currentImageIndex]}
                        alt="Preview"
                        className="max-w-full max-h-full object-contain"
                    />


                    <div className="absolute bottom-4 right-4 text-white text-sm bg-black bg-opacity-50 py-1 px-3 rounded">
                        {currentImageIndex + 1} of {totalImages}
                    </div>
                </div>
            </div>
            <button
                className="absolute right-24 top-1/2 transform -translate-y-1/2 text-white  bg-opacity-50 rounded-full p-2 hover:bg-opacity-80"
                onClick={onNextImage}
            >
                <svg
                    className="h-16 w-16"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
}

export default ImagePreview;
