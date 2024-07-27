import { useForm } from "react-hook-form";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import useHosting from "../../../Hooks/useHosting";
import axios from "axios";
import Swal from "sweetalert2";

const AddCategory = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const img_hosting_url = useHosting();

    const transformCategory = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };

    const handleAddCategory = data => {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                const imgURL = imgResponse.data.display_url;

                const newCategory = {
                    name: data.name,
                    category: transformCategory(data.name),
                    addedBy: data.addedby,
                    addedEmail: data.addedemail,
                    imageURL: imgURL
                }

                axios.post('http://localhost:5000/category', newCategory)
                    .then(data => {
                        if (data.data.insertedId) {
                            reset();
                            Swal.fire({
                                icon: "success",
                                title: "New Category successfully added!",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        }
                    })
            })
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
                <form onSubmit={handleSubmit(handleAddCategory)} className="p-6 pt-0">
                    <div className="flex flex-col mb-2">
                        <label className="text-[#6E719A] mb-1 text-sm">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            placeholder="Enter Name"
                            className="border-gray-500 bg-white border p-2 text-sm"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="flex flex-col mb-2">
                        <label className="text-[#6E719A] mb-1 text-sm">
                            Image upload <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            {...register("image", { required: "Image file is required" })}
                            className="file-input file-input-bordered border-gray-500 w-full rounded-none text-sm cursor-pointer"
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
                    </div>

                    <h1 className="mt-10 text-sm">Category added by</h1>
                    <hr className='w-full border border-gray-500 mb-3' />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div className="flex flex-col">
                            <label className="text-[#6E719A] mb-1 text-sm">
                                Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                defaultValue={"Navantis Pharma Limited"}
                                {...register("addedby", { required: "Added by is required" })}
                                placeholder="Enter name of person adding"
                                className="border-gray-500 bg-white border p-2 text-sm cursor-not-allowed"
                                readOnly
                            />
                            {errors.addedby && <p className="text-red-500 text-sm">{errors.addedby.message}</p>}
                        </div>
                        <div className="flex flex-col">
                            <label className="text-[#6E719A] mb-1 text-sm">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <input
                                defaultValue={"info@navantispharma.com"}
                                {...register("addedemail", {
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
                            {errors.addedemail && <p className="text-red-500 text-sm">{errors.addedemail.message}</p>}
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white mt-5 p-2 rounded text-sm">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;