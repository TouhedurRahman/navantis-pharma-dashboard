import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
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
                path: '/update-category',
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
                path: '/update-product',
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
                path: '/update-event',
                element: <UpdateEvent />
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
                path: '/add-job',
                element: <AddJob />
            },
            {
                path: '/update-job',
                element: <UpdateJob />
            }
        ]
    },
]);

export default router;