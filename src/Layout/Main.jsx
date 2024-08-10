import Login from "../Pages/Login/Login";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import NonAdmin from "../Pages/NonAdmin/NonAdmin";
import useAuth from "../Hooks/useAuth";
import useSingleUser from "../Hooks/useSingleUser";
import Loader from "../Components/Loader/Loader";

const Main = () => {
    const { user } = useAuth();
    const [singleUser, loadingSingleUser] = useSingleUser();

    if (!user) {
        return <Login />;
    }

    return (
        <div className="font-nunito">
            {
                loadingSingleUser
                    ?
                    <>
                        <Loader />
                    </>
                    :
                    <>
                        {
                            singleUser.role === 'admin'
                                ?
                                <Navbar />
                                :
                                <NonAdmin />
                        }
                    </>
            }
            <ToastContainer />
        </div>
    );
};

export default Main;