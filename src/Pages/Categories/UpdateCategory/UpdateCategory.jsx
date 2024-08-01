import { useForm } from "react-hook-form";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import useCategories from "../../../Hooks/useCategories";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import Loader from "../../../Components/Loader/Loader";
import axios from "axios";
import useHosting from "../../../Hooks/useHosting";
import Swal from "sweetalert2";

const UpdateCategory = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [categories, loading] = useCategories();
    const [editImage, setEditImage] = useState(false);

    const { id } = useParams();
    const img_hosting_url = useHosting();
    const navigate = useNavigate();

    const category = categories.find(category => category._id == id);

    const transformCategory = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };

    const handleUpdateCategory = data => {
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

                    const updatedCategory = {
                        name: data.name,
                        category: transformCategory(data.name),
                        updatedBy: data.updatedby,
                        updatedEmail: data.updatedemail,
                        imageURL: imgURL
                    }

                    axios.patch(`http://localhost:5000/category/${category._id}`, updatedCategory)
                        .then(response => {
                            if (response.data.modifiedCount) {
                                reset();
                                navigate('/categories-list');
                                Swal.fire({
                                    icon: "success",
                                    title: "Category successfully updated!",
                                    showConfirmButton: false,
                                    timer: 1500,
                                });
                            }
                        })
                })
        } else {
            const updatedCategory = {
                name: data.name,
                category: transformCategory(data.name),
                updatedBy: data.updatedby,
                updatedEmail: data.updatedemail
            }

            axios.patch(`http://localhost:5000/category/${category._id}`, updatedCategory)
                .then(response => {
                    if (response.data.modifiedCount) {
                        reset();
                        navigate('/categories-list');
                        Swal.fire({
                            icon: "success",
                            title: "Category successfully updated!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    }
                })
        }
    }

    const handleEditClick = (event) => {
        event.preventDefault();
        setEditImage(!editImage);
    }

    return (
        <div>
            <PageTitle
                from={"Categories"}
                to={"Update category"}
            />

            <div className="bg-white">
                <h1 className="px-6 py-3 font-bold">Update category</h1>
                <hr className='text-center border border-gray-500 mb-5' />
                {
                    loading
                        ?
                        <>
                            <Loader />
                        </>
                        :
                        <>
                            <form onSubmit={handleSubmit(handleUpdateCategory)} className="p-6 pt-0">
                                <div className="flex flex-col mb-2">
                                    <label className="text-[#6E719A] mb-1 text-sm">
                                        Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        defaultValue={category.name}
                                        {...register("name", { required: "Name is required" })}
                                        placeholder="Enter Name"
                                        className="border-gray-500 bg-white border p-2 text-sm"
                                    />
                                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
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
                                                        defaultValue={category.imageURL}
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

                                <h1 className="mt-10 text-sm">Category updated by</h1>
                                <hr className='w-full border border-gray-500 mb-3' />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                    <div className="flex flex-col">
                                        <label className="text-[#6E719A] mb-1 text-sm">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            defaultValue={"Navantis Pharma Limited"}
                                            {...register("updatedby", { required: "Updated by is required" })}
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
                                            defaultValue={"info@navantispharma.com"}
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

export default UpdateCategory;