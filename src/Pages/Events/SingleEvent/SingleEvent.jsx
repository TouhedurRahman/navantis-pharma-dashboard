import { useParams } from "react-router-dom";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useEvents from "../../../Hooks/useEvents";

const SingleEvent = () => {
    const [events] = useEvents();
    const { id } = useParams();
    const event = events.find(event => event._id == id);

    return (
        <>
            <div>
                <PageTitle
                    from={"Events"}
                    to={"Single event"}
                />
            </div>
            <div className="bg-white pb-3">
                <div>
                    <div className="flex justify-between items-center px-6">
                        <div>
                            <h1 className="pt-3 font-bold text-2xl">{event.title}</h1>
                            <h2 className="pb-3 text-gray-600">{event.date}</h2>
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
                    <div className="w-full lg:w-[70%] flex flex-col justify-start items-start">
                        <div className="mt-10 w-full">
                            <h2 className="pb-1 text-gray-600 text-center font-bold">Description</h2>
                            <hr className='text-center w-[30%] mx-auto border border-gray-500 mb-1' />
                            <h2 className="text-gray-600 text-justify">{event.description}</h2>
                        </div>
                    </div>
                    <div className="w-full lg:w-[30%] flex flex-col justify-end items-center lg:items-end">
                        <div className="flex justify-center items-center">
                            <div className="avatar">
                                <div className="w-72 h-72 rounded">
                                    <img src={event.imageURL} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleEvent;