
const UserDetailsModal = ({ user, onClose }) => {
    if (!user) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg w-96 p-4 relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    &times;
                </button>
                <div className="flex justify-center items-center mb-4">
                    <div className="avatar">
                        <div className="mask mask-squircle h-24 w-24">
                            <img
                                src={
                                    user.profilePicture
                                        ? `${user.profilePicture}`
                                        : "https://i.ibb.co/6r3zmMg/user.jpg"
                                }
                                alt="User Avatar"
                            />
                        </div>
                    </div>
                </div>
                <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.email}</p>
                    <p className="mt-2">Role: {user.role === 'admin' ? 'Admin' : 'User'}</p>
                    <p className="mt-2">Designation: {user.designation || 'N/A'}</p>
                    {/* Add more user details here as needed */}
                </div>
            </div>
        </div>
    );
};

export default UserDetailsModal;