import { useState } from "react";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import EventsCard from "../EventsCard/EventsCard";
import useEvents from "../../../Hooks/useEvents";

const EventsList = () => {
    const [events] = useEvents();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [eventsPerPage, setEventsPerPage] = useState(5);

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

    const startIndex = (currentPage - 1) * eventsPerPage;
    const endIndex = Math.min(startIndex + eventsPerPage, filteredEvents.length);

    const currentEvents = filteredEvents.slice(startIndex, endIndex);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleEventsPerPageChange = (e) => {
        setEventsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <>
            <div>
                <PageTitle
                    from={"Events"}
                    to={"Events List"}
                />
            </div>
            <div className="bg-white pb-1">
                <div>
                    <h1 className="px-6 py-3 font-bold">All Events List</h1>
                    <hr className='text-center border border-gray-500 mb-5' />
                </div>
                <div className="px-6">
                    <div className="mb-5 flex flex-col-reverse md:flex-row justify-center md:justify-between items-center">
                        <div className="mt-5 md:mt-0">
                            <label htmlFor="eventsPerPage">Show</label>
                            <select
                                id="eventsPerPage"
                                value={eventsPerPage}
                                onChange={handleEventsPerPageChange}
                                className="border border-gray-500 rounded p-1 pointer-cursor mx-2"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                            <label htmlFor="eventsPerPage">events per page</label>
                        </div>
                        <div>
                            {/* Search Input */}
                            <div className="flex justify-center rounded-l-lg group">
                                <div className='flex justify-center items-center border border-gray-500 border-r-0 p-3 rounded-l-full  text-black font-extrabold text-shadow-xl'>
                                    <ImSearch />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search events"
                                    value={searchTerm}
                                    onChange={handleSearch}
                                    className="border border-gray-500 border-l-0 px-3 py-1 rounded-r-full focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="overflow-x-auto mb-3">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className="text-center">Image</th>
                                    <th>Title with date</th>
                                    <th>Description</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentEvents.map(event => (
                                        <EventsCard
                                            key={event._id}
                                            event={event}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center mb-10">
                        <div
                            className={`mx-1 px-3 py-1 rounded-lg flex justify-center items-center ${currentPage === 1 ? 'cursor-not-allowed' : ''}`}
                            onClick={() => changePage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <span className='flex justify-between items-center text-black cursor-pointer'>
                                <BsArrowLeftCircleFill className='h-6 w-6' />
                            </span>
                        </div>
                        <div className='flex justify-center items-center'>
                            {
                                Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index}
                                        className={`mx-1 flex justify-center items-center w-6 h-6 border border-black rounded-full ${currentPage === index + 1 ? 'bg-[#3B82F6] text-white font-mono font-extrabold italic border-2 border-green-900' : ''
                                            }`}
                                        onClick={() => changePage(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))
                            }
                        </div>
                        <div
                            className={`mx-1 px-3 py-1 rounded-lg flex justify-center items-center ${currentPage === totalPages ? 'cursor-not-allowed' : ''}`}
                            onClick={() => changePage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <span className='flex justify-between items-center text-black cursor-pointer'>
                                <BsArrowRightCircleFill className='h-6 w-6' />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EventsList;