import { FaTrashAlt } from "react-icons/fa";
import { FaEye, FaUserShield } from "react-icons/fa6";
import { Link } from "react-router-dom";

const UsersCard = ({ user, idx }) => {
    const handleMakeAdmin = () => {
        console.log("Admin");
    }

    return (
        <tr>
            <td className="text-center">
                {
                    (idx < 10)
                        ?
                        `0${idx + 1}`
                        :
                        `${idx + 1}`
                }
            </td>
            <td className="flex justify-center items-center">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                            <img
                                src={
                                    user.profilePicture
                                        ?
                                        `${user.profilePicture}`
                                        :
                                        "https://i.ibb.co/6r3zmMg/user.jpg"
                                }
                                alt="Loading..." />
                        </div>
                    </div>
                </div>
            </td>
            <td>
                <div>
                    <div className="font-bold">{user.name}</div>
                    <div className="text-sm opacity-80">designation</div>
                </div>
            </td>
            <td>
                <p>
                    {user.email}
                </p>
            </td>
            <td>
                {
                    user.role === 'admin'
                        ?
                        <div className="text-center">Admin</div>
                        :
                        <div className="flex justify-center items-center">
                            <button
                                onClick={() => handleMakeAdmin(user)}
                                className="p-2 rounded-[5px] hover:bg-orange-100 focus:outline-none">
                                <FaUserShield className="text-orange-500" />
                            </button>
                        </div>
                }
            </td>
            <th>
                <div className="flex justify-center items-center space-x-4 text-md">
                    <Link>
                        <button className="p-2 rounded-[5px] hover:bg-green-100 focus:outline-none">
                            <FaEye className="text-green-500" />
                        </button>
                    </Link>
                    <button
                        // onClick={() => handleDelete()}
                        className="p-2 rounded-[5px] hover:bg-red-100 focus:outline-none"
                    >
                        <FaTrashAlt className="text-red-500" />
                    </button>
                </div>
            </th>
        </tr>
    );
};

export default UsersCard;