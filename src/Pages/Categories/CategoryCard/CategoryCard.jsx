import axios from "axios";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const CategoryCard = ({ category, refetch }) => {

    const createdDate = new Date(category.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

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
                axios.delete(`http://localhost:5000/category/${category._id}`)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Category has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        })
    };

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
            <td>
                {
                    category.updatedBy
                        ?
                        <>

                        </>
                        :
                        <>
                            <div className="text-sm text-center">
                                <p>{category.addedBy} {category.addedBy && '(A)'}</p>
                                <p>{category.addedEmail}</p>
                                <p>{category.createdAt && createdDate}</p>
                            </div>
                        </>
                }
            </td>
            <th className="text-center">
                <div className="flex justify-center items-center space-x-4 text-md">
                    <Link to={`/update-category/${category._id}`}>
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

export default CategoryCard;