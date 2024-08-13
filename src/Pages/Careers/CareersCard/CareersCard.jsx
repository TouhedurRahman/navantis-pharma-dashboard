import axios from "axios";
import { FaEdit, FaEye, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CareersCard = ({ career, refetch }) => {
    const handleDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://api.navantispharma.com/career/${career._id}`)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Career has been deleted.",
                                icon: "success",
                                confirmButtonText: "OK",
                                confirmButtonColor: "#3B82F6"
                            });
                        }
                    })
            }
        });
    }

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
                    <Link to={`/update-career/${career._id}`}>
                        <button className="p-2 rounded-[5px] hover:bg-orange-100 focus:outline-none">
                            <FaEdit className="text-orange-500" />
                        </button>
                    </Link>
                    <button
                        onClick={() => handleDelete()}
                        className="p-2 rounded-[5px] hover:bg-red-100 focus:outline-none"
                    >
                        <FaTrashAlt className="text-red-500" />
                    </button>
                </div>
            </th>
        </tr>
    );
};

export default CareersCard;