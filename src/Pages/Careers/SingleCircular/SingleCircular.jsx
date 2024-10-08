import { Link, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useCareers from "../../../Hooks/useCareers";
import Loader from "../../../Components/Loader/Loader";
import Swal from "sweetalert2";
import axios from "axios";

const SingleCircular = () => {
    const [careers, loading, refetch] = useCareers();
    const { id } = useParams();
    const career = careers.find(career => career._id == id);

    const navigate = useNavigate();

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
                            navigate('/careers-list')
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
        <>
            <div>
                <PageTitle
                    from={"Careers"}
                    to={"Single job circular"}
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
                                <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center">
                                    <div className="flex flex-col justify-center lg:justify-start items-center lg:items-start">
                                        <h1 className="pt-3 font-bold text-2xl text-center lg:text-left">{career.designation}</h1>
                                        <h2 className="pb-3 text-gray-600">{career.department}</h2>
                                    </div>
                                    <div className="flex justify-center items-center space-x-2 text-xl">
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
                                </div>
                                <hr className='text-center border border-gray-500 mb-5 mt-2 lg:mt-0' />
                            </div>
                            <div className="px-6 flex justify-between items-start">
                                <div className="flex flex-col justify-start items-start">
                                    <div className="overflow-x-auto w-full">
                                        <table className="table table-zebra">
                                            {/* head */}
                                            <thead>
                                                <tr>
                                                    <th className="text-center">Location</th>
                                                    <th className="text-center">Vacancy</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center">{career.location}</td>
                                                    <td className="text-center">{career.vacancy}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="mt-10 w-full">
                                        <h2 className="pb-1 text-gray-600 font-bold">Outline</h2>
                                        <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                                        <h2 className="text-gray-600 text-justify">{career.outline}</h2>
                                    </div>
                                    <div className="mt-10 w-full">
                                        <h2 className="pb-1 text-gray-600 font-bold">Responsibilities</h2>
                                        <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                                        <h2 className="text-gray-600 text-justify">{career.responsibilities}</h2>
                                    </div>
                                    <div className="mt-10 w-full">
                                        <h2 className="pb-1 text-gray-600 font-bold">Requirements</h2>
                                        <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                                        <h2 className="text-gray-600 text-justify">{career.requirements}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols md:grid-cols-2 gap-4 px-6">
                                {
                                    career.addedBy
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
                                                        <td>{career.addedBy}</td>
                                                    </tr>

                                                    {/* row 1 */}
                                                    <tr className="hover">
                                                        <th>Email</th>
                                                        <td>{career.addedEmail}</td>
                                                    </tr>
                                                    {/* row 2 */}
                                                    <tr className="hover">
                                                        <th>Date</th>
                                                        <td>
                                                            {
                                                                new Date(career.createdAt).toLocaleString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                    hour: 'numeric',
                                                                    minute: 'numeric',
                                                                    second: 'numeric',
                                                                    hour12: true, // This will format the time in 12-hour clock with AM/PM
                                                                })
                                                            }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                }
                                {
                                    career.updatedBy
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
                                                        <td>{career.updatedBy}</td>
                                                    </tr>

                                                    {/* row 1 */}
                                                    <tr className="hover">
                                                        <th>Email</th>
                                                        <td>{career.updatedEmail}</td>
                                                    </tr>
                                                    {/* row 2 */}
                                                    <tr className="hover">
                                                        <th>Date</th>
                                                        <td>
                                                            {
                                                                new Date(career.updatedAt).toLocaleString('en-US', {
                                                                    year: 'numeric',
                                                                    month: 'long',
                                                                    day: 'numeric',
                                                                    hour: 'numeric',
                                                                    minute: 'numeric',
                                                                    second: 'numeric',
                                                                    hour12: true, // This will format the time in 12-hour clock with AM/PM
                                                                })
                                                            }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                }
                            </div>
                        </>
                }
            </div>
        </>
    );
};

export default SingleCircular;