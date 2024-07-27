import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleRight, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Link, Outlet } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";
import { MdDashboard, MdEventNote, MdOutlineWorkHistory } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import { FaLayerGroup, FaListUl } from "react-icons/fa";
import { FiHelpCircle } from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";

const Navbar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const today = new Date();
    const year = today.getFullYear();

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    const [showDropdown, setShowDropdown] = useState({
        products: false,
        categories: false,
        events: false,
        queries: false,
        career: false,
    });

    const toggleDropdown = (menu) => {
        setShowDropdown((prev) => ({
            ...prev,
            [menu]: !prev[menu],
        }));
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <div
                className={`${isSidebarOpen ? 'w-48' : 'w-16'} bg-blue-500 pt-5 text-white transition-all duration-300 ease-in-out hidden md:block`}
            >
                {
                    isSidebarOpen
                        ? <div className='flex flex-col justify-center items-center'>
                            <div className="w-full p-2 pt-0">
                                <Link to='/' className="w-fullm">
                                    <img src="https://i.ibb.co/pfr6VxM/Logo-Navantis-png-white.png" />
                                </Link>
                            </div>
                            <label className='mt-20 font-bold font-playwrite text-xl text-center'>
                                <p>Dashboard</p>
                            </label>
                            <hr className='text-center w-[25%] border-2 border-white' />
                        </div>
                        : <div className="avatar p-2 pt-0">
                            <div
                                className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer"
                                onClick={() => setSidebarOpen(true)}
                            >
                                <img src="https://i.ibb.co/4d7LsvY/navantis-3d-logo.gif" />
                            </div>
                        </div>
                }

                <div className='mt-10 mx-2'>
                    {['categories', 'products', 'events', 'queries', 'career'].map((menu, index) => (
                        <div className="relative inline-block w-full" key={index}>
                            <div onClick={() => toggleDropdown(menu)} className={`flex items-center cursor-pointer ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
                                <div className="flex items-center py-2">
                                    {menu === 'categories' && <FaLayerGroup onClick={() => setSidebarOpen(true)} className="mr-2" />}
                                    {menu === 'products' && <MdDashboard onClick={() => setSidebarOpen(true)} className="mr-2" />}
                                    {menu === 'events' && <MdEventNote onClick={() => setSidebarOpen(true)} className="mr-2" />}
                                    {menu === 'queries' && <FiHelpCircle onClick={() => setSidebarOpen(true)} className="mr-2" />}
                                    {menu === 'career' && <MdWorkOutline onClick={() => setSidebarOpen(true)} className="mr-2" />}
                                    {isSidebarOpen && (
                                        <span>{menu.charAt(0).toUpperCase() + menu.slice(1)}</span>
                                    )}
                                </div>
                                {isSidebarOpen && (
                                    <FontAwesomeIcon icon={showDropdown[menu] ? faAngleDown : faAngleRight} />
                                )}
                            </div>
                            {showDropdown[menu] && isSidebarOpen && (
                                <div className="m-2 pl-4">
                                    {menu === 'categories' && (
                                        <>
                                            <Link to='/categories-list' className="w-full text-left px-4 text-white flex">
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <FaListUl className='me-2' />
                                                    <span>List</span>
                                                </div>
                                            </Link>
                                            <Link to='/add-category' className="w-full text-left px-4 text-white flex">
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <IoIosAddCircle className='me-2' />
                                                    <span>Add new</span>
                                                </div>
                                            </Link>
                                        </>
                                    )}
                                    {menu === 'products' && (
                                        <>
                                            <Link to='/products-list' className="w-full text-left px-4 text-white flex">
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <FaListUl className='me-2' />
                                                    <span>List</span>
                                                </div>
                                            </Link>
                                            <Link to='/add-product' className="w-full text-left px-4 text-white flex">
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <IoIosAddCircle className='me-2' />
                                                    <span>Add new</span>
                                                </div>
                                            </Link>
                                        </>
                                    )}
                                    {menu === 'events' && (
                                        <>
                                            <Link to='/events-list' className="w-full text-left px-4 text-white flex">
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <FaListUl className='me-2' />
                                                    <span>List</span>
                                                </div>
                                            </Link>
                                            <Link to='/add-event' className="w-full text-left px-4 text-white flex">
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <IoIosAddCircle className='me-2' />
                                                    <span>Add new</span>
                                                </div>
                                            </Link>
                                        </>
                                    )}
                                    {menu === 'queries' && (
                                        <Link to='/queries-list' className="w-full text-left px-4 text-white flex">
                                            <div className='flex justify-start items-center cursor:pointer'>
                                                <FaListUl className='me-2' />
                                                <span>List</span>
                                            </div>
                                        </Link>
                                    )}
                                    {menu === 'career' && (
                                        <>
                                            <Link
                                                to='/careers-list'
                                                className="w-full text-left px-4 text-white flex"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <FaListUl className='me-2' />
                                                    <span>List</span>
                                                </div>
                                            </Link>
                                            <Link
                                                to='/add-job'
                                                className="w-full text-left px-4 text-white flex"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <IoIosAddCircle className='me-2' />
                                                    <span>Add new</span>
                                                </div>
                                            </Link>
                                            <Link
                                                to='/career-applications'
                                                className="w-full text-left px-4 text-white flex"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <MdOutlineWorkHistory className='me-2' />
                                                    <span>Applications</span>
                                                </div>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex-1 flex flex-col overflow-hidden">
                <div className="flex justify-between bg-gray-800 p-4">
                    <button onClick={toggleSidebar} className="text-white hidden md:block">
                        <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
                    </button>
                    <button onClick={toggleMobileMenu} className="text-white md:hidden">
                        <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
                    </button>
                    <div>
                        <button className="btn btn-ghost text-white">Hi, Touhedur Rahman Khan</button>
                        <button className="btn btn-ghost text-white"> <LuLogOut />Logout</button>
                    </div>
                </div>

                {/* for mobile screen */}
                <div className={`md:hidden ${isMobileMenuOpen ? 'block w-1/2 h-full absolute mt-[80px] z-10' : 'hidden'} bg-[#1F2937] p-4 text-white`}>
                    {['categories', 'products', 'events', 'queries', 'career'].map((menu, index) => (
                        <div className="relative inline-block w-full" key={index}>
                            <div onClick={() => toggleDropdown(menu)} className={`flex items-center cursor-pointer ${isSidebarOpen ? 'justify-between' : 'justify-center'}`}>
                                <div className="flex items-center py-2">
                                    {menu === 'categories' && <FaLayerGroup onClick={() => setSidebarOpen(true)} className="mr-2" />}
                                    {menu === 'products' && <MdDashboard onClick={() => setSidebarOpen(true)} className="mr-2" />}
                                    {menu === 'events' && <MdEventNote onClick={() => setSidebarOpen(true)} className="mr-2" />}
                                    {menu === 'queries' && <FiHelpCircle onClick={() => setSidebarOpen(true)} className="mr-2" />}
                                    {menu === 'career' && <MdWorkOutline onClick={() => setSidebarOpen(true)} className="mr-2" />}
                                    {isSidebarOpen && (
                                        <span>{menu.charAt(0).toUpperCase() + menu.slice(1)}</span>
                                    )}
                                </div>
                                {isSidebarOpen && (
                                    <FontAwesomeIcon icon={showDropdown[menu] ? faAngleDown : faAngleRight} />
                                )}
                            </div>
                            {showDropdown[menu] && isSidebarOpen && (
                                <div className="m-2 pl-4">
                                    {menu === 'categories' && (
                                        <>
                                            <Link
                                                to='/categories-list'
                                                className="w-full text-left px-4 text-white flex"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <FaListUl className='me-2' />
                                                    <span>List</span>
                                                </div>
                                            </Link>
                                            <Link
                                                to='/add-category'
                                                className="w-full text-left px-4 text-white flex"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <IoIosAddCircle className='me-2' />
                                                    <span>Add new</span>
                                                </div>
                                            </Link>
                                        </>
                                    )}
                                    {menu === 'products' && (
                                        <>
                                            <Link
                                                to='/products-list'
                                                className="w-full text-left px-4 text-white flex"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <FaListUl className='me-2' />
                                                    <span>List</span>
                                                </div>
                                            </Link>
                                            <Link
                                                to='/add-product'
                                                className="w-full text-left px-4 text-white flex"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <IoIosAddCircle className='me-2' />
                                                    <span>Add new</span>
                                                </div>
                                            </Link>
                                        </>
                                    )}
                                    {menu === 'events' && (
                                        <>
                                            <Link
                                                to='/events-list'
                                                className="w-full text-left px-4 text-white flex"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <FaListUl className='me-2' />
                                                    <span>List</span>
                                                </div>
                                            </Link>
                                            <Link
                                                to='/add-event'
                                                className="w-full text-left px-4 text-white flex"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <IoIosAddCircle className='me-2' />
                                                    <span>Add new</span>
                                                </div>
                                            </Link>
                                        </>
                                    )}
                                    {menu === 'queries' && (
                                        <Link
                                            to='/queries-list'
                                            className="w-full text-left px-4 text-white flex"
                                            onClick={() => setMobileMenuOpen(false)}
                                        >
                                            <div className='flex justify-start items-center cursor:pointer'>
                                                <FaListUl className='me-2' />
                                                <span>List</span>
                                            </div>
                                        </Link>
                                    )}
                                    {menu === 'career' && (
                                        <>
                                            <Link
                                                to='/career-list'
                                                className="w-full text-left px-4 text-white flex"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <FaListUl className='me-2' />
                                                    <span>List</span>
                                                </div>
                                            </Link>
                                            <Link
                                                to='/add-job'
                                                className="w-full text-left px-4 text-white flex"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <IoIosAddCircle className='me-2' />
                                                    <span>Add new</span>
                                                </div>
                                            </Link>
                                            <Link
                                                to='/career-applications'
                                                className="w-full text-left px-4 text-white flex"
                                                onClick={() => setMobileMenuOpen(false)}
                                            >
                                                <div className='flex justify-start items-center cursor:pointer'>
                                                    <MdOutlineWorkHistory className='me-2' />
                                                    <span>Applications</span>
                                                </div>
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex-1 overflow-x-hidden overflow-y-auto p-4 bg-[#E5E7EB]">
                    <Outlet />
                </div>

                <div className="bg-white p-5">
                    <p className='text-gray-500 font-extrabold'><small>Copyright © {year} by Navantis Pharma Ltd.</small></p>
                </div>
            </div>
        </div>
    );
};

export default Navbar;