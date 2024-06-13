import DashboardHeader from "../Dashboard/Menu";
import EmployeImg from "../../assets/OurTeam/Ellipse 7.png";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamAdd, { Team } from "./TeamAdd";

function OurTeam() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  // @ts-ignore
  const { updateId } = useParams();
  const [member, setMember] = useState<Team[]>([]);
  const apiUrl = "https://static-food-delivery-backend.vercel.app/team";

  const handleUpdateMember = (id: any) => {
    navigate(`/teamAdd/${id}`);
  };

  const handleDeleteMember = async (id: any) => {
    try {
      const response = await fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchMembers();
      } else {
        console.error("Failed to delete Member:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting Member:", error);
    }
    navigate(`/team`);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch(`${apiUrl}`);
      if (response.ok) {
        const data = await response.json();
        setMember(data);
      }
    } catch (error) {
      console.error("Error fetching Member:", error);
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div>
      <DashboardHeader />

      <div className="mt-14">
        <div className="flex flex-wrap gap-16 mt-6 justify-center">
          {member.map((item) => (
            <div
              className="relative sm:w-1/5 flex py-10 justify-center w-full h-[350px] "
              key={item.id}
            >
              <div className="w-full flex justify-center ">
                <div className="absolute -top-10 ">
                  <img
                    src={item.images[0] || EmployeImg}
                    alt="No Image Found"
                    className=" h-40 w-40"
                  />
                  <div
                    className="flex flex-col font-semibold"
                    style={{ fontFamily: "Bai Jamjuree" }}
                  >
                    <span className="text-xl">{item.name}</span>
                    <span className="text-[18px] text-[#DF201F]">
                      {item.position}
                    </span>
                  </div>
                </div>
                <div
                  className="h-[70%] w-full border-2 rounded-t-lg "
                  style={{ boxShadow: "1.49px 1.49px 22.33px 1.49px #FFF3E5" }}
                ></div>
                <div className="absolute  flex justify-center w-full gap-2  bottom-[98px]">
                  <div
                    className="bg-[#DF201F]  h-12 w-12 flex justify-center rounded-3xl "
                    onClick={() => handleDeleteMember(item.id)}
                  >
                    <button className="">
                      <i
                        className="fa-solid fa-trash fa-lg"
                        style={{ color: "#d4d9de" }}
                      ></i>
                    </button>
                  </div>
                  <div
                    className="bg-[#94CD00]  h-12 w-12 flex justify-center rounded-3xl"
                    onClick={() => handleUpdateMember(item.id)}
                  >
                    <button className="">
                      <i
                        className="fa-solid fa-pen fa-lg"
                        style={{ color: "#d4d9de" }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" sm:w-1/5 w-full mb-10 ">
          <div
            className="flex justify-center font-semibold flex-col text-md items-center  h-[200px] w-full "
            style={{ boxShadow: " 2px 2px 20px 2px #FFE9D066" }}
          >
            <div className="border-dotted rounded-[15px] border-4 h-[160px] flex-col gap-2 text-md w-[220px] flex justify-center items-center border-[border: 2px solid #161A1D]">
              <div className="relative   bg-[#DF201F] h-12  w-12 flex justify-center  rounded-full">
                <button
                  className="flex self-center"
                  onClick={openDialog}
                >
                  <i
                    className="fa-duotone fa-plus fa-2xl "
                    style={{ color: "#e8eaed" }}
                  ></i>
                </button>
              </div>
              <p className="">Add New</p>
            </div>
          </div>
        </div>

        {isDialogOpen && (
          <TeamAdd isOpen={isDialogOpen} onClose={closeDialog} />
        )}
      </div>
    </div>
  );
}

export default OurTeam;