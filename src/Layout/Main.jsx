import Login from "../Pages/Login/Login";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
    const user = false;
    return (
        <div className="font-nunito">
            {
                user
                    ?
                    <Navbar />
                    :
                    <Login />
            }
        </div>
    );
};

export default Main;