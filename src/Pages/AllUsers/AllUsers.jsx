import PageTitle from "../../Components/PageTitle/PageTitle";

const AllUsers = () => {
    return (
        <>
            <div>
                <PageTitle
                    from={"Users"}
                    to={"All users"}
                />
            </div>
            <div className="bg-white pb-1">
                <div>
                    <h1 className="px-6 py-3 font-bold">All Users list</h1>
                    <hr className='text-center border border-gray-500 mb-5' />
                </div>
            </div>
        </>
    );
};

export default AllUsers;