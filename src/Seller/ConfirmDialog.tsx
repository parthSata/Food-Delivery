import { ToastContainer } from 'react-toastify'
import { Conformation } from '../Components/Config/images'
import Strings from '../Components/Config/Strings';
import { useLanguageContext } from '../Components/LanguageContext';

interface AddProps {
    onClose: () => void;
    isOpen: boolean;
}

const ConfirmDialog: React.FC<AddProps> = ({ onClose, isOpen }) => {
    if (!isOpen) return null;
    const { t } = useLanguageContext();



    return (
        <div className="fixed  inset-0 flex  items-center justify-center bg-black bg-opacity-70">
            <div className="bg-white w-[600px]  h-[300px] justify-center items-center gap-8 flex flex-col rounded-[30px] mx-4 p-3 shadow-lg  relative">
                {/* sm:w-[500px] sm:h-auto md:w-[500px] md:h-[] lg:w-[] lg:h-[]  xl:w-[500px] xl:h-[560px] */}
                <div className="bg-[#DF201F] flex  justify-center items-center rounded-full h-20 w-20 border-2">
                    <div className="">
                        <img src={Conformation} alt="" className="h-10 w-10" />
                    </div>
                </div>
                <div className="font-semibold text-lg" style={{ fontFamily: "Bai Jamjuree" }}>
                    <span className="">
                        Congratulations! You have completed the Registration Details and it will be verified by admin
                    </span>
                </div>
                <div className="flex justify-center">
                    <button
                        type="submit"
                        style={{ fontFamily: "Bai Jamjuree" }}
                        className={`bg-[#94CD00] uppercase shadow-registerBtn h-[50px] w-[247px] rounded-3xl text-white text-[18px] md:text-[22px] mt-5s`}
                        onClick={onClose}
                    >
                        {t(Strings.checkOut.continueButton)}
                    </button>
                    <ToastContainer position="top-right" autoClose={1000} pauseOnFocusLoss={false} limit={1} />
                </div>
            </div>
        </div>
    )
}

export default ConfirmDialog