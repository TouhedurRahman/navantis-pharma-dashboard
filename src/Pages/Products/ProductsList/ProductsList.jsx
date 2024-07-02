import PageTitle from "../../../Components/PageTitle/PageTitle";
import useProducts from "../../../Hooks/useProducts";
import ProductsCard from "../ProductsCard/ProductsCard";

const ProductsList = () => {
    const [products] = useProducts();

    return (
        <>
            <div>
                <PageTitle
                    from={"Products"}
                    to={"Products List"}
                />
            </div>
            <div className="bg-white">
                <div>
                    <h1 className="px-6 py-3 font-bold">All Products List</h1>
                    <hr className='text-center border border-gray-500 mb-5' />
                </div>
                <div className="px-6">
                    <div className="overflow-x-auto">
                        <table className="table">
                            {/* head */}
                            <thead>
                                <tr>
                                    <th className="text-center">Image</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map(product => (
                                        <ProductsCard
                                            key={product._id}
                                            product={product}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsList;