import PageTitle from "../../Components/PageTitle/PageTitle";

const MyProfile = () => {
    return (
        <>
            <div>
                <PageTitle
                    from={"Profile"}
                    to={"My profile"}
                />
            </div>
            <div className="bg-white pb-1">
                <div>
                    <h1 className="px-6 py-3 font-bold">My profile</h1>
                    <hr className='text-center border border-gray-500 mb-5' />
                </div>
            </div>
        </>
    );
};

export default MyProfile;