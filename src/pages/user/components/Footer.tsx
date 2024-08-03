import { EmailImg, Facebook, Instagram, Location, Logo, PhoneImg, Youtube } from "@/assets"

function Footer() {
    return (
        <div className="w-full p-16 h-full flex flex-col gap-8 bg-[#161A1D] ">
            <div className="flex gap-16 flex-wrap md:flex-nowrap ">
                <div className="flex flex-col gap-6 ">
                    <div className="flex items-center gap-2 font-bold text-white text-[22px]">
                        <img src={Logo} alt="" className="h-16 w-14  " />
                        <span className="font-semibold font-kozuka">Food Delivery</span>
                    </div>
                    <div className="">
                        <p className="font-montserrat font-semibold pl-2 text-[#99959E] text-sm text-justify">
                            It is a long established fact that a reader will be istracted by the readable content content here making it look like readable.
                        </p>
                    </div>
                    <div className="flex  gap-4">
                        <span className="bg-[#222527]  h-10 w-10 flex items-center justify-center rounded-full">
                            <img src={Instagram} alt="" className="" />
                        </span>
                        <span className="bg-[#222527] h-10 w-10 flex items-center justify-center rounded-full">
                            <img src={Facebook} alt="" className="" />
                        </span>
                        <span className="bg-[#222527] h-10 w-10 flex items-center justify-center rounded-full">
                            <img src={Youtube} alt="" className="" />
                        </span>
                    </div>
                </div>
                <div className="flex flex-col gap-10 ">
                    <div className="self-start">
                        <span className="text-white font-baiJamjuree font-semibold text-xl">
                            <span className="border-b-4 pb-4  rounded border-[#DF201F] ">Con</span>tact Us
                        </span>
                    </div>
                    <div className="flex flex-col gap-2 font-semibold font-popins ">
                        <div className="flex gap-4">
                            <img src={PhoneImg} alt="" className="h-5 w-5 " />
                            <span className=" text-[#99959E] text-sm">7874784388</span>
                        </div>
                        <div className="flex gap-4">
                            <img src={EmailImg} alt="" className="h-5 w-5 " />
                            <span className=" text-[#99959E] text-wrap text-sm">fooddeliveryexample@gmail.com</span>
                        </div>
                        <div className="flex gap-4">
                            <img src={Location} alt="" className="h-5 w-5 " />
                            <span className=" text-justify  text-[#99959E] text-sm">3th Street. 47 W 13th St, New York, NYc 10011,
                                USA</span>
                        </div>
                    </div>
                </div>
                <div className="">
                    <span className="font-baiJamjuree font-semibold flex text-white text-md">Location</span>
                    <span className="  mt-4">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14751.288800621025!2d70.59453208402948!3d22.4357169734269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959db161a979c8b%3A0x428a8c265190c571!2sPaddhari%2C%20Gujarat%20360110!5e0!3m2!1sen!2sin!4v1722525328812!5m2!1sen!2sin" width="600" height="450" style={{ border: 0 }} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="rounded-[15px] h-[200px] w-full mt-2"></iframe>
                    </span>
                </div>
            </div>

            <div className="font-baiJamjuree  border-[#A2A3A5] font-semibold border-t text-white ">
                <span className="">© 2022  Food Delivery | All Rights Reserved </span>
            </div>

        </div>
    )
}

export default Footer
