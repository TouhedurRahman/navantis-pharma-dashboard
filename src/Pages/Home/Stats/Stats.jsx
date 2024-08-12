import useCategories from '../../../Hooks/useCategories';
import useProducts from '../../../Hooks/useProducts';
import useEvents from '../../../Hooks/useEvents';
import useCareers from '../../../Hooks/useCareers';
import useApplications from '../../../Hooks/useApplications';
import { FaTags, FaBox, FaCalendarAlt, FaBriefcase, FaUser, FaEnvelopeOpenText, FaUserShield, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './Stats.css';
import useQueries from '../../../Hooks/useQueries';
import useAllUsers from '../../../Hooks/useAllUsers';

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
            title: "Categories",
            link: "/categories-list",
            icon: <FaTags />
        },
        {
            _id: 2,
            quantity: products.length,
            title: "Products",
            link: "/products-list",
            icon: <FaBox />
        },
        {
            _id: 3,
            quantity: events.length,
            title: "Events",
            link: "/events-list",
            icon: <FaCalendarAlt />
        },
        {
            _id: 6,
            quantity: queries.length,
            title: "Queries",
            link: "/queries-list",
            icon: <FaEnvelopeOpenText />
        },
        {
            _id: 4,
            quantity: careers.length,
            title: "Job Circulers",
            link: "/careers-list",
            icon: <FaBriefcase />
        },
        {
            _id: 5,
            quantity: applications.length,
            title: "Job Seekers",
            link: "/career-applications",
            icon: <FaUser />
        },
        {
            _id: 7,
            quantity: totalAdmin.length,
            title: "Admins",
            link: "/all-users",
            icon: <FaUserShield />
        },
        {
            _id: 8,
            quantity: totalNonAdmin.length,
            title: "Admin Requests",
            link: "/all-users",
            icon: <FaUsers />
        }
    ];

    return (
        <div className="stats-container">
            {/* <h2 className="stats-title">Dashboard Stats</h2> */}
            <div>
                <h1 className="px-6 py-3 font-bold">Dashboard stats</h1>
                <hr className='text-center border border-gray-500 mb-5' />
            </div>
            <div className="stats-grid">
                {pageContents.map(content => (
                    <Link to={content.link} key={content._id} className="stat-card">
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
