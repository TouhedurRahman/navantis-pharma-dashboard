import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import ProductsList from "../Pages/Products/ProductsList/ProductsList";
import AddProducts from "../Pages/Products/AddProducts/AddProducts";
import UpdateProduct from "../Pages/Products/UpdateProduct/UpdateProduct";
import AddCategory from "../Pages/Categories/AddCategory/AddCategory";
import UpdateCategory from "../Pages/Categories/UpdateCategory/UpdateCategory";
import AddJob from "../Pages/Careers/AddJob/AddJob";
import UpdateJob from "../Pages/Careers/UpdateJob/UpdateJob";
import CategoriesList from "../Pages/Categories/CategoriesList/CategoriesList";
import SingleProduct from "../Pages/Products/SingleProduct/SingleProduct";
import AddEvent from "../Pages/Events/AddEvent/AddEvent";
import UpdateEvent from "../Pages/Events/UpdateEvent/UpdateEvent";
import EventsList from "../Pages/Events/EventsList/EventsList";
import SingleEvent from "../Pages/Events/SingleEvent/SingleEvent";
import CareersList from "../Pages/Careers/CareersList/CareersList";
import SingleCircular from "../Pages/Careers/SingleCircular/SingleCircular";
import ApplicationsList from "../Pages/Careers/ApplicationsList/ApplicationsList";
import SingleApplication from "../Pages/Careers/SingleApplication/SingleApplication";
import QueriesList from "../Pages/Quries/QuriesList/QuriesList";
import SingleQuery from "../Pages/Quries/SingleQuery/SingleQuery";
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import MyProfile from "../Pages/MyProfile/MyProfile";
import AllUsers from "../Pages/Users/AllUsers/AllUsers";
import NonAdmin from "../Pages/NonAdmin/NonAdmin";
import NonVerified from "../Pages/NonVerified/NonVerified";
import Home from "../Pages/Home/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/categories-list',
                element: <CategoriesList />
            },
            {
                path: '/add-category',
                element: <AddCategory />
            },
            {
                path: '/update-category/:id',
                element: <UpdateCategory />
            },
            {
                path: '/products-list',
                element: <ProductsList />
            },
            {
                path: '/product/:id',
                element: <SingleProduct />
            },
            {
                path: '/add-product',
                element: <AddProducts />
            },
            {
                path: '/update-product/:id',
                element: <UpdateProduct />
            },
            {
                path: '/events-list',
                element: <EventsList />
            },
            {
                path: '/event/:id',
                element: <SingleEvent />
            },
            {
                path: '/add-event',
                element: <AddEvent />
            },
            {
                path: '/update-event/:id',
                element: <UpdateEvent />
            },
            {
                path: '/queries-list',
                element: <QueriesList />
            },
            {
                path: '/career/:id',
                element: <SingleCircular />
            },
            {
                path: '/careers-list',
                element: <CareersList />
            },
            {
                path: '/query/:id',
                element: <SingleQuery />
            },
            {
                path: '/add-job',
                element: <AddJob />
            },
            {
                path: '/update-career/:id',
                element: <UpdateJob />
            },
            {
                path: '/career-applications',
                element: <ApplicationsList />
            },
            {
                path: '/application/:id',
                element: <SingleApplication />
            },
            {
                path: '/my-profile',
                element: <MyProfile />
            },
            {
                path: '/all-users',
                element: <AllUsers />
            }
        ]
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/registration',
        element: <Registration />
    },
    {
        path: '/non-admin',
        element: <NonAdmin />
    },
    {
        path: '/non-verified',
        element: <NonVerified />
    }
]);

export default router;