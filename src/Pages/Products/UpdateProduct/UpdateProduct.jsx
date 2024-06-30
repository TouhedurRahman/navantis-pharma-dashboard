import { useForm } from "react-hook-form";
import PageTitle from "../../../Components/PageTitle/PageTitle";

const UpdateProduct = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const updatedProduct = {
            name: data.name,
            subtitle: data.subtitle,
            forSearch: data.name + " " + data.subtitle,
            usage: data.usage,
            group: data.group,
            category: data.category,
            apply: data.apply,
            description: data.description,
            moComLink: data.motherCompanyLink,
            updatedBy: data.updatedby,
            updatedEmail: data.updatedemail,
            imageURL: data.imageFile
        }
        console.log(updatedProduct);
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
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div className="flex flex-col">
                            <label className="text-[#6E719A] mb-1 text-sm">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
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
                                {...register("subtitle", { required: "Subtitle is required" })}
                                placeholder="Enter subtitle"
                                className="border-gray-500 bg-white border p-2 text-sm"
                            />
                            {errors.subtitle && <p className="text-red-500 text-sm">{errors.subtitle.message}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="text-[#6E719A] mb-1 text-sm">
                            Image Upload <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            {...register("imageFile", { required: "Image file is required" })}
                            className="file-input file-input-bordered border-gray-500 w-full rounded-none text-sm cursor-pointer"
                        />
                        {errors.imageFile && <p className="text-red-500 text-sm">{errors.imageFile.message}</p>}
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="text-[#6E719A] mb-1 text-sm">
                            Usage <span className="text-red-500">*</span>
                        </label>
                        <input
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
                                {...register("category", { required: "Category is required" })}
                                className="border-gray-500 bg-white border p-2 text-sm cursor-pointer"
                            >
                                <option value="">Select category</option>
                                <option value="Category1">Category 1</option>
                                <option value="Category2">Category 2</option>
                                <option value="Category3">Category 3</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="text-[#6E719A] mb-1 text-sm">
                            Apply <span className="text-red-500">*</span>
                        </label>
                        <input
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
                            {...register("description", { required: "Description is required" })}
                            placeholder="Enter description"
                            className="border-gray-500 bg-white border p-2 text-sm"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <div className="flex flex-col mb-2">
                        <label className="text-[#6E719A] mb-1 text-sm">Mother company link (If available)</label>
                        <input
                            {...register("motherCompanyLink")}
                            placeholder="Enter mother company link"
                            className="border-gray-500 bg-white border p-2 text-sm"
                        />
                    </div>

                    <h1 className="mt-10 text-sm">Product updated by</h1>
                    <hr className='w-full border border-gray-500 mb-3' />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div className="flex flex-col">
                            <label className="text-[#6E719A] mb-1 text-sm">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("updatedby", { required: "Added by is required" })}
                                placeholder="Enter name of person updating"
                                className="border-gray-500 bg-white border p-2 text-sm"
                            />
                            {errors.updatedby && <p className="text-red-500 text-sm">{errors.updatedby.message}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#6E719A] mb-1 text-sm">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("updatedemail", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                placeholder="Enter email"
                                className="border-gray-500 bg-white border p-2 text-sm"
                            />
                            {errors.updatedemail && <p className="text-red-500 text-sm">{errors.updatedemail.message}</p>}
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white mt-5 p-2 rounded text-sm">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;