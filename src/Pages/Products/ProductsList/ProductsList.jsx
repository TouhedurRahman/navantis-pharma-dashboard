import { useState } from "react";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import useProducts from "../../../Hooks/useProducts";
import ProductsCard from "../ProductsCard/ProductsCard";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import { ImSearch } from 'react-icons/im';

const ProductsList = () => {
    const [products] = useProducts();

    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [productsPerPage, setProductsPerPage] = useState(5);

    const filteredProducts = products.filter(product =>
        product.forSearch.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = Math.min(startIndex + productsPerPage, filteredProducts.length);

    const currentProducts = filteredProducts.slice(startIndex, endIndex);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleProductsPerPageChange = (e) => {
        setProductsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    return (
        <>
            <div>
                <PageTitle
                    from={"Products"}
                    to={"Products List"}
                />
            </div>
            <div className="bg-white pb-1">
                <div>
                    <h1 className="px-6 py-3 font-bold">All Products List</h1>
                    <hr className='text-center border border-gray-500 mb-5' />
                </div>
                <div className="px-6">
                    <div className="mb-5 flex flex-col-reverse md:flex-row justify-center md:justify-between items-center">
                        <div className="mt-5 md:mt-0">
                            <label htmlFor="productsPerPage">Show</label>
                            <select
                                id="productsPerPage"
                                value={productsPerPage}
                                onChange={handleProductsPerPageChange}
                                className="border border-gray-500 rounded p-1 pointer-cursor mx-2"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={15}>15</option>
                                <option value={20}>20</option>
                                <option value={50}>50</option>
                            </select>
                            <label htmlFor="productsPerPage">products per page</label>
                        </div>
                        <div>
                            {/* Search Input */}
                            <div className="flex justify-center rounded-l-lg group">
                                <div className='flex justify-center items-center border border-gray-500 border-r-0 p-3 rounded-l-full  text-black font-extrabold text-shadow-xl'>
                                    <ImSearch />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search products"
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
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    currentProducts.map(product => (
                                        <ProductsCard
                                            key={product._id}
                                            product={product}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center lg:justify-end items-center mb-10">
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

export default ProductsList;