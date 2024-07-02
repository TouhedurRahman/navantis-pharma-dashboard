import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";

const ProductsCard = ({ product }) => {
    return (
        <tr>
            <td>
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={product.imageURL}
                                alt="Loading..." />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold">{product.name}</div>
                    <div className="text-sm opacity-50">{product.subtitle}</div>
                </div>
            </td>
            <td>
                <div className="text-sm text-justify">
                    {product.description}
                </div>
            </td>
            <th>
                <div className="flex justify-center items-center space-x-4 text-md">
                    <button className="p-2 rounded-[5px] hover:bg-green-100 focus:outline-none">
                        <FaEye className="text-green-500" />
                    </button>
                    <button className="p-2 rounded-[5px] hover:bg-orange-100 focus:outline-none">
                        <FaEdit className="text-orange-500" />
                    </button>
                    <button className="p-2 rounded-[5px] hover:bg-red-100 focus:outline-none">
                        <FaTrashAlt className="text-red-500" />
                    </button>
                </div>
            </th>
        </tr>
    );
};

export default ProductsCard;