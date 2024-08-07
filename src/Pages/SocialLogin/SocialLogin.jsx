import { FaGoogle } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLogin = () => {
    return (
        <div>
            <div className="divider">OR</div>

            <button
                className='w-full btn bg-transparent border-2 border-[#3B82F6] text-black font-bold hover:bg-[#3B82F6] hover:text-white'
            >
                <FaGoogle className="" /> <span className="">CONTINUE WITH GOOGLE</span>
            </button>
        </div>
    );
};

export default SocialLogin;