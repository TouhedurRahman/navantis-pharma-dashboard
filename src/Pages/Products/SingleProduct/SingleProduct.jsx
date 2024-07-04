import { Link, useParams } from "react-router-dom";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import useProducts from "../../../Hooks/useProducts";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const SingleProduct = () => {
    const [products] = useProducts();
    const { id } = useParams();
    const product = products.find(product => product._id == id);

    const capitalizeWords = (str) => {
        return str.replace(/-/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    };

    return (
        <>
            <div>
                <PageTitle
                    from={"Products"}
                    to={"Single product"}
                />
            </div>
            <div className="bg-white pb-3">
                <div>
                    <div className="flex justify-between items-center px-6">
                        <div>
                            <h1 className="pt-3 font-bold text-2xl">{product.name}</h1>
                            <h2 className="pb-3 text-gray-600">{product.subtitle}</h2>
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
                        <div className="overflow-x-auto w-full">
                            <table className="table table-zebra">
                                {/* head */}
                                <thead>
                                    <tr>
                                        <th className="text-center">Group</th>
                                        <th className="text-center">Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="text-center">{capitalizeWords(product.group)}</td>
                                        <td className="text-center">{capitalizeWords(product.category)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="mt-10 w-full">
                            <h2 className="pb-1 text-gray-600">Usage</h2>
                            <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                            <h2 className="text-gray-600">{product.usage}</h2>
                        </div>
                        <div className="mt-10 w-full">
                            <h2 className="pb-1 text-gray-600">Apply</h2>
                            <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                            <h2 className="text-gray-600">{product.apply}</h2>
                        </div>
                        <div className="mt-10 w-full">
                            <h2 className="pb-1 text-gray-600">Description</h2>
                            <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                            <h2 className="text-gray-600 text-justify">{product.description}</h2>
                        </div>
                    </div>
                    <div className="w-full lg:w-[30%] flex flex-col justify-end items-center lg:items-end">
                        <div className="flex justify-center items-center">
                            <div className="avatar">
                                <div className="w-72 h-72 rounded">
                                    <img src={product.imageURL} />
                                </div>
                            </div>
                        </div>
                        <div className="w-72 my-3">
                            <p className="text-center">
                                Mother company: <Link to="https://www.bionike.it/it_en/" className="text-blue-600 hover:link">Click here</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleProduct;