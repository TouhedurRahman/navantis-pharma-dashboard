import { useForm } from "react-hook-form";
import PageTitle from "../../../Components/PageTitle/PageTitle";
import useOnlyCategories from "../../../Hooks/useOnlyCategories";
import useHosting from "../../../Hooks/useHosting";
import axios from "axios";
import Swal from "sweetalert2";

const AddProducts = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [onlyCategories] = useOnlyCategories();
    const img_hosting_url = useHosting();

    const transformGroup = (name) => {
        return name.toLowerCase().replace(/\s+/g, '-');
    };

    /* const onSubmit = data => {
        const newProduct = {
            name: data.name,
            subtitle: data.subtitle,
            forSearch: data.name + " " + data.subtitle,
            usage: data.usage,
            group: transformGroup(data.group),
            category: data.category,
            apply: data.apply,
            description: data.description,
            moComLink: data.motherCompanyLink,
            addedBy: data.addedby,
            addedEmail: data.addedemail,
            imageURL: data.imageFile
        }
        console.log(newProduct);
    } */

    const handleAddProduct = data => {
        const formData = new FormData();
        formData.append("image", data.image[0]);

        fetch(img_hosting_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgResponse => {
                const imgURL = imgResponse.data.display_url;

                const newProduct = {
                    name: data.name,
                    subtitle: data.subtitle,
                    forSearch: data.name + " " + data.subtitle,
                    usage: data.usage,
                    group: transformGroup(data.group),
                    category: data.category,
                    apply: data.apply,
                    description: data.description,
                    moComLink: data.motherCompanyLink,
                    addedBy: data.addedby,
                    addedEmail: data.addedemail,
                    imageURL: imgURL
                }

                axios.post('http://localhost:5000/products', newProduct)
                    .then(data => {
                        if (data.data.insertedId) {
                            reset();
                            Swal.fire({
                                icon: "success",
                                title: "New Product successfully added!",
                                showConfirmButton: false,
                                timer: 1000
                            });
                        }
                    })
            })
    };

    return (
        <div>
            <PageTitle
                from={"Products"}
                to={"Add new product"}
            />

            <div className="bg-white">
                <h1 className="px-6 py-3 font-bold">Add new product</h1>
                <hr className='text-center border border-gray-500 mb-5' />
                <form onSubmit={handleSubmit(handleAddProduct)} className="p-6 pt-0">
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
                            Image upload <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="file"
                            {...register("image", { required: "Image file is required" })}
                            className="h-10 file-input file-input-bordered border-gray-500 w-full rounded-none text-sm cursor-pointer"
                        />
                        {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
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

                    <h1 className="mt-10 text-sm">Product added by</h1>
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

export default AddProducts;