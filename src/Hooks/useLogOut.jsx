import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import Swal from "sweetalert2";

const useLogOut = () => {
    const { logOut } = useAuth();

    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                // localStorage.removeItem('access-token');
                // window.location.reload();
                Swal.fire({
                    icon: "success",
                    title: "Logged out successfully!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/login");
            })
            .catch(error => console.log(error));
    }

    return handleLogOut;
};

export default useLogOut;