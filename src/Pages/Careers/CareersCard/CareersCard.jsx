import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const CareersCard = ({ career }) => {

    return (
        <tr>
            <td>
                {career.designation}
            </td>
            <td>
                {career.department}
            </td>
            <td>
                {career.location}
            </td>
            <td className="text-center">
                {career.vacancy}
            </td>
            <th>
                <div className="flex justify-center items-center space-x-4 text-md">
                    <Link to={`/career/${career._id}`}>
                        <button className="p-2 rounded-[5px] hover:bg-green-100 focus:outline-none">
                            <FaEye className="text-green-500" />
                        </button>
                    </Link>
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

export default CareersCard;