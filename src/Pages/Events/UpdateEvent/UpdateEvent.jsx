import { useForm } from "react-hook-form";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import useEvents from "../../../Hooks/useEvents";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import axios from "axios";
import useHosting from "../../../Hooks/useHosting";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";


const UpdateEvent = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [events, loading] = useEvents();
    const [editImage, setEditImage] = useState(false);

    const { id } = useParams();
    const img_hosting_url = useHosting();
    const navigate = useNavigate();

    const event = events.find(event => event._id == id);

    const handleEditClick = (event) => {
        event.preventDefault();
        setEditImage(!editImage);
    }

    const handleUpdateEvent = data => {
        if (editImage === true) {
            const formData = new FormData();
            formData.append("image", data.image[0]);

            fetch(img_hosting_url, {
                method: 'POST',
                body: formData
            })
                .then(res => res.json())
                .then(imgResponse => {
                    const imgURL = imgResponse.data.display_url;

                    const updatedEvent = {
                        title: data.title,
                        date: data.date,
                        description: data.description,
                        updatedBy: data.updatedby,
                        updatedEmail: data.updatedemail,
                        imageURL: imgURL
                    }

                    axios.patch(`http://localhost:5000/event/${event._id}`, updatedEvent)
                        .then(response => {
                            if (response.data.modifiedCount) {
                                reset();
                                navigate(`/event/${event._id}`);
                                Swal.fire({
                                    icon: "success",
                                    title: "Product successfully updated!",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                            }
                        })
                })
        } else {
            const updatedEvent = {
                title: data.title,
                date: data.date,
                description: data.description,
                updatedBy: data.updatedby,
                updatedEmail: data.updatedemail,
            }

            axios.patch(`http://localhost:5000/event/${event._id}`, updatedEvent)
                .then(response => {
                    if (response.data.modifiedCount) {
                        reset();
                        navigate(`/event/${event._id}`);
                        Swal.fire({
                            icon: "success",
                            title: "Product successfully updated!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                })
        }
    }

    return (
        <div>
            <PageTitle
                from={"Events"}
                to={"Update event"}
            />

            <div className="bg-white">
                <h1 className="px-6 py-3 font-bold">Update event</h1>
                <hr className='text-center border border-gray-500 mb-5' />
                {
                    loading
                        ?
                        <>
                            <Loader />
                        </>
                        :
                        <>
                            <form onSubmit={handleSubmit(handleUpdateEvent)} className="p-6 pt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                    <div className="flex flex-col">
                                        <label className="text-[#6E719A] mb-1 text-sm">
                                            Title <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            defaultValue={event.title}
                                            {...register("title", { required: "Title is required" })}
                                            placeholder="Enter title"
                                            className="border-gray-500 bg-white border p-2 text-sm"
                                        />
                                        {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[#6E719A] mb-1 text-sm">
                                            Date <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            defaultValue={event.date}
                                            type="date"
                                            {...register("date", { required: "Date is required" })}
                                            placeholder="Enter date"
                                            className="border-gray-500 bg-white border p-2 text-sm cursor-pointer"
                                        />
                                        {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                                    </div>
                                </div>
                                {
                                    editImage
                                        ?
                                        <>
                                            <div className="flex flex-col mb-2">
                                                <label className="text-[#6E719A] mb-1 text-sm">
                                                    Image upload <span className="text-red-500">*</span>
                                                </label>
                                                <div className="flex items-center">
                                                    <input
                                                        type="file"
                                                        {...register("image", { required: "Image file is required" })}
                                                        className="h-10 file-input file-input-bordered border-gray-500 w-full rounded-none text-sm cursor-pointer"
                                                    />
                                                    <button
                                                        className="ml-2 p-2 h-10 border border-gray-500 bg-white text-gray-700"
                                                        onClick={handleEditClick}>
                                                        <RxCross1 />
                                                    </button>
                                                </div>
                                                {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className="flex flex-col mb-2">
                                                <label className="text-[#6E719A] mb-1 text-sm">
                                                    Image upload <span className="text-red-500">*</span>
                                                </label>
                                                <div className="flex items-center">
                                                    <input
                                                        defaultValue={event.imageURL}
                                                        {...register("image")}
                                                        placeholder="Enter Image URL"
                                                        className="border-gray-500 h-10 bg-white border p-2 text-sm flex-1 cursor-not-allowed"
                                                        readOnly
                                                    />
                                                    <button
                                                        className="ml-2 p-2 h-10 border border-gray-500 bg-white text-gray-700"
                                                        onClick={handleEditClick}>
                                                        <FaEdit />
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                }
                                <div className="flex flex-col mb-2">
                                    <label className="text-[#6E719A] mb-1 text-sm">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        defaultValue={event.description}
                                        {...register("description", { required: "Description is required" })}
                                        placeholder="Enter description"
                                        className="border-gray-500 bg-white border p-2 text-sm"
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                                </div>

                                <h1 className="mt-10 text-sm">Event updated by</h1>
                                <hr className='w-full border border-gray-500 mb-3' />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                    <div className="flex flex-col">
                                        <label className="text-[#6E719A] mb-1 text-sm">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            defaultValue={user.displayName}
                                            {...register("updatedby", { required: "Added by is required" })}
                                            placeholder="Enter name of person updating"
                                            className="border-gray-500 bg-white border p-2 text-sm cursor-not-allowed"
                                            readOnly
                                        />
                                        {errors.updatedby && <p className="text-red-500 text-sm">{errors.updatedby.message}</p>}
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[#6E719A] mb-1 text-sm">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            defaultValue={user.email}
                                            {...register("updatedemail", {
                                                required: "Email is required",
                                                pattern: {
                                                    value: /^\S+@\S+$/i,
                                                    message: "Invalid email address"
                                                }
                                            })}
                                            placeholder="Enter email"
                                            className="border-gray-500 bg-white border p-2 text-sm cursor-not-allowed"
                                            readOnly
                                        />
                                        {errors.updatedemail && <p className="text-red-500 text-sm">{errors.updatedemail.message}</p>}
                                    </div>
                                </div>
                                <button type="submit" className="bg-blue-500 text-white mt-5 p-2 rounded text-sm">Submit</button>
                            </form>
                        </>
                }
            </div>
        </div>
    );
};

export default UpdateEvent;