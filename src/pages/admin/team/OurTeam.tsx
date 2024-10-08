import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeamAdd, { Team } from "./components/TeamAdd";
import Container from "@/Components/ReusableComponent/Container";
import { toast } from "react-toastify";
import { t } from "i18next";
import config from "@/config/Config";
import { EmplyoeImg } from "@/assets";
import { Button } from "@/Components/index";

function OurTeam() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  // @ts-ignore
  const { updateId } = useParams();
  const [member, setMember] = useState<Team[]>([]);

  const handleUpdateMember = (id: any) => {
    navigate(`/teamAdd/${id}`);
  };

  const handleDeleteMember = async (id: string) => {
    try {
      const response = await fetch(
        `${config.firebaseDatabaseUrl}/team/${id}.json`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        setMember((prevMembers) =>
          prevMembers.filter((member) => member.id !== id)
        );
        toast.success("Member deleted successfully");
      } else {
        console.error("Failed to delete Member:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting Member:", error);
    }
    navigate("/team");
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch(`${config.firebaseDatabaseUrl}/team.json`);
      if (response.ok) {
        const data = await response.json();
        if (data) {
          const membersArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));
          setMember(membersArray);
        }
      } else {
        console.error("Failed to fetch Members:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching Members:", error);
    }
  };

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <div>
      <Container>
        <div className="mt-14">
          <div className="flex flex-wrap gap-16 mt-6 justify-center">
            {member.map((item) => (
              <div
                className="relative sm:w-1/5  flex py-10 justify-center w-full h-[350px] "
                key={item.id}
              >
                <div className="w-full flex justify-center ">
                  <div className="absolute -top-10 ">
                    <img
                      src={item.images[0] || EmplyoeImg}
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
                  <div className="h-[70%] w-full border-2 rounded-t-lg shadow-div"></div>
                  <div className="absolute  flex justify-center w-full gap-2  bottom-[98px]">
                    <div
                      className="bg-[#DF201F]  h-12 w-12 flex justify-center rounded-3xl "
                      onClick={() => handleDeleteMember(item.id)}
                    >
                      <Button className="">
                        <i className="fa-solid fa-trash fa-lg text-productBtn"></i>
                      </Button>
                    </div>
                    <div
                      className="bg-[#94CD00]  h-12 w-12 flex justify-center rounded-3xl"
                      onClick={() => handleUpdateMember(item.id)}
                    >
                      <Button className="">
                        <i className="fa-solid fa-pen fa-lg text-productBtn"></i>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className=" sm:w-1/5 w-full mb-10 mt-8 h-[350px]">
              <div className="flex justify-center font-semibold flex-col text-md items-center  h-[200px] w-full shadow-addNew">
                <div className="border-dotted rounded-[15px] border-4 h-[180px] flex-col gap-2 text-md w-[200px] flex justify-center items-center border-[border: 2px solid #161A1D]">
                  <div className="relative   bg-[#DF201F] h-12  w-12 flex justify-center  rounded-full">
                    <Button className="flex self-center" onClick={openDialog}>
                      <i className="fa-duotone fa-plus fa-2xl text-addNew"></i>
                    </Button>
                  </div>
                  <p className="">{t("category.addNewButton")}</p>
                </div>
              </div>
            </div>
          </div>

          {isDialogOpen && (
            <TeamAdd isOpen={isDialogOpen} onClose={closeDialog} />
          )}
        </div>
      </Container>
    </div>
  );
}

export default OurTeam;
