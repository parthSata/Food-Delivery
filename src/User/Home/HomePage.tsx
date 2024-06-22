import Container from "../../User/Components/Container"
import { AllFood, HomeImg, Left, Pizza, Right, texture } from "../Config/images"


function HomePage() {

    return (
        <Container>
            <div className='h-full w-full overflow-x-auto'>
                <div className="">
                    <div className="relative  bg-opacity-85 mt-0">
                        <img src={HomeImg} alt="" className="h-[400px] w-full" />
                        <div className="absolute  font-semibold w-full   flex-col justify-center top-28" style={{ fontFamily: "Bai Jamjuree" }}>
                            <div className="flex flex-col gap-2">
                                <span className="text-[red] text-xl font-normal" style={{ fontFamily: "Fall in love" }}>Welcome to our food shop</span>
                                <span className="text-white text-5xl font-bold">we have best delicious food</span>
                                <p className="text-[#FFFFFF] text-sm font-semibold" style={{ fontFamily: "Montserrat Alternates" }}>It is a long established fact that a reader will be distracted</p>
                                <button className="w-[120px] text-white rounded-full self-center bg-[#94CD00] h-[50px]">Login Now</button>
                            </div>
                        </div>
                        <div className="relative bg-[#DF201F] h-[210px] flex justify-center items-center " style={{ fontFamily: "Bai Jamjuree" }}>
                            <img src={texture} alt="" className="h-full w-full" />
                            <div className=" absolute  flex-col flex -top-24" >
                                <img src={AllFood} alt="" className="h-[240px] w-full " />
                                <div className="flex justify-between items-center text-white text-2xl font-semibold">
                                    <img src={Left} className="h-12 w-12 " />
                                    <span className="">Best Categoty</span>
                                    <img src={Right} className="h-12 w-12" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-10">
                            <div className="flex flex-row justify-center gap-8">
                                <div className="flex flex-col justify-center">
                                    <img src={Pizza} alt="" className="self-center h-[100px] w-[100px] " />
                                    <span className="">Pizza</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <img src={Pizza} alt="" className="self-center h-[100px] w-[100px] " />
                                    <span className="">Pizza</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <img src={Pizza} alt="" className="self-center h-[100px] w-[100px] " />
                                    <span className="">Pizza</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <img src={Pizza} alt="" className="self-center h-[100px] w-[100px] " />
                                    <span className="">Pizza</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <img src={Pizza} alt="" className="self-center h-[100px] w-[100px] " />
                                    <span className="">Pizza</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <img src={Pizza} alt="" className="self-center h-[100px] w-[100px] " />
                                    <span className="">Pizza</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <img src={Pizza} alt="" className="self-center h-[100px] w-[100px] " />
                                    <span className="">Pizza</span>
                                </div>
                                <div className="flex flex-col justify-center">
                                    <img src={Pizza} alt="" className="self-center h-[100px] w-[100px] " />
                                    <span className="">Pizza</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default HomePage
