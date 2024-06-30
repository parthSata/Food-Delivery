
function RestaurantTypes() {
    return (
        <div className="h-full w-full">
            <div className="">
                <div className="">
                    <span className="" style={{fontFamily:""}}>Restaurant Type And Timings</span>
                    <div className="">
                        <div className="">
                            <span className="">Establishment Type</span>
                            <p className="">Select most relevant category for your restaurant type</p>
                        </div>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col">
                                    <div className="flex flex-row">
                                        <input type="radio" name="" id="" />
                                        <span className="">Both, delivery and dine-in available</span>
                                    </div>
                                    <p className="">Select this option when you have a place for customers to dine-in and also want to online for your restaurant</p>
                                </div>
                                <div className="flex flex-col ">
                                    <div className="flex flex-row">
                                        <input type="radio" name="" id="" />
                                        <span className="">Delivery Only</span>
                                    </div>
                                    <p className="">Select when you don’t have a facility for customers to dine-in (like delivery Kitchens)</p>
                                </div>
                            </div>

                            <div className="">
                                <span className="">Select options which are best for you outlet</span>
                                <div className="">
                                    <div className="">
                                        <div className="flex flex-row">
                                            <input type="checkbox" name="Bakery" id="" />
                                            <span className="">Bakery</span>
                                        </div>
                                    </div>
                                    <div className=""></div>
                                    <div className=""></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="">

            </div>

        </div>
    )
}

export default RestaurantTypes