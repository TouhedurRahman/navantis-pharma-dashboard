import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { LoadCanvasTemplate, loadCaptchaEnginge, validateCaptcha } from "react-simple-captcha";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { GrValidate } from "react-icons/gr";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [isOpen, setIsOpen] = useState(false);
    const [loginDisabled, setLoginDisabled] = useState(true);
    const [enterUserEmail, setEnterUserEmail] = useState('');

    const navigate = useNavigate();

    const captchaRef = useRef(null);
    const userEmailRef = useRef(null);

    useEffect(() => {
        loadCaptchaEnginge(5);
    }, []);

    const handleValidateCaptcha = () => {
        const captchaValue = captchaRef.current.value;

        if (validateCaptcha(captchaValue)) {
            setLoginDisabled(false);
        } else {
            setLoginDisabled(true);
        }
    }

    const handleEmailOnBlur = (e) => {
        const email = e.target.value;
        setEnterUserEmail(email);
    }

    const handleLogin = (data) => {
        const email = data.email;
        const password = data.password;
        if (email && password) {
            navigate('/');
        }
    }

    return (
        <div className='py-10 justify-center flex items-center'>
            <div className="hero-content mt-10 mx-3 shadow-2xl shadow-orange-100 border-2 border-[#3B82F6] rounded-lg flex-col lg:flex-row">
                {/*
                <div className="flex justify-center items-center">
                    <div className="w-full rounded-xl">
                        <img src="src/assets/images/Login/login-picture.jpg" />
                    </div>
                </div>
                */}
                <div className="card shrink-0 w-full max-w-sm p-5">
                    <h2 className='text-2xl flex justify-center items-center font-bold'><FaUserCircle className='mr-2 text-[#3B82F6]' /> Login</h2>
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-bold">Email</span>
                            </label>
                            <input
                                type="email"
                                ref={userEmailRef}
                                {...register("email", { required: "Email Address is required" })}
                                placeholder="user@gmail.com"
                                className="input input-accent w-full max-w-xs  border-2 border-[#3B82F6] focus:outline-none"
                                onBlur={handleEmailOnBlur}
                            />
                            {
                                errors.email && <p className='text-red-600'>{errors.email?.message}</p>
                            }
                        </div>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text font-bold">Password</span>
                            </label>
                            <div className='relative'>
                                <div className='flex'>
                                    <input
                                        type={(isOpen === false) ? 'password' : 'text'}
                                        {...register("password", {
                                            required: "Password is required",
                                            maxLength: { value: 8, message: "Password must be 6-8 characters" },
                                            minLength: { value: 6, message: "Password must be 6-8 characters" },
                                        })}
                                        placeholder="●●●●●●●●"
                                        className="input input-accent w-full max-w-xs border-2 border-[#3B82F6] focus:outline-none"
                                    />
                                    <div className="absolute right-2 flex items-center h-full">
                                        {
                                            (isOpen === false)
                                                ?
                                                <AiFillEyeInvisible
                                                    style={{ cursor: "pointer" }}
                                                    className='w-full text-xl'
                                                    onClick={() => setIsOpen(!isOpen)}
                                                />
                                                :
                                                <AiFillEye
                                                    style={{ cursor: "pointer" }}
                                                    className='w-full text-xl'
                                                    onClick={() => setIsOpen(!isOpen)}
                                                />
                                        }
                                    </div>
                                </div>
                            </div>
                            {
                                errors.password && <p className='text-red-600'>{errors.password?.message}</p>
                            }

                            <div className="form-control">
                                <div className='w-full max-w-xs flex justify-center items-center'>
                                    <label className="label">
                                        <LoadCanvasTemplate />
                                    </label>
                                </div>
                                <div className='form-control w-full max-w-xs flex flex-row justify between items-center space-x-2'>
                                    <input
                                        type="text"
                                        name="captcha"
                                        ref={captchaRef}
                                        placeholder="Type the captcha"
                                        className="w-[60%] input input-accent text-center input-bordered border-2 border-[#3B82F6] focus:outline-none"
                                        required
                                    />
                                    <button
                                        onClick={handleValidateCaptcha}
                                        className='w-[40%] btn bg-transparent border-2 border-[#3B82F6] text-black font-bold hover:bg-green-50 hover:border-green-600'
                                    >Validate <GrValidate size={24} className='text-green-600 font-extrabold' /></button>
                                </div>
                            </div>

                            <label className="label mb-5">
                                <span
                                    className="label-text-alt text-blue-600 font-bold hover:link"
                                // onClick={handleResetPassword}
                                >
                                    Forget password?
                                </span>
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <input type="submit" className='w-full btn bg-transparent border-2 border-[#3B82F6] text-black font-bold hover:bg-orange-100 hover:border-green-600' value='Login' disabled={loginDisabled} />
                        </div>
                    </form>

                    <p className='w-full max-w-xs pt-3 text-center'>
                        <span className='font-bold'>New Here?</span> <Link className='text-blue-600 font-bold hover:link' to='/registration'>Create an Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;