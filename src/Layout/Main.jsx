import { Toaster } from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import Login from "../Pages/Login/Login";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

const Main = () => {
    const { user } = useAuth();

    return (
        <div className="font-nunito">
            {
                user
                    ?
                    <Navbar />
                    :
                    <Login />
            }
            <ToastContainer />
        </div>
    );
};

export default Main;