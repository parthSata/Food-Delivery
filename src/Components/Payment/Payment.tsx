import React from 'react'

function Payment() {
    return (
        <div>
            <div className="flex flex-row justify-center items-center gap-20 h-full w-full flex-wrap-reverse md:flex-nowrap xl:flex-wrap">
                {/* Form */}
                <form style={{ fontFamily: "Montserrat Alternates" }} >
                    <div className="border-black flex flex-col justify-center items-center">
                        <div className="flex flex-col justify-center items-center ">
                            <p className="text-[30px] font-semibold" style={{ fontFamily: "Bai Jamjuree" }}>Payment Method </p>

                            <div className="flex mt-5  ">
                                <div className="flex items-center justify-center flex-col gap-6">

                                    <div className="flex mt-2 justify-between gap-1 item-center sm:justify-around font-semibold">
                                        <div className="flex flex-row gap-3 items-center border-2">
                                            <div className={`flex justify-center items-center rounded-full  h-10 w-10`}>
                                                <img src={"Person"} alt="" className="h-5" />
                                            </div>
                                            <label htmlFor="customer-role" className="flex items-center gap-3 cursor-pointer">
                                                Bank Account
                                            </label>
                                            <input
                                                type="radio"
                                                value="customer"
                                                className=""
                                                id="customer-role"
                                            />

                                        </div>

                                        <div className="flex items-center border-b">
                                            <input
                                                type="text"
                                                value={name}
                                                placeholder="Name"
                                                className="ml-2 p-6 text-[14px] focus:outline-none h-[50px] w-[320px] hover:border-0 font-semibold"
                                                style={{ fontFamily: "Montserrat Alternates" }}
                                            />
                                            <img src={Person} className="h-[24px] ml-2 w-[24px]" alt="" />
                                        </div>
                                    </div>



                                </div>
                            </div>
                        </div>
                    </div>
                </form>




                {/* Image */}

            </div>
        </div>
    )
}

export default Payment
