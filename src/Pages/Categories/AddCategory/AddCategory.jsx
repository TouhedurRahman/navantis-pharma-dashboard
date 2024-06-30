import { useForm } from "react-hook-form";
import PageTitle from "../../../Components/PageTitle/PageTitle";

const AddCategory = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const newCategory = {
            name: data.name,
            category: data.category,
            addedBy: data.addedby,
            addedEmail: data.addedemail,
            imageURL: data.imageFile
        }
        console.log(newCategory);
    }

    return (
        <div>
            <PageTitle
                from={"Categories"}
                to={"Add new category"}
            />

            <div className="bg-white">
                <h1 className="px-6 py-3 font-bold">Add new category</h1>
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
                                Category <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("category", { required: "Category is required" })}
                                placeholder="Enter category"
                                className="border-gray-500 bg-white border p-2 text-sm"
                            />
                            {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
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

                    <h1 className="mt-10 text-sm">Category added by</h1>
                    <hr className='w-full border border-gray-500 mb-3' />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div className="flex flex-col">
                            <label className="text-[#6E719A] mb-1 text-sm">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("addedby", { required: "Added by is required" })}
                                placeholder="Enter name of person adding"
                                className="border-gray-500 bg-white border p-2 text-sm"
                            />
                            {errors.addedby && <p className="text-red-500 text-sm">{errors.addedby.message}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#6E719A] mb-1 text-sm">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("addedemail", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                placeholder="Enter email"
                                className="border-gray-500 bg-white border p-2 text-sm"
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white mt-5 p-2 rounded text-sm">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;