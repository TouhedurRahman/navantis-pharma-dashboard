import { useParams } from "react-router-dom";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useCareers from "../../../Hooks/useCareers";

const SingleCircular = () => {
    const [careers] = useCareers();
    const { id } = useParams();
    const career = careers.find(career => career._id == id);

    return (
        <>
            <div>
                <PageTitle
                    from={"Careers"}
                    to={"Single job circular"}
                />
            </div>
            <div className="bg-white pb-3">
                <div>
                    <div className="flex justify-between items-center px-6">
                        <div>
                            <h1 className="pt-3 font-bold text-2xl">{career.designation}</h1>
                            <h2 className="pb-3 text-gray-600">{career.department}</h2>
                        </div>
                        <div className="flex justify-center items-center space-x-2 text-xl">
                            <button className="p-2 rounded-[5px] hover:bg-orange-100 focus:outline-none">
                                <FaEdit className="text-orange-500" />
                            </button>
                            <button className="p-2 rounded-[5px] hover:bg-red-100 focus:outline-none">
                                <FaTrashAlt className="text-red-500" />
                            </button>
                        </div>
                    </div>
                    <hr className='text-center border border-gray-500 mb-5' />
                </div>
                <div className="px-6 flex justify-between items-start">
                    <div className="flex flex-col justify-start items-start">
                        <div className="overflow-x-auto w-full">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="text-center">Location</th>
                                        <th className="text-center">Vacancy</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center">{career.location}</td>
                                        <td className="text-center">{career.vacancy}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-10 w-full">
                            <h2 className="pb-1 text-gray-600 font-bold">Outline</h2>
                            <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                            <h2 className="text-gray-600 text-justify">{career.outline}</h2>
                        </div>
                        <div className="mt-10 w-full">
                            <h2 className="pb-1 text-gray-600 font-bold">Responsibilities</h2>
                            <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                            <h2 className="text-gray-600 text-justify">{career.responsibilities}</h2>
                        </div>
                        <div className="mt-10 w-full">
                            <h2 className="pb-1 text-gray-600 font-bold">Requirements</h2>
                            <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                            <h2 className="text-gray-600 text-justify">{career.requirements}</h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleCircular;