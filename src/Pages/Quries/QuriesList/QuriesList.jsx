import { useState } from "react";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';
import QuriesCard from "../QuriesCard/QuriesCard";
import useQueries from "../../../Hooks/useQueries";

const QueriesList = () => {
    const [queries] = useQueries();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [queriesPerPage, setQueriesPerPage] = useState(5);

    const filteredQueries = queries.filter(query =>
        query.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredQueries.length / queriesPerPage);

    const startIndex = (currentPage - 1) * queriesPerPage;
    const endIndex = Math.min(startIndex + queriesPerPage, filteredQueries.length);

    const currentQueries = filteredQueries.slice(startIndex, endIndex);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handlequeriesPerPageChange = (e) => {
        setQueriesPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <>
            <div>
                <PageTitle
                    from={"Queries"}
                    to={"Quries list"}
                />
            </div>
            <div className="bg-white pb-1">
                <div>
                    <h1 className="px-6 py-3 font-bold">All quries list</h1>
                    <hr className='text-center border border-gray-500 mb-5' />
                </div>
                <div className="px-6">
                    <div className="mb-5 flex flex-col-reverse md:flex-row justify-center md:justify-between items-center">
                        <div className="mt-5 md:mt-0">
                            <label htmlFor="queriesPerPage">Show</label>
                            <select
                                id="queriesPerPage"
                                value={queriesPerPage}
                                onChange={handlequeriesPerPageChange}
                                className="border border-gray-500 rounded p-1 pointer-cursor mx-2"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                            <label htmlFor="queriesPerPage">quries per page</label>
                        </div>
                        <div>
                            {/* Search Input */}
                            <div className="flex justify-center rounded-l-lg group">
                                <div className='flex justify-center items-center border border-gray-500 border-r-0 p-3 rounded-l-full  text-black font-extrabold text-shadow-xl'>
                                    <ImSearch />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search by name"
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
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentQueries.map(query => (
                                        <QuriesCard
                                            key={query._id}
                                            query={query}
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

export default QueriesList;