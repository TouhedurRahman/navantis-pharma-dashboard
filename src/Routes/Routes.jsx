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
                path: '/products-list',
                element: <ProductsList />
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