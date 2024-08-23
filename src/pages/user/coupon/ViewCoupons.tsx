// import { Loader } from "@/Components";
import { t } from "i18next";
import { toast, ToastContainer } from "react-toastify";

toast



interface AddProps {
    onClose: () => void;
    isOpen: boolean;
}
const ViewCoupons: React.FC<AddProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    // const [isLoading, setisLoading] = useState(false);


    return (
        <div className="fixed  inset-0 flex  items-center justify-center bg-black bg-opacity-70 overflow-y-auto">
            {/* <Loader isLoading={isLoading}> */}
            <div className="bg-white w-[400px] h-[470px] sm:w-[450px] sm:h-auto md:w-[450px]  xl:w-[400px]  gap-2 rounded-[30px] shadow-lg p-4 relative">
                <button
                    className="absolute -top-8 right-[14px]  text-white bg-red-500 rounded-full w-10 h-6 flex items-center justify-center"
                    onClick={onClose}
                >
                    <svg
                        className="h-[26px] w-[26px] p-[4px]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <div className="grid grid-cols-2 flex flex-wrap gap-4 p-2 w-full max-h-96 overflow-y-auto">
                    {[0, 1, 2, 3].map((index) => (
                        <div className="shadow-dashboard rounded-[60px]  font-montserrat font-semibold" key={index}>
                            <div className="rounded-t-lg bg-[#DF201F] text-white text-center py-4 font-bold">
                                <span className="text-xl">50% Off</span>
                            </div>
                            <div className="bg-white p-4 rounded-b-[30px] ">
                                <div className="flex flex-wrap  justify-between items-center mb-2 text-xs">
                                    <span className="text-[#A2A3A5]">Offer Code</span>
                                    <span className="text-black">DFJGFHK</span>
                                </div>
                                <div className="flex flex-wrap justify-between items-center mb-2 text-xs">
                                    <span className="text-[#A2A3A5]">Expiry Date</span>
                                    <span className="text-black">04-05-23</span>
                                </div>
                                <div className="text-xs">
                                    <span className="text-[#A2A3A5] block mb-1">Description</span>
                                    <p className="text-black">Buy above ₹500 and get up to 50% off</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    type="submit"
                    className="w-full text-xl bg-[#DF201F]   shadow-couponAdd text-white p-2 rounded-[60px] "
                >
                    {t("couponview.applyBtn")}
                </button>

                <ToastContainer
                    position="top-right"
                    autoClose={1000}
                    pauseOnFocusLoss={false}
                    limit={1}
                />
            </div>
            {/* </Loader> */}
        </div>)
}

export default ViewCoupons