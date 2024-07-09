import { Link, useParams } from "react-router-dom";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import useProducts from "../../../Hooks/useProducts";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Loader from "../../../Components/Loader/Loader";

const SingleProduct = () => {
    const [products, loading] = useProducts();
    const { id } = useParams();
    const product = products.find(product => product._id == id);

    const capitalizeWords = (str) => {
        return str.replace(/-/g, ' ')
            .replace(/\b\w/g, char => char.toUpperCase());
    };

    let formattedDate;
    if (product) {
        formattedDate = new Date(product.createdAt).toLocaleString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true, // This will format the time in 12-hour clock with AM/PM
        });
    }


    return (
        <>
            <div>
                <PageTitle
                    from={"Products"}
                    to={"Single product"}
                />
            </div>
            <div className="bg-white pb-3">
                {
                    loading
                        ?
                        <>
                            <Loader />
                        </>
                        :
                        <>
                            <div className="px-6">
                                <div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h1 className="pt-3 font-bold text-2xl">{product.name}</h1>
                                            <h2 className="pb-3 text-gray-600">{product.subtitle}</h2>
                                        </div>
                                        <div className="flex justify-center items-center space-x-2 text-xl">
                                            <Link to={`/update-product/${product._id}`}>
                                                <button className="p-2 rounded-[5px] hover:bg-orange-100 focus:outline-none">
                                                    <FaEdit className="text-orange-500" />
                                                </button>
                                            </Link>
                                            <button className="p-2 rounded-[5px] hover:bg-red-100 focus:outline-none">
                                                <FaTrashAlt className="text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                    <hr className='text-center border border-gray-500 mb-5' />
                                </div>
                                <div className="flex justify-between items-start">
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
                                            <h2 className="pb-1 text-gray-600 font-bold">Usage</h2>
                                            <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                                            <h2 className="text-gray-600">{product.usage}</h2>
                                        </div>
                                        <div className="mt-10 w-full">
                                            <h2 className="pb-1 text-gray-600 font-bold">Apply</h2>
                                            <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                                            <h2 className="text-gray-600">{product.apply}</h2>
                                        </div>
                                        <div className="mt-10 w-full">
                                            <h2 className="pb-1 text-gray-600 font-bold">Description</h2>
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
                                                Mother company:
                                                <Link
                                                    to={
                                                        product.moComLink
                                                            ?
                                                            `${product.moComLink}`
                                                            :
                                                            "https://www.bionike.it/it_en/"
                                                    }
                                                    className="text-blue-600 hover:link ml-1">
                                                    Click here
                                                </Link>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols md:grid-cols-2 gap-4">
                                    {
                                        product.addedBy
                                        &&
                                        <div className="mt-10 w-full">
                                            <h2 className="pb-1 text-gray-600 font-bold">Added by</h2>
                                            <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                                            <div className="md:ml-5 overflow-x-auto">
                                                <table className="table">
                                                    <tbody>
                                                        {/* head */}
                                                        <tr className="hover">
                                                            <th>Name</th>
                                                            <td>{product.addedBy}</td>
                                                        </tr>

                                                        {/* row 1 */}
                                                        <tr className="hover">
                                                            <th>Email</th>
                                                            <td>{product.addedEmail}</td>
                                                        </tr>
                                                        {/* row 2 */}
                                                        <tr className="hover">
                                                            <th>Date</th>
                                                            <td>{formattedDate}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    }
                                    {
                                        product.updatedBy
                                        &&
                                        <div className="mt-10 w-full">
                                            <h2 className="pb-1 text-gray-600 font-bold">Last updated by</h2>
                                            <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                                            <div className="md:ml-5 overflow-x-auto">
                                                <table className="table">
                                                    <tbody>
                                                        {/* head */}
                                                        <tr className="hover">
                                                            <th>Name</th>
                                                            <td>{product.updatedBy}</td>
                                                        </tr>

                                                        {/* row 1 */}
                                                        <tr className="hover">
                                                            <th>Email</th>
                                                            <td>{product.updatedEmail}</td>
                                                        </tr>
                                                        {/* row 2 */}
                                                        <tr className="hover">
                                                            <th>Date</th>
                                                            <td>{formattedDate}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    );
};

export default SingleProduct;