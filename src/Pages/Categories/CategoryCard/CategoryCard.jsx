import { FaEdit, FaTrashAlt } from "react-icons/fa";

const CategoryCard = ({ category }) => {
    return (
        <tr>
            <td className="text-center">
                <div className="flex justify-center items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={category.imageURL}
                                alt="Loading..." />
                        </div>
                    </div>
                </div>
            </td>
            <td className="text-center">
                <div>
                    <div className="font-bold">{category.name}</div>
                </div>
            </td>
            <th className="text-center">
                <div className="flex justify-center items-center space-x-4 text-md">
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

export default CategoryCard;