import { Dummy, DummyImg, StraightQuotes, StraightQuotes2, TestimonialBg, Vector } from "../../Config/images"

function Testimonials() {
    return (
        <div className="">
            <div className="h-full flex w-full justify-center items-center  flex-col  relative bg-black opacity-90">
                <img src={Vector} alt="" className="top-0 outline-none absolute" />
                <img src={TestimonialBg} alt="" className="" />
                <span className="absolute self-center text-xl font-semibold text-white" style={{ fontFamily: "Bai Jamjuree" }}>Testi<span className="border-b-4 pb-3 rounded border-[#DF201F]">mo</span>nials</span>
                <div className="absolute flex justify-center items-center top-72 flex-w gap-6">
                    <div className="bg-[#DF201F] top-[300px]  p-6 font-semibold text-white flex flex-col gap-4 h-full w-[440px] rounded-[20px]" style={{ fontFamily: "Montserrat Alternates", boxShadow: "2px 2px 50px 2px #0000001A" }}>
                        <img src={StraightQuotes} alt="" className="absolute -top-5  left-5 h-14 w-12" />
                        <p className="text-sm mt-4 text-justify">It is a long established fact that a reader will be istracted by the readable content of a page when looking at its layout The point of using</p>
                        <div className=" flex justify-start items-center gap-2" style={{ fontFamily: "Bai Jamjuree" }}>
                            <img src={DummyImg} alt="" className="h-8 w-8" />
                            <span className="text-md" >Alice Bob</span>
                        </div>

                    </div>
                    <div className="bg-[#fff]  top-[300px]  p-6 font-semibold  flex flex-col gap-4 h-full w-[440px] rounded-[20px]" style={{ fontFamily: "Montserrat Alternates", boxShadow: "2px 2px 50px 2px #0000001A" }}>
                        <img src={StraightQuotes2} alt="" className="absolute  -top-5  left-[55%] h-14 w-14" />
                        <p className="text-sm text-justify mt-4 text-[#A2A3A5]">It is a long established fact that a reader will be istracted by the readable content of a page when looking at its layout The point of using</p>
                        <div className=" flex justify-start items-center gap-2" style={{ fontFamily: "Bai Jamjuree" }}>
                            <img src={Dummy} alt="" className="h-8 w-8" />
                            <span className="text-md" >Alice Bob</span>
                        </div>
                    </div>
                </div>
                <div className="mb-4 flex  -bottom-36 absolute  space-x-2 justify-center rtl:space-x-reverse">
                    <button type="button" className="w-3 h-3 border-2 border-[#94CD00] accent-[#DF201F]  rounded-full" aria-label="Slide 1" data-carousel-slide-to="0"></button>
                    <button type="button" className="w-3 h-3 border-2 border-[#94CD00]  rounded-full" aria-label="Slide 2" data-carousel-slide-to="1"></button>
                    <button type="button" className="w-3 h-3 border-2 border-[#94CD00]  rounded-full" aria-label="Slide 3" data-carousel-slide-to="2"></button>
                    <button type="button" className="w-3 h-3 border-2 border-[#94CD00]  rounded-full" aria-label="Slide 4" data-carousel-slide-to="3"></button>
                </div>
            </div>
        </div>
    )
}

export default Testimonials