import { TestimonialBg, Vector } from "../Config/images"

function Testimonials() {
    return (
        <div>
            <div className="h-full flex w-full justify-center  relative bg-black opacity-90">
                <img src={Vector} alt="" className=" outline-none absolute" />
                <img src={TestimonialBg} alt="" className="" />
                <span className="absolute self-center text-xl font-semibold text-white" style={{ fontFamily: "Bai Jamjuree" }}>Testi<span className="border-b-4 pb-3 rounded border-[#DF201F]">mo</span>nials</span>
                <div className="flex absolute flex-row gap-4">
                    <div className="bg-[#DF201F] h-full w-[340px] rounded-[20px]">
                        <img src="" alt="" className="" />
                        <p className="">It is a long established fact that a reader will be istracted by the readable content of a page when looking at its layout The point of using</p>
                        <span className="">Name Here</span>

                    </div>
                    <div className="">
                        <img src="" alt="" className="" />
                        <p className="">

                        </p>
                        <span className="">Name Here</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials