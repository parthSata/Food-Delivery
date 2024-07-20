import { Restaurant as RestaurantInterface } from "./AddRestaurants";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "@/config/Firebase/firebase";
import { ref, onValue, remove } from "firebase/database";
import Loader from "../ReusableComponent/Loader";

import Button from "../ReusableComponent/Button";
import { useLanguageContext } from "../LanguageContext";
import { Noodles, Star, DummyImg } from "@/assets";
import { Container } from "@/Components";

function Restaurant() {
  const { t } = useLanguageContext();
  const navigate = useNavigate();
  const [restarants, setRestarants] = useState<RestaurantInterface[]>([]);
  const [restarantList, setRestarantList] = useState<RestaurantInterface>({
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
  const [isLoading, setisLoading] = useState(false);

  const handleAddRestaurant = (id: any) => {
    navigate(`/addrestaurants/${id}`);
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    setisLoading(true);

    const restaurantRef = ref(db, "restaurants");
    onValue(
      restaurantRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const restaurantArray: any = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setRestarants(restaurantArray);
          setRestarantList(restaurantArray);
        }
      },
      (error) => {
        console.error("Error fetching restaurants:", error);
      }
    );
    setisLoading(false);
  };

  const handleUpdateRestaurant = (id: any) => {
    navigate(`/addrestaurants/${id}`);
  };

  const handleDeleteRestaurant = async (id: string) => {
    setisLoading(true);

    const restaurantRef = ref(db, `restaurants/${id}`);
    try {
      await remove(restaurantRef);
      // Update state after successful deletion
      fetchRestaurants();
      navigate(`/restaurants`);
    } catch (error) {
      console.error("Error deleting restaurant:", error);
    }
    setisLoading(false);
  };

  return (
    <div>
      <Container>
        <Loader isLoading={isLoading}>
          <div className="relative mt-4 bg-black opacity-90 w-full">
            <img src={DummyImg} alt="" className=" h-[205px] w-full  " />
            <div className=" flex justify-start pl-16 ">
              <span
                className="absolute bottom-20 text-white text-2xl"
                style={{ fontFamily: "Bai Jamjuree" }}
              >
                {t("restaurant.pageTitle")}
              </span>
            </div>
          </div>

          {/* Restaurants */}
          <div className="">
            <div className="mt-6 w-full  flex gap-2 justify-around flex-wrap  ">
              {restarants.map((item) => (
                <div
                  className="sm:w-1/4 mb-10 font-semibold shadow-3xl"
                  key={item.id}
                  style={{
                    fontFamily: "Bai Jamjuree",
                  }}
                >
                  <img
                    src={item.images[0] || Noodles}
                    alt=""
                    className="h-[190px] w-full max-w-[340px] rounded-2xl"
                  />
                  <div className="flex flex-col gap-1  p-3">
                    <span className="self-start">{item.restaurantName}</span>
                    <span className="flex flex-row flex-wrap justify-between">
                      <div className="flex gap-2">
                        <img src={Star} alt="" className="h-6" />
                        <span className="text-lg">{item.ratings}</span>
                      </div>
                      <Button className="border border-[#DF201F] rounded-lg text-[#DF201F] p-1.5">
                        <i className="fa-solid fa-location-dot  fa-lg text-direction"></i>{" "}
                        {t("restaurant.directionsButton")}
                      </Button>
                    </span>
                    <span
                      className="text-justify text-[#38393b] "
                      style={{ fontFamily: "Montserrat Alternates" }}
                    >
                      {t("restaurant.address")}
                    </span>
                    <span
                      className="text-justify text-[#A2A3A5] "
                      style={{ fontFamily: "Montserrat Alternates" }}
                    >
                      {item.address}
                    </span>
                  </div>
                  <div className="relative flex justify-center w-full gap-2  top-6">
                    <div
                      className="bg-[#DF201F]  h-12 w-12 flex justify-center rounded-3xl"
                      onClick={() => handleDeleteRestaurant(item.id)}
                    >
                      <Button className="">
                        <i className="fa-solid fa-trash fa-lg text-productBtn"></i>
                      </Button>
                    </div>
                    <div className="bg-[#94CD00]  h-12 w-12 flex justify-center rounded-3xl">
                      <Button className="">
                        <i
                          className="fa-solid fa-pen fa-lg text-productBtn"
                          onClick={() => handleUpdateRestaurant(item.id)}
                        ></i>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}

              <div className=" sm:w-1/4  mb-10 w-full">
                <div className="flex justify-center w-full font-semibold flex-col text-md items-center  h-[200px] shadow-addNew">
                  <div className="border-dotted rounded-[15px] border-4 h-[160px] flex-col gap-2 text-md w-[280px] flex justify-center items-center border-[border: 2px solid #161A1D]">
                    <div className="relative   bg-[#DF201F] h-12  w-12 flex justify-center  rounded-full">
                      <Button
                        className="flex self-center"
                        onClick={() => handleAddRestaurant(restarantList.id)}
                      >
                        <i className="fa-duotone fa-plus fa-2xl text-addNew"></i>
                      </Button>
                    </div>
                    <p className="">{t("category.addNewButton")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Loader>
      </Container>
    </div>
  );
}

export default Restaurant;
