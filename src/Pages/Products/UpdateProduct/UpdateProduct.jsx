import { useForm } from "react-hook-form";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import useOnlyCategories from "../../../Hooks/useOnlyCategories";
import useProducts from "../../../Hooks/useProducts";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Loader from "../../../Components/Loader/Loader";
import axios from "axios";
import useHosting from "../../../Hooks/useHosting";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const UpdateProduct = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [products, loading] = useProducts();
    const [onlyCategories] = useOnlyCategories();
    const [editImage, setEditImage] = useState(false);

    const img_hosting_url = useHosting();
    const navigate = useNavigate();

    const { id } = useParams();
    const product = products.find(product => product._id == id);

    const transformExistingGroup = (group) => {
        return group
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const transformGroup = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };

    const handleUpdateProduct = data => {
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

                    const updatedProduct = {
                        name: data.name,
                        subtitle: data.subtitle,
                        forSearch: data.name + " " + data.subtitle,
                        usage: data.usage,
                        group: transformGroup(data.group),
                        category: data.category,
                        apply: data.apply,
                        description: data.description,
                        moComLink: data.motherCompanyLink,
                        updatedBy: data.updatedby,
                        updatedEmail: data.updatedemail,
                        imageURL: imgURL
                    }

                    axios.patch(`https://api.navantispharma.com/product/${product._id}`, updatedProduct)
                        .then(response => {
                            if (response.data.modifiedCount) {
                                reset();
                                navigate(`/product/${product._id}`);
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
            const updatedProduct = {
                name: data.name,
                subtitle: data.subtitle,
                forSearch: data.name + " " + data.subtitle,
                usage: data.usage,
                group: transformGroup(data.group),
                category: data.category,
                apply: data.apply,
                description: data.description,
                moComLink: data.motherCompanyLink,
                updatedBy: data.updatedby,
                updatedEmail: data.updatedemail,
            }

            axios.patch(`https://api.navantispharma.com/product/${product._id}`, updatedProduct)
                .then(response => {
                    if (response.data.modifiedCount) {
                        reset();
                        navigate(`/product/${product._id}`);
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

    const handleEditClick = (event) => {
        event.preventDefault();
        setEditImage(!editImage);
    }

    return (
        <div>
            <PageTitle
                from={"Products"}
                to={"Update product"}
            />

            <div className="bg-white">
                <h1 className="px-6 py-3 font-bold">Update product</h1>
                <hr className='text-center border border-gray-500 mb-5' />
                {
                    loading
                        ?
                        <>
                            <Loader />
                        </>
                        :
                        <>
                            <form onSubmit={handleSubmit(handleUpdateProduct)} className="p-6 pt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                    <div className="flex flex-col">
                                        <label className="text-[#6E719A] mb-1 text-sm">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            defaultValue={product.name}
                                            {...register("name", { required: "Name is required" })}
                                            placeholder="Enter product name"
                                            className="border-gray-500 bg-white border p-2 text-sm"

                                        />
                                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[#6E719A] mb-1 text-sm">
                                            Subtitle <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            defaultValue={product.subtitle}
                                            {...register("subtitle", { required: "Subtitle is required" })}
                                            placeholder="Enter subtitle"
                                            className="border-gray-500 bg-white border p-2 text-sm"
                                        />
                                        {errors.subtitle && <p className="text-red-500 text-sm">{errors.subtitle.message}</p>}
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
                                                        defaultValue={product.imageURL}
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
                                        Usage <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        defaultValue={product.usage}
                                        {...register("usage", { required: "Usage is required" })}
                                        placeholder="Enter usage"
                                        className="border-gray-500 bg-white border p-2 text-sm"
                                    />
                                    {errors.usage && <p className="text-red-500 text-sm">{errors.usage.message}</p>}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                    <div className="flex flex-col">
                                        <label className="text-[#6E719A] mb-1 text-sm">
                                            Group <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            defaultValue={
                                                transformExistingGroup(product.group)
                                            }
                                            {...register("group", { required: "Group is required" })}
                                            placeholder="Enter group"
                                            className="border-gray-500 bg-white border p-2 text-sm"
                                        />
                                        {errors.group && <p className="text-red-500 text-sm">{errors.group.message}</p>}
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="text-[#6E719A] mb-1 text-sm">
                                            Category <span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            defaultValue={product.category}
                                            {...register("category", { required: "Category is required" })}
                                            className="border-gray-500 bg-white border p-2 text-sm cursor-pointer"
                                        >
                                            <option value="">Select category</option>
                                            {
                                                onlyCategories.map((categorySingle, index) => {
                                                    const categoryName = categorySingle.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                                                    return (
                                                        <option
                                                            key={index}
                                                            value={categorySingle.category}
                                                        >
                                                            {categoryName}
                                                        </option>
                                                    );
                                                })
                                            }
                                        </select>
                                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                                    </div>
                                </div>
                                <div className="flex flex-col mb-2">
                                    <label className="text-[#6E719A] mb-1 text-sm">
                                        Apply <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        defaultValue={product.apply}
                                        {...register("apply", { required: "Apply is required" })}
                                        placeholder="Enter apply procedure"
                                        className="border-gray-500 bg-white border p-2 text-sm"
                                    />
                                    {errors.apply && <p className="text-red-500 text-sm">{errors.apply.message}</p>}
                                </div>
                                <div className="flex flex-col mb-2">
                                    <label className="text-[#6E719A] mb-1 text-sm">
                                        Description <span className="text-red-500">*</span>
                                    </label>
                                    <textarea
                                        defaultValue={product.description}
                                        {...register("description", { required: "Description is required" })}
                                        placeholder="Enter description"
                                        className="border-gray-500 bg-white border p-2 text-sm"
                                    />
                                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                                </div>

                                <div className="flex flex-col mb-2">
                                    <label className="text-[#6E719A] mb-1 text-sm">Mother company link (If available)</label>
                                    <input
                                        defaultValue={product.moComLink}
                                        {...register("motherCompanyLink", {
                                            pattern: {
                                                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                                                message: "Enter a valid URL"
                                            }
                                        })}
                                        placeholder="Enter mother company link"
                                        className="border-gray-500 bg-white border p-2 text-sm"
                                    />
                                    {errors.motherCompanyLink && (
                                        <span className="text-red-500 text-sm">{errors.motherCompanyLink.message}</span>
                                    )}
                                </div>

                                <h1 className="mt-10 text-sm">Product updated by</h1>
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

export default UpdateProduct;