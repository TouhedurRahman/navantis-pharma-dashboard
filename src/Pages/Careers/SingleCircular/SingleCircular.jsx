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
                axios.delete(`http://localhost:5000/career/${career._id}`)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            refetch();
                            navigate('/careers-list')
                            Swal.fire({
                                title: "Deleted!",
                                text: "Career has been deleted.",
                                icon: "success"
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
                            <div>
                                <div className="flex justify-between items-center px-6">
                                    <div>
                                        <h1 className="pt-3 font-bold text-2xl">{career.designation}</h1>
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
                                <hr className='text-center border border-gray-500 mb-5' />
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
                        </>
                }
            </div>
        </>
    );
};

export default SingleCircular;