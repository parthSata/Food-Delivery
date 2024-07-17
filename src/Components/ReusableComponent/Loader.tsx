import React from 'react'
// import { Loaders } from './Config/images'

const Loader = ({ isLoading, children }: { isLoading: boolean; children: React.ReactNode }) => {

    return (
        <div>
            <div className="">
                {isLoading ? (
                    <div className="flex-col mt-4 gap-4 w-full flex items-center justify-center">
                        <div className="w-20 h-20 border-8 text-[#DF201F] text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-[#DF201F] rounded-full">
                            
                        </div>
                    </div>
                ) : (
                    children
                )}
            </div>
        </div>
    )
}

export default Loader
