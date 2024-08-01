import { Link, useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import useEvents from "../../../Hooks/useEvents";
import Loader from "../../../Components/Loader/Loader";
import Swal from "sweetalert2";
import axios from "axios";

const SingleEvent = () => {
    const [events, loading, refetch] = useEvents();
    const { id } = useParams();
    const event = events.find(event => event._id == id);

    const navigate = useNavigate();

    let eventDate;
    if (event) {
        eventDate = new Date(event.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
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
                axios.delete(`http://localhost:5000/event/${event._id}`)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            refetch();
                            navigate('/events-list');
                            Swal.fire({
                                title: "Deleted!",
                                text: "Event has been deleted.",
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
                    from={"Events"}
                    to={"Single event"}
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
                                        <h1 className="pt-3 font-bold text-2xl">{event.title}</h1>
                                        <h2 className="pb-3 text-gray-600">{eventDate}</h2>
                                    </div>
                                    <div className="flex justify-center items-center space-x-2 text-xl">
                                        <Link to={`/update-event/${event._id}`}>
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
                                <div className="w-full lg:w-[70%] flex flex-col justify-start items-start">
                                    <div className="mt-10 w-full">
                                        <h2 className="pb-1 text-gray-600 text-center font-bold">Description</h2>
                                        <hr className='text-center w-[30%] mx-auto border border-gray-500 mb-1' />
                                        <h2 className="text-gray-600 text-justify">{event.description}</h2>
                                    </div>
                                </div>
                                <div className="w-full lg:w-[30%] flex flex-col justify-end items-center lg:items-end">
                                    <div className="flex justify-center items-center">
                                        <div className="avatar">
                                            <div className="w-72 h-72 rounded">
                                                <img src={event.imageURL} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols md:grid-cols-2 gap-4 px-6">
                                {
                                    event.addedBy
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
                                                        <td>{event.addedBy}</td>
                                                    </tr>

                                                    {/* row 1 */}
                                                    <tr className="hover">
                                                        <th>Email</th>
                                                        <td>{event.addedEmail}</td>
                                                    </tr>
                                                    {/* row 2 */}
                                                    <tr className="hover">
                                                        <th>Date</th>
                                                        <td>
                                                            {
                                                                new Date(event.createdAt).toLocaleString('en-US', {
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
                                    event.updatedBy
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
                                                        <td>{event.updatedBy}</td>
                                                    </tr>

                                                    {/* row 1 */}
                                                    <tr className="hover">
                                                        <th>Email</th>
                                                        <td>{event.updatedEmail}</td>
                                                    </tr>
                                                    {/* row 2 */}
                                                    <tr className="hover">
                                                        <th>Date</th>
                                                        <td>
                                                            {
                                                                new Date(event.updatedAt).toLocaleString('en-US', {
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

export default SingleEvent;