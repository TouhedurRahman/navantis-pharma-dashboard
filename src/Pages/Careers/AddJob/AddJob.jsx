import { useForm } from "react-hook-form";
import PageTitle from "../../../Components/PageTitle/PageTitle";

const AddJob = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const newCircular = {
            designation: data.designation,
            department: data.department,
            outline: data.outline,
            responsibilities: data.responsibilities,
            requirements: data.requirements,
            vacancy: data.vacancy,
            location: data.location,
            addedBy: data.addedby,
            addedEmail: data.addedemail
        }
        console.log(newCircular);
    }

    return (
        <div>
            <PageTitle
                from={"Careers"}
                to={"Add a new job"}
            />

            <div className="bg-white">
                <h1 className="px-6 py-3 font-bold">Add a new job circular</h1>
                <hr className='text-center border border-gray-500 mb-5' />
                <form onSubmit={handleSubmit(onSubmit)} className="p-6 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div className="flex flex-col">
                            <label className="text-[#6E719A] mb-1 text-sm">
                                Designation <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("designation", { required: "Designation is required" })}
                                placeholder="Enter designation"
                                className="border-gray-500 bg-white border p-2 text-sm"
                            />
                            {errors.designation && <p className="text-red-500 text-sm">{errors.designation.message}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#6E719A] mb-1 text-sm">
                                Department <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("department", { required: "Department is required" })}
                                placeholder="Enter department"
                                className="border-gray-500 bg-white border p-2 text-sm"
                            />
                            {errors.department && <p className="text-red-500 text-sm">{errors.department.message}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="text-[#6E719A] mb-1 text-sm">
                            Outline <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register("outline", { required: "Outline is required" })}
                            placeholder="Enter outline"
                            className="border-gray-500 bg-white border p-2 text-sm"
                        />
                        {errors.outline && <p className="text-red-500 text-sm">{errors.outline.message}</p>}
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="text-[#6E719A] mb-1 text-sm">
                            Responsibilities <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register("responsibilities", { required: "Responsibilities is required" })}
                            placeholder="Enter responsibilities"
                            className="border-gray-500 bg-white border p-2 text-sm"
                        />
                        {errors.responsibilities && <p className="text-red-500 text-sm">{errors.responsibilities.message}</p>}
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="text-[#6E719A] mb-1 text-sm">
                            Requirements <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            {...register("requirements", { required: "Requirements is required" })}
                            placeholder="Enter requirements"
                            className="border-gray-500 bg-white border p-2 text-sm"
                        />
                        {errors.requirements && <p className="text-red-500 text-sm">{errors.requirements.message}</p>}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div className="flex flex-col">
                            <label className="text-[#6E719A] mb-1 text-sm">
                                No. of vacancy <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                {...register("vacancy", { required: "Vacancy is required" })}
                                placeholder="Enter vacancy"
                                className="border-gray-500 bg-white border p-2 text-sm"
                            />
                            {errors.vacancy && <p className="text-red-500 text-sm">{errors.vacancy.message}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#6E719A] mb-1 text-sm">
                                Location <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register("location", { required: "Location is required" })}
                                className="border-gray-500 bg-white border p-2 text-sm cursor-pointer"
                            >
                                <option value="">Select location</option>
                                <option value="location1">Dhaka</option>
                                <option value="location2">Anywhere in Bangladesh</option>
                            </select>
                            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                        </div>
                    </div>

                    <h1 className="mt-10 text-sm">Job circular added by</h1>
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

export default AddJob;