import { BurgerGallary, Link, Manchurian, NewsImage1, Noodles, Pasta, Pizzza } from "@/assets"
import { Button, ImagePreview } from "@/Components"
import { t } from "i18next"
import { useState } from "react"

function Photos() {
    const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const images = [BurgerGallary, Pasta, Manchurian, NewsImage1, Noodles, Pizzza];  // Array of images

    const openDialog = (index: any) => {
        setCurrentImageIndex(index);
        setIsImageDialogOpen(true);
    };
    const closeDialog = () => setIsImageDialogOpen(false);

    const showPrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : images.length - 1));
    };

    const showNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex < images.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <div>
            <div className="flex flex-col ">
                <div className="flex flex-col gap-6 p-6 justify-start font-montserrat">
                    <span className="self-start text-2xl font-semibold">Sargam Food Photos</span>
                    <div className="flex justify-start flex-col">
                        <div className="flex gap-4">
                            <div className="flex font-semibold justify-start gap-4 items-center">
                                <span className=" bg-white text-black  border-2 hover:bg-[#EF4F5F] hover:text-white cursor-pointer h-10 w-auto p-2 flex items-center justify-center rounded-md">{t("photos.all")}</span>

                                <span className=" bg-white hover:bg-[#EF4F5F]  hover:text-white gap-2 text-black border-2 cursor-pointer h-10 w-auto p-2 flex items-center justify-center rounded-md">{t("photos.food")} <span className=""> (10)</span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap ">
                    {images.map((img, index) => (
                        <div key={index} className="relative sm:w-1/4 p-4 flex items-center h-full w-full">
                            <div className="">
                                <img
                                    src={img}
                                    alt={`Image ${index + 1}`}
                                    className="w-[300px]   h-[260px] object-cover rounded-lg"
                                />
                            </div>
                            <div className="absolute   inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <Button className="bg-[#DF201F] rounded-full h-14 w-14 " onClick={() => openDialog(index)}>
                                    <img src={Link} className="p-2 size-14" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {isImageDialogOpen && (
                <ImagePreview
                    isOpen={isImageDialogOpen}
                    onClose={closeDialog}
                    images={images}
                    currentImageIndex={currentImageIndex}
                    onPrevImage={showPrevImage}
                    onNextImage={showNextImage}
                />
            )}
        </div >
    )
}

export default Photos;
