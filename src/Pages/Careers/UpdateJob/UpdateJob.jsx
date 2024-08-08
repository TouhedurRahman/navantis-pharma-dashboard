import { useForm } from "react-hook-form";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import useCareers from "../../../Hooks/useCareers";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../Components/Loader/Loader";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const UpdateJob = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [careers, loading] = useCareers();
    const { id } = useParams();
    const navigate = useNavigate();
    const career = careers.find(career => career._id == id);

    const handleUpdateCareer = data => {
        const updatedCareer = {
            designation: data.designation,
            department: data.department,
            outline: data.outline,
            responsibilities: data.responsibilities,
            requirements: data.requirements,
            vacancy: data.vacancy,
            location: data.location,
            updatedBy: data.updatedby,
            updatedEmail: data.updatedemail
        }

        axios.patch(`http://localhost:5000/career/${career._id}`, updatedCareer)
            .then(response => {
                if (response.data.modifiedCount) {
                    reset();
                    navigate(`/career/${career._id}`);
                    Swal.fire({
                        icon: "success",
                        title: "Career successfully updated!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
    }

    return (
        <div>
            <PageTitle
                from={"Careers"}
                to={"Update job"}
            />

            <div className="bg-white">
                <h1 className="px-6 py-3 font-bold">Update job circular</h1>
                <hr className='text-center border border-gray-500 mb-5' />
                {
                    loading
                        ?
                        <>
                            <Loader />
                        </>
                        :
                        <>
                            <form onSubmit={handleSubmit(handleUpdateCareer)} className="p-6 pt-0">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                                    <div className="flex flex-col">
                                        <label className="text-[#6E719A] mb-1 text-sm">
                                            Designation <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            defaultValue={career.designation}
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
                                            defaultValue={career.department}
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
                                        defaultValue={career.outline}
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
                                        defaultValue={career.responsibilities}
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
                                        defaultValue={career.requirements}
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
                                            defaultValue={career.vacancy}
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
                                            defaultValue={career.location}
                                            {...register("location", { required: "Location is required" })}
                                            className="border-gray-500 bg-white border p-2 text-sm cursor-pointer"
                                        >
                                            <option value="">Select location</option>
                                            <option value="Dhaka">Dhaka</option>
                                            <option value="Anywhere in Bangladesh">Anywhere in Bangladesh</option>
                                        </select>
                                        {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
                                    </div>
                                </div>

                                <h1 className="mt-10 text-sm">Job circular updated by</h1>
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

export default UpdateJob;