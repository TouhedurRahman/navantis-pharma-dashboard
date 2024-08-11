import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import { FaTrashAlt } from "react-icons/fa";
import useQueries from "../../../Hooks/useQueries";
import { useForm } from "react-hook-form";
import Loader from "../../../Components/Loader/Loader";
import Swal from "sweetalert2";
import axios from "axios";

const SingleQuery = () => {
    const [queries, loading, refetch] = useQueries();
    const { id } = useParams();
    const query = queries.find(query => query._id === id);

    const navigate = useNavigate();

    let formattedDate;
    if (query) {
        formattedDate = new Date(query.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Reply submitted:", data.reply);
        reset();
    };

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
                axios.delete(`https://api.navantispharma.com/query/${query._id}`)
                    .then(response => {
                        if (response.data.deletedCount > 0) {
                            refetch();
                            navigate('/queries-list');
                            Swal.fire({
                                title: "Deleted!",
                                text: "Query has been deleted.",
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
                    from={"Queries"}
                    to={"Single query"}
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
                                        <h1 className="pt-3 font-bold text-2xl">{query.name}</h1>
                                        <h2 className="pb-3 text-gray-600">{formattedDate}</h2>
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
                                <hr className='text-center border border-gray-500 mb-5' />
                            </div>
                            <div className="px-6 flex flex-col justify-center items-start">
                                <div className="overflow-x-auto w-full">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th className="text-center">Email</th>
                                                <th className="text-center">Phone</th>
                                                <th className="text-center">Location</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-center">{query.email}</td>
                                                <td className="text-center">{query.phone}</td>
                                                <td className="text-center">{query.location}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-10 w-full">
                                    <h2 className="pb-1 text-gray-600 font-bold">Message</h2>
                                    <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                                    <h2 className="text-gray-600 text-justify">{query.message}</h2>
                                </div>
                                <div className="mt-10 w-full">
                                    <h2 className="pb-1 text-gray-600 font-bold">
                                        Reply <span className="text-red-500">*</span>
                                    </h2>
                                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                                        <textarea
                                            className="w-full p-2 border border-gray-500"
                                            rows="4"
                                            {...register("reply", { required: "Reply message is required" })}
                                            placeholder="Write your reply here..."
                                        ></textarea>
                                        {errors.reply && <p className="text-red-500 text-sm">{errors.reply.message}</p>}
                                        <button
                                            type="submit"
                                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    );
};

export default SingleQuery;

/* import { useParams } from "react-router-dom";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import { FaTrashAlt } from "react-icons/fa";
import useQueries from "../../../Hooks/useQueries";
import { useForm } from "react-hook-form";
import Loader from "../../../Components/Loader/Loader";

const SingleQuery = () => {
    const [queries, loading] = useQueries();
    const { id } = useParams();
    const query = queries.find(query => query._id == id);

    // Ensure createdAt is a valid Date object or a parsable date string
    const formattedDate = new Date(query.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log("Reply submitted:", data.reply);
        reset();
    };

    return (
        <>
            <div>
                <PageTitle
                    from={"Queries"}
                    to={"Single query"}
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
                                        <h1 className="pt-3 font-bold text-2xl">{query.name}</h1>
                                        <h2 className="pb-3 text-gray-600">{formattedDate}</h2>
                                    </div>
                                    <div className="flex justify-center items-center space-x-2 text-xl">
                                        <button className="p-2 rounded-[5px] hover:bg-red-100 focus:outline-none">
                                            <FaTrashAlt className="text-red-500" />
                                        </button>
                                    </div>
                                </div>
                                <hr className='text-center border border-gray-500 mb-5' />
                            </div>
                            <div className="px-6 flex flex-col justify-center items-start">
                                <div className="overflow-x-auto w-full">
                                    <table className="table table-zebra">
                                        <thead>
                                            <tr>
                                                <th className="text-center">Email</th>
                                                <th className="text-center">Phone</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-center">{query.email}</td>
                                                <td className="text-center">{query.phone}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-10 w-full">
                                    <h2 className="pb-1 text-gray-600 font-bold">Message</h2>
                                    <hr className='text-center w-[30%] border border-gray-500 mb-1' />
                                    <h2 className="text-gray-600 text-justify">{query.message}</h2>
                                </div>
                                <div className="mt-10 w-full">
                                    <h2 className="pb-1 text-gray-600 font-bold">
                                        Reply <span className="text-red-500">*</span>
                                    </h2>
                                    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                                        <textarea
                                            className="w-full p-2 border border-gray-500"
                                            rows="4"
                                            {...register("reply", { required: "Reply message is required" })}
                                            placeholder="Write your reply here..."
                                        ></textarea>
                                        {errors.reply && <p className="text-red-500 text-sm">{errors.reply.message}</p>}
                                        <button
                                            type="submit"
                                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </>
                }
            </div>
        </>
    );
};

export default SingleQuery; */