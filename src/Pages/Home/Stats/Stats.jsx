import useCategories from '../../../Hooks/useCategories';
import useProducts from '../../../Hooks/useProducts';
import useEvents from '../../../Hooks/useEvents';
import useCareers from '../../../Hooks/useCareers';
import useApplications from '../../../Hooks/useApplications';
import { FaTags, FaBox, FaCalendarAlt, FaBriefcase, FaUser, FaEnvelopeOpenText, FaUserShield, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useQueries from '../../../Hooks/useQueries';
import useAllUsers from '../../../Hooks/useAllUsers';
import './Stats.css';

const Stats = () => {
    const [categories] = useCategories();
    const [products] = useProducts();
    const [events] = useEvents();
    const [queries] = useQueries();
    const [careers] = useCareers();
    const [applications] = useApplications();
    const [users] = useAllUsers();

    const totalAdmin = users.filter(user => user.role === 'admin');
    const totalNonAdmin = users.filter(user => user.role !== 'admin');

    const pageContents = [
        {
            _id: 1,
            quantity: categories.length,
            title: categories.length > 1 ? "Categories" : "Category",
            link: "/categories-list",
            icon: <FaTags />
        },
        {
            _id: 2,
            quantity: products.length,
            title: products.length > 1 ? "Products" : "Product",
            link: "/products-list",
            icon: <FaBox />
        },
        {
            _id: 3,
            quantity: events.length,
            title: events.length > 1 ? "Events" : "Event",
            link: "/events-list",
            icon: <FaCalendarAlt />
        },
        {
            _id: 6,
            quantity: queries.length,
            title: queries.length > 1 ? "Queries" : "Query",
            link: "/queries-list",
            icon: <FaEnvelopeOpenText />
        },
        {
            _id: 4,
            quantity: careers.length,
            title: careers.length > 1 ? "Job Circulers" : "Job Circuler",
            link: "/careers-list",
            icon: <FaBriefcase />
        },
        {
            _id: 5,
            quantity: applications.length,
            title: applications.length > 1 ? "Job Seekers" : "Job Seeker",
            link: "/career-applications",
            icon: <FaUser />
        },
        {
            _id: 7,
            quantity: totalAdmin.length,
            title: totalAdmin.length > 1 ? "Admins" : "Admin",
            link: "/all-users",
            icon: <FaUserShield />
        },
        {
            _id: 8,
            quantity: totalNonAdmin.length,
            title: totalNonAdmin.length > 1 ? "Admin Requests" : "Admin Request",
            link: "/all-users",
            icon: <FaUsers />
        }
    ];

    return (
        <div className="stats-container mb-2">
            <div>
                <h1 className="px-6 py-3 font-bold">Dashboard Stats</h1>
                <hr className='text-center border border-gray-500 mb-5' />
            </div>
            <div className="stats-grid">
                {pageContents.map(content => (
                    <Link to={content.link} key={content._id} className="stat-card w-[80%] lg:w-[200px]">
                        <div className="stat-icon">
                            {content.icon}
                        </div>
                        <div className="stat-info">
                            <h3>{content.quantity}</h3>
                            <p>{content.title}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Stats;