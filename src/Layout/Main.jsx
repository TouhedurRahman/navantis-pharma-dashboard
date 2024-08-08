import { Toaster } from "react-hot-toast";
import useAuth from "../Hooks/useAuth";
import Login from "../Pages/Login/Login";
import Navbar from "../Pages/Shared/Navbar/Navbar";

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
            <Toaster />
        </div>
    );
};

export default Main;