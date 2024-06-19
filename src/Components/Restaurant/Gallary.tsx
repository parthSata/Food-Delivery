import GallaryHeader from "./GallaryHeader";
import Burger from "../../assets/Restaurant/Rectangle 79.png";
import Link from "../../assets/Restaurant/Link.png";
import GallaryModelAdd from "./GallaryModelAdd";
import { Gallary as GallaryInterface } from "./GallaryModelAdd";
import React, { useEffect, useState } from "react";
import { ref, get } from 'firebase/database';
import { db } from '../../Firebase/firebase';
import Container from "../Container";

const Gallary: React.FC<GallaryInterface> = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [gallaryImage, setGallaryImage] = useState<GallaryInterface[]>([]);

  useEffect(() => {
    fetchGallaryImages();
  }, []);

  const fetchGallaryImages = async () => {
    try {
      const gallaryRef = ref(db, 'gallary');
      const snapshot = await get(gallaryRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const gallaryArray = data ? Object.keys(data).map(key => ({
          id: key,
          ...data[key],
        })) : [];
        setGallaryImage(gallaryArray);
      } else {
        console.error("No gallary images available");
      }
    } catch (error) {
      console.error("Error fetching gallary images:", error);
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  return (
    <>
      <Container >
        <div className="">
          <GallaryHeader />
          <div className="bg-[#D9D9D9] flex flex-row flex-wrap h-full w-full ">
            {gallaryImage.map((item) => (
              <div className="relative sm:w-1/4 p-4 h-full w-full" key={item.id}>
                <div className="">
                  <img
                    src={item.images[0] || Burger}
                    alt="Sandwich and fries"
                    className="w-[300px]   h-[260px] object-cover rounded-lg"
                  />
                </div>
                <div className="absolute   inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-[#DF201F] rounded-full h-14 w-14 ">
                    <img src={Link} className="p-2 size-14" />
                  </button>
                </div>
              </div>
            ))}
            <div className=" sm:w-1/4 p-4 h-[290px] w-full ">
              <div
                className="flex justify-center bg-[#FFFFFF] rounded-[15px] w-full font-semibold flex-col text-md items-center  h-[260px] "
                style={{ boxShadow: " 2px 2px 20px 2px #FFE9D066" }}
              >
                <div className="border-dotted rounded-[15px] border-4 h-[240px] flex-col gap-2 text-md w-[240px] flex justify-center items-center border-[border: 2px solid #161A1D]">
                  <div className="relative   bg-[#DF201F] h-12  w-12 flex justify-center  rounded-full">
                    <button className="flex self-center">
                      <i
                        className="fa-duotone fa-plus fa-2xl "
                        style={{ color: "#e8eaed" }}
                        onClick={openDialog}
                      ></i>
                    </button>
                  </div>
                  <p className="">Add New</p>
                </div>
              </div>
            </div>

            {isDialogOpen && (
              <GallaryModelAdd isOpen={isDialogOpen} onClose={closeDialog} />
            )}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Gallary;
