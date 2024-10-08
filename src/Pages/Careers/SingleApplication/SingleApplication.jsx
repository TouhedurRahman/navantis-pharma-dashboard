import { Link, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import { FaTrashAlt } from "react-icons/fa";
import useApplications from "../../../Hooks/useApplications";
import Loader from "../../../Components/Loader/Loader";
import Swal from "sweetalert2";
import axios from "axios";

const SingleApplication = () => {
    const [applications, loading, refetch] = useApplications();
    const { id } = useParams();
    const application = applications.find(application => application._id === id);

    const navigate = useNavigate();

    let formattedDate;
    if (application) {
        formattedDate = new Date(application.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            hour12: true, // This will format the time in 12-hour clock with AM/PM
        });
    }

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
                axios.delete(`https://api.navantispharma.com/application/${application._id}`)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            refetch();
                            navigate('/career-applications');
                            Swal.fire({
                                title: "Deleted!",
                                text: "Application has been deleted.",
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
                    to={"Single application"}
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
                                        <h1 className="pt-3 font-bold text-2xl text-center lg:text-left">{application.designation}</h1>
                                        <h2 className="pb-3 text-gray-600">{application.department}</h2>
                                    </div>
                                    <div className="flex justify-center items-center space-x-2 text-xl">
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
                            <div className="px-6 flex flex-col justify-center items-start">
                                <div className="mt-2 w-full flex flex-col lg:flex-row justify-center items-center">
                                    <h2 className="pb-1 text-gray-600 font-bold flex">Applied date & time <span className="hidden lg:block">:</span> </h2>
                                    <h2 className="text-gray-600 ml-1">{formattedDate}</h2>
                                </div>
                                <div className="overflow-x-auto w-full">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th className="text-center">Name</th>
                                                <th className="text-center">Email</th>
                                                <th className="text-center">Phone</th>
                                                <th className="text-center">CV</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-center">{application.name}</td>
                                                <td className="text-center">{application.email}</td>
                                                <td className="text-center">{application.phone}</td>
                                                <td className="text-center">
                                                    <Link
                                                        target="_blank"
                                                        to={application.cvLink}
                                                        className="text-blue-500 hover:link"
                                                    >
                                                        Click here
                                                    </Link>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-10 w-full flex">
                                    <h2 className="pb-1 text-gray-600 font-bold">Job location: </h2>
                                    <h2 className="text-gray-600 ml-1">{application.jobLocation}</h2>
                                </div>
                                <div className="mt-10 w-full">
                                    <h2 className="pb-1 text-gray-600 font-bold">Cover letter</h2>
                                    <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                                    <h2 className="text-gray-600 text-justify">{application.coverLetter}</h2>
                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    );
};

export default SingleApplication;