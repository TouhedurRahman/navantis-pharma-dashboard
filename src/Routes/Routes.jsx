import {
    createBrowserRouter,
} from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import ProductsList from "../Pages/Products/ProductsList/ProductsList";
import AddProducts from "../Pages/Products/AddProducts/AddProducts";
import UpdateProduct from "../Pages/Products/UpdateProduct/UpdateProduct";

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
            }
        ]
    },
]);

export default router;