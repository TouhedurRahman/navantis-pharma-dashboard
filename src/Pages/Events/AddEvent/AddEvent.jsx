import { useForm } from "react-hook-form";
import PageTitle from "../../../Components/PageTitle/PageTitle";

const AddEvent = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const newProduct = {
            title: data.title,
            date: data.date,
            description: data.description,
            addedBy: data.addedby,
            addedEmail: data.addedemail,
            imageURL: data.imageFile
        }
        console.log(newProduct);
    }

    return (
        <div>
            <PageTitle
                from={"Products"}
                to={"Add new event"}
            />

            <div className="bg-white">
                <h1 className="px-6 py-3 font-bold">Add new event</h1>
                <hr className='text-center border border-gray-500 mb-5' />
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div className="flex flex-col">
                            <label className="text-[#6E719A] mb-1 text-sm">
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
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
                                type="date"
                                {...register("date", { required: "Date is required" })}
                                placeholder="Enter date"
                                className="border-gray-500 bg-white border p-2 text-sm cursor-pointer"
                            />
                            {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="text-[#6E719A] mb-1 text-sm">
                            Image upload <span className="text-red-500">*</span>
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
                            Description <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register("description", { required: "Description is required" })}
                            placeholder="Enter description"
                            className="border-gray-500 bg-white border p-2 text-sm"
                        />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    <h1 className="mt-10 text-sm">Event added by</h1>
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
                            {errors.addedemail && <p className="text-red-500 text-sm">{errors.addedemail.message}</p>}
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white mt-5 p-2 rounded text-sm">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddEvent;